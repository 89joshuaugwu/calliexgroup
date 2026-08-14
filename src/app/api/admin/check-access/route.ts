import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/firebase/admin";

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();
    if (!idToken) return NextResponse.json({ ok: false }, { status: 401 });
    await verifyAdminToken(idToken);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 403 });
  }
}
