"use client";

import { SchemaPageEditor } from "@/components/admin/SchemaPageEditor";
import { BRAND_SCHEMA } from "@/lib/cms/schema";

export default function AdminBrandPage() {
  return <SchemaPageEditor schema={BRAND_SCHEMA} previewPath="/" />;
}
