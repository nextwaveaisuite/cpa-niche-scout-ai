import { NextRequest } from "next/server";

/**
 * Phase 6 — Server-authoritative Pro check
 *
 * Priority:
 * 1. Webhook-issued httpOnly cookie
 * 2. Legacy client cookie (temporary fallback)
 */
export function isProUser(req: NextRequest): boolean {
  const serverPro = req.cookies.get("cpa_pro");
  if (serverPro?.value === "1") return true;

  // Fallback (Phase 2 compatibility)
  const legacy = req.cookies.get("cpa_pro");
  return legacy?.value === "1";
}
