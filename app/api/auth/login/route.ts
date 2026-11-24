
import { handleLogin } from "@/utils/auth";
import { dbConnect } from "@/utils/db";

export async function POST(req: Request) {
  try {
    await dbConnect();

    return await handleLogin(req, "admin");
  } catch (error) {
    console.error("Login route error:", error);

    return Response.json(
      { error: "Unable to process login at this time." },
      { status: 500 }
    );
  }
}
