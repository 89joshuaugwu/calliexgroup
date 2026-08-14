"use client";

import { collection, onSnapshot } from "firebase/firestore";
import { Building2, Home, Info, Mail, Palette, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";

const CARDS = [
  { href: "/admin/brand", label: "Brand", icon: Palette, desc: "Logos, socials, footer \u2014 used on every page." },
  { href: "/admin/home", label: "Home", icon: Home, desc: "Hero, products, innovation, payments, stats, China desk." },
  { href: "/admin/about", label: "About", icon: Info, desc: "Mission, board, team, awards, history, values." },
  { href: "/admin/contact", label: "Contact", icon: Phone, desc: "Office locations and the newsletter box." },
];

export default function AdminDashboardPage() {
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "newsletter_subscribers"), (snap) => {
      setSubscriberCount(snap.size);
    });
    return unsub;
  }, []);

  return (
    <div className="cx-dashboard">
      <div className="cx-dashboard__head">
        <Building2 size={22} />
        <div>
          <h1>Callie X CMS</h1>
          <p>Every field on calliexgroup.co lives here \u2014 edits go live in seconds, no redeploy.</p>
        </div>
      </div>

      <div className="cx-dashboard__grid">
        {CARDS.map(({ href, label, icon: Icon, desc }) => (
          <Link key={href} href={href} className="cx-dashboard__card">
            <Icon size={20} strokeWidth={1.75} />
            <strong>{label}</strong>
            <span>{desc}</span>
          </Link>
        ))}
        <Link href="/admin/newsletter" className="cx-dashboard__card cx-dashboard__card--stat">
          <Mail size={20} strokeWidth={1.75} />
          <strong>Newsletter</strong>
          <span className="cx-dashboard__stat">{subscriberCount ?? "\u2013"}</span>
          <span>subscribers</span>
        </Link>
      </div>
    </div>
  );
}
