"use client";

import { SchemaPageEditor } from "@/components/admin/SchemaPageEditor";
import { CONTACT_SCHEMA } from "@/lib/cms/schema";

export default function AdminContactPage() {
  return <SchemaPageEditor schema={CONTACT_SCHEMA} previewPath="/contact" />;
}
