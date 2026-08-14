"use client";

import { onSnapshot, doc } from "firebase/firestore";
import { AlertCircle, Check, ExternalLink, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";
import { useAdminAuth } from "@/lib/firebase/auth-context";
import { savePageContent } from "@/lib/cms/actions";
import type { PageSchema } from "@/lib/cms/schema";
import { deepMerge } from "@/lib/utils";
import { DEFAULT_ABOUT, DEFAULT_BRAND, DEFAULT_CONTACT, DEFAULT_HOME } from "@/lib/cms/defaults";
import { SchemaField } from "./SchemaField";

const DEFAULTS_BY_PAGE = {
  home: DEFAULT_HOME,
  about: DEFAULT_ABOUT,
  contact: DEFAULT_CONTACT,
  brand: DEFAULT_BRAND,
} as const;

type SaveState = "idle" | "saving" | "saved" | "error";

export function SchemaPageEditor({ schema, previewPath }: { schema: PageSchema; previewPath: string }) {
  const { getIdToken } = useAdminAuth();
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [openSection, setOpenSection] = useState(schema.sections[0]?.id ?? "");

  // Realtime read: if a second admin (or Joshua in another tab) saves,
  // this view updates live \u2014 the whole point of Firestore over a flat
  // request/response CMS. Writes never happen here directly; see
  // handleSave() below, which always goes through the verified Server Action.
  useEffect(() => {
    const defaults = DEFAULTS_BY_PAGE[schema.pageKey];
    const unsub = onSnapshot(doc(db, "content", schema.pageKey), (snap) => {
      const stored = snap.exists() ? (snap.data() as Record<string, unknown>) : undefined;
      setData(deepMerge(defaults as unknown as Record<string, unknown>, stored));
    });
    return unsub;
  }, [schema.pageKey]);

  async function handleSave() {
    if (!data) return;
    setSaveState("saving");
    setErrorMsg("");
    const idToken = await getIdToken();
    if (!idToken) {
      setSaveState("error");
      setErrorMsg("Your session expired \u2014 sign in again.");
      return;
    }
    const result = await savePageContent(schema.pageKey, data as never, idToken);
    if (result.ok) {
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    } else {
      setSaveState("error");
      setErrorMsg(result.error ?? "Save failed.");
    }
  }

  if (!data) {
    return (
      <div className="cx-admin-loading">
        <Loader2 className="cx-spin" size={20} /> Loading {schema.label}\u2026
      </div>
    );
  }

  return (
    <div className="cx-editor">
      <div className="cx-editor__topbar">
        <div>
          <h1>{schema.label}</h1>
          <p>{schema.intro}</p>
        </div>
        <div className="cx-editor__topbar-actions">
          <a href={previewPath} target="_blank" rel="noreferrer" className="cx-btn-ghost">
            <ExternalLink size={14} /> View live
          </a>
          <button type="button" className="cx-btn-primary" onClick={handleSave} disabled={saveState === "saving"}>
            {saveState === "saving" && <Loader2 size={14} className="cx-spin" />}
            {saveState === "saved" && <Check size={14} />}
            {saveState === "saving" ? "Saving\u2026" : saveState === "saved" ? "Saved" : "Save changes"}
          </button>
        </div>
      </div>

      {saveState === "error" && (
        <div className="cx-editor__error">
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}

      <div className="cx-editor__sections">
        {schema.sections.map((section) => (
          <section key={section.id} className="cx-editor__section">
            <button
              type="button"
              className="cx-editor__section-head"
              onClick={() => setOpenSection(openSection === section.id ? "" : section.id)}
              aria-expanded={openSection === section.id}
            >
              <span>{section.title}</span>
              <span className="cx-editor__chevron" data-open={openSection === section.id}>
                \u2304
              </span>
            </button>
            {section.description && <p className="cx-editor__section-desc">{section.description}</p>}
            {openSection === section.id && (
              <div className="cx-editor__section-body">
                {section.fields.map((field) => (
                  <SchemaField key={field.key} field={field} data={data} onChange={setData} />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="cx-editor__footer-actions">
        <button type="button" className="cx-btn-primary" onClick={handleSave} disabled={saveState === "saving"}>
          {saveState === "saving" ? "Saving\u2026" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
