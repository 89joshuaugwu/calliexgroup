"use client";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Download, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";

interface Row {
  email: string;
  createdAt: string;
  source: string;
}

export default function AdminNewsletterPage() {
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    const q = query(collection(db, "newsletter_subscribers"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setRows(snap.docs.map((d) => d.data() as Row));
    });
    return unsub;
  }, []);

  function downloadCsv() {
    if (!rows) return;
    const csv = ["email,subscribed_at", ...rows.map((r) => `${r.email},${r.createdAt}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "callie-x-newsletter-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="cx-editor">
      <div className="cx-editor__topbar">
        <div>
          <h1>Newsletter</h1>
          <p>Subscribers from the Contact page signup box, updating live.</p>
        </div>
        <button type="button" className="cx-btn-ghost" onClick={downloadCsv} disabled={!rows?.length}>
          <Download size={14} /> Export CSV
        </button>
      </div>

      <div className="cx-editor__section" style={{ padding: "0.5rem 0" }}>
        {!rows ? (
          <p className="cx-admin-loading">Loading\u2026</p>
        ) : rows.length === 0 ? (
          <div className="cx-admin-empty">
            <Mail size={22} strokeWidth={1.5} />
            <p>No subscribers yet \u2014 they&apos;ll appear here the moment someone signs up on the Contact page.</p>
          </div>
        ) : (
          <table className="cx-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.email}>
                  <td>{r.email}</td>
                  <td>{new Date(r.createdAt).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
