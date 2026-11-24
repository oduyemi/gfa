
import { handleLogout } from "@/utils/auth";

export async function POST() {
  return handleLogout();
}
