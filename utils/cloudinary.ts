import {UploadApiResponse, v2 as cloudinary} from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});


export const uploadToCloudinary = (
  buffer: Buffer,
  options: {
    folder: string;
    publicId?: string;
    resourceType: "image" | "raw";
    originalFilename: string;
  }
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        public_id: options.publicId,
        resource_type: options.resourceType,
        use_filename: !options.publicId,
        unique_filename: !options.publicId,
        overwrite: false,
        filename_override: options.originalFilename,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(
            new Error("Cloudinary returned no upload result.")
          );
          return;
        }

        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
};


export const deleteCloudinaryResource = async (
  publicId: string,
  resourceType: "image" | "raw" | "video" = "image"
) => {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
    type: "upload",
    invalidate: true,
  });
};

export default cloudinary;