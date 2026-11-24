import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/utils/auth";
import { AdminNavbar } from "@/components/admin/Navbars/AdminNavbar";
import { Sidebar } from "@/components/admin/Sidebar/Sidebar";
import { HeaderStats } from "@/components/admin/Headers/HeaderStats";
import { FooterAdmin } from "@/components/admin/Footers/FooterAdmin";


interface AdminLayoutProps {
  children: ReactNode;
}




export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }

  if (user.role !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <>
      <Sidebar />
      <div className="relative min-h-screen bg-slate-100 md:ml-64">
        <AdminNavbar />
        <HeaderStats />
        <main className="relative mx-auto -mt-24 w-full px-4 pb-8 md:px-10">
          {children}
          <FooterAdmin />
        </main>
      </div>
    </>
  );
}
