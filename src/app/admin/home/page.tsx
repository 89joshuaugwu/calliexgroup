"use client";

import { SchemaPageEditor } from "@/components/admin/SchemaPageEditor";
import { HOME_SCHEMA } from "@/lib/cms/schema";

export default function AdminHomePage() {
  return <SchemaPageEditor schema={HOME_SCHEMA} previewPath="/" />;
}
