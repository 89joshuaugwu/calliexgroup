"use client";

import {
  Building2,
  Home,
  Info,
  LayoutDashboard,
  LogOut,
  Mail,
  Palette,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/lib/firebase/auth-context";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/brand", label: "Brand", icon: Palette },
  { href: "/admin/home", label: "Home", icon: Home },
  { href: "/admin/about", label: "About", icon: Info },
  { href: "/admin/contact", label: "Contact", icon: Phone },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAdminAuth();

  return (
    <aside className="cx-admin-sidebar">
      <div className="cx-admin-sidebar__brand">
        <Building2 size={20} />
        <div>
          <strong>Callie X CMS</strong>
          <span>calliexgroup.co</span>
        </div>
      </div>

      <nav className="cx-admin-sidebar__nav">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className="cx-admin-sidebar__link" data-active={active}>
              <Icon size={17} strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="cx-admin-sidebar__user">
        <div className="cx-admin-sidebar__user-info">
          <span className="cx-admin-sidebar__user-email">{user?.email}</span>
        </div>
        <button type="button" onClick={() => signOut()} className="cx-admin-sidebar__signout">
          <LogOut size={15} /> Sign out
        </button>
      </div>
    </aside>
  );
}
