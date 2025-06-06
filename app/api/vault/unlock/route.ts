import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Vault from "@/models/Vault";
import jwt from "jsonwebtoken";

await connectToDatabase();

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Update lastActivity in the DB
  await Vault.updateMany(
    { userId: session.user.id },
    { $set: { lastActivity: new Date() } }
  );

  // Issue a vault‑unlock JWT for 30 minutes
  const token = jwt.sign(
    { sub: session.user.id, type: "vault-unlock" },
    process.env.AUTH_SECRET!,
    { expiresIn: "30m" }
  );

  // Set HttpOnly cookie for middleware to verify
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: "vault_token",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 30 * 60, // 30 minutes
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res;
}
