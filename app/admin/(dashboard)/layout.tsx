import { Suspense, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/utils/auth";
import { dbConnect } from "@/utils/db";
import { AdminNavbar } from "@/components/admin/Navbars/AdminNavbar";
import { Sidebar } from "@/components/admin/Sidebar/Sidebar";
import { HeaderStats } from "@/components/admin/Headers/HeaderStats";
import { FooterAdmin } from "@/components/admin/Footers/FooterAdmin";


interface AdminLayoutProps {
  children: ReactNode;
}



function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-800" />
        <p className="text-sm text-slate-500">
          Loading admin dashboard...
        </p>
      </div>
    </div>
  );
}

async function ProtectedAdminLayout({
  children,
}: AdminLayoutProps) {
  await dbConnect();

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

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <Suspense fallback={<AdminLoading />}>
      <ProtectedAdminLayout>
        {children}
      </ProtectedAdminLayout>
    </Suspense>
  );
}
