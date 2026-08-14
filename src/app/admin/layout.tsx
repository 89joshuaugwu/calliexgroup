"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminAuthProvider, useAdminAuth } from "@/lib/firebase/auth-context";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import "./admin.css";

function Gate({ children }: { children: React.ReactNode }) {
  const { user, loading, authorized } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginRoute = pathname === "/admin/login";

  useEffect(() => {
    if (loading) return;
    if (!user && !isLoginRoute) router.replace("/admin/login");
    if (user && !authorized && !isLoginRoute) router.replace("/admin/login?denied=1");
    if (user && authorized && isLoginRoute) router.replace("/admin");
  }, [loading, user, authorized, isLoginRoute, router]);

  if (isLoginRoute) return <>{children}</>;

  if (loading || !user || !authorized) {
    return (
      <div className="cx-admin-loading cx-admin-loading--full">
        <Loader2 className="cx-spin" size={22} />
      </div>
    );
  }

  return (
    <div className="cx-admin-shell">
      <AdminSidebar />
      <main className="cx-admin-main">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <Gate>{children}</Gate>
    </AdminAuthProvider>
  );
}
