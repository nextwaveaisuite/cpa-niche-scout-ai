import { NextRequest } from "next/server";

/**
 * Phase 2: Pro persistence via cookie
 * 
 * Cookie is set client-side after successful Stripe checkout.
 * Later replaced by webhook + DB.
 */
export function isProUser(req: NextRequest): boolean {
  const cookie = req.cookies.get("cpa_pro");
  return cookie?.value === "1";
}
