import { Suspense, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/utils/auth";
import { dbConnect } from "@/utils/db";
import Enquiry, { EnquiryStatus } from "@/models/enquiry.model";
import MailingList from "@/models/mailinglist.model";
import { AdminNavbar } from "@/components/admin/Navbars/AdminNavbar";
import { Sidebar } from "@/components/admin/Sidebar/Sidebar";
import { HeaderStats } from "@/components/admin/Headers/HeaderStats";
import { FooterAdmin } from "@/components/admin/Footers/FooterAdmin";

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card shadow-premium-sm">
          <div className="absolute inset-1 animate-pulse rounded-xl bg-brand-electric/10" />

          <div className="relative h-7 w-7 animate-spin rounded-full border-[3px] border-brand-electric/15 border-t-brand-electric" />
        </div>

        <div className="text-center">
          <p className="font-brand-display text-sm font-semibold text-foreground">
            Preparing your workspace
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Loading your GFA dashboard...
          </p>
        </div>
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

  const [
    totalEnquiries,
    pendingEnquiries,
    treatedEnquiries,
    totalSubscribers,
  ] = await Promise.all([
    Enquiry.countDocuments(),
    Enquiry.countDocuments({status: EnquiryStatus.PENDING}),
    Enquiry.countDocuments({status: EnquiryStatus.TREATED}),
    MailingList.countDocuments(),
  ]);

  const stats = {
    totalEnquiries,
    pendingEnquiries,
    treatedEnquiries,
    totalSubscribers,
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Sidebar />

      <div className="relative min-h-screen md:ml-64">
        <AdminNavbar />

        <HeaderStats stats={stats} />

        <main className="relative mx-auto -mt-24 w-full px-4 pb-8 sm:px-6 lg:px-10">
          <div className="relative z-10 min-h-[400px]">
            {children}
          </div>

          <FooterAdmin />
        </main>
      </div>
    </div>
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
