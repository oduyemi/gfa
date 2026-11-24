import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import { getCurrentUser, requireRole } from "@/utils/auth";
import User from "@/models/user.model";
import { uploadToCloudinary, deleteCloudinaryResource } from "@/utils/cloudinary";


const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);



const isValidImageSignature = (
  buffer: Buffer,
  mimeType: string
): boolean => {
  switch (mimeType) {
    case "image/jpeg":
      return (
        buffer.length >= 3 &&
        buffer[0] === 0xff &&
        buffer[1] === 0xd8 &&
        buffer[2] === 0xff
      );

    case "image/png":
      return (
        buffer.length >= 8 &&
        buffer.subarray(0, 8).equals(
          Buffer.from([
            0x89, 0x50, 0x4e, 0x47,
            0x0d, 0x0a, 0x1a, 0x0a,
          ])
        )
      );

    case "image/webp":
      return (
        buffer.length >= 12 &&
        buffer.toString("ascii", 0, 4) === "RIFF" &&
        buffer.toString("ascii", 8, 12) === "WEBP"
      );

    default:
      return false;
  }
};

export async function POST(request: NextRequest) {
  let uploadedPublicId: string | null = null;
  try {
    await dbConnect();
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const roleError = requireRole(currentUser, ["admin"]);
    if (roleError) return roleError;
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please select a profile image." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG and WebP images are supported." },
        { status: 400 }
      );
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "The image must be between 1 byte and 5 MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (!isValidImageSignature(buffer, file.type)) {
      return NextResponse.json(
        { error: "The uploaded file is not a valid image." },
        { status: 400 }
      );
    }

    const uploaded = await uploadToCloudinary(buffer, {
      folder: "gfa/admin",
      resourceType: "image",
      originalFilename: file.name,
    });

    uploadedPublicId = uploaded.public_id;
    const previousPublicId = currentUser.imagePublicId ?? null;
    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      {
        $set: {
          image: uploaded.secure_url,
          imagePublicId: uploaded.public_id,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("_id image imagePublicId");

    if (!updatedUser) {
      await deleteCloudinaryResource(
        uploaded.public_id,
        "image"
      );

      uploadedPublicId = null;

      return NextResponse.json(
        { error: "User account not found." },
        { status: 404 }
      );
    }

    if (
      previousPublicId &&
      previousPublicId !== uploaded.public_id
    ) {
      try {
        const deletion = await deleteCloudinaryResource(
          previousPublicId,
          "image"
        );

        if (
          deletion.result !== "ok" &&
          deletion.result !== "not found"
        ) {
          console.warn(
            "Previous avatar cleanup unsuccessful:",
            deletion.result
          );
        }
      } catch (deleteError) {
        console.error(
          "PREVIOUS AVATAR CLEANUP ERROR:",
          deleteError
        );
      }
    }

    uploadedPublicId = null;

    return NextResponse.json(
      {
        message: "Profile photo updated successfully.",
        image: updatedUser.image,
        imagePublicId: updatedUser.imagePublicId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ADMIN AVATAR UPLOAD ERROR:", error);
    if (uploadedPublicId) {
      try {
        await deleteCloudinaryResource(
          uploadedPublicId,
          "image"
        );
      } catch (cleanupError) {
        console.error(
          "NEW AVATAR CLEANUP ERROR:",
          cleanupError
        );
      }
    }

    return NextResponse.json(
      { error: "Unable to upload your profile photo." },
      { status: 500 }
    );
  }
}


export async function DELETE() {
    try {
      await dbConnect();
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        return NextResponse.json(
          { error: "Unauthorized." },
          { status: 401 }
        );
      }
  
      const roleError = requireRole(currentUser, ["admin"]);
      if (roleError) return roleError;
      const previousPublicId = currentUser.imagePublicId;
      if (!previousPublicId) {
        return NextResponse.json(
          { message: "No profile photo to remove." },
          { status: 200 }
        );
      }
  
    const updatedUser = await User.findByIdAndUpdate(
        currentUser._id,
        {
          $set: {
            image: null,
            imagePublicId: null,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      ).select("_id image imagePublicId");
  
      if (!updatedUser) {
        return NextResponse.json(
          { error: "User account not found." },
          { status: 404 }
        );
      }
  
    try {
        const deletion = await deleteCloudinaryResource(
          previousPublicId,
          "image"
        );
  
        if (
          deletion.result !== "ok" &&
          deletion.result !== "not found"
        ) {
          console.warn(
            "Cloudinary avatar deletion returned:",
            deletion.result
          );
        }
    } catch (deleteError) {
        console.error("CLOUDINARY AVATAR DELETE ERROR:", deleteError);
    }
  
    return NextResponse.json(
        {
          message: "Profile photo removed successfully.",
          image: null,
          imagePublicId: null,
        },
        { status: 200 }
    );
    } catch (error) {
      console.error("ADMIN AVATAR DELETE ERROR:", error);
  
      return NextResponse.json(
        { error: "Unable to remove your profile photo." },
        { status: 500 }
      );
    }
}