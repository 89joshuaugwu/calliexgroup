"use client";

import { SchemaPageEditor } from "@/components/admin/SchemaPageEditor";
import { ABOUT_SCHEMA } from "@/lib/cms/schema";

export default function AdminAboutPage() {
  return <SchemaPageEditor schema={ABOUT_SCHEMA} previewPath="/about" />;
}
