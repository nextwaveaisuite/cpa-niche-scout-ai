import { NextRequest } from "next/server";

/**
 * Phase 1: Pro gating placeholder
 * 
 * This will later be connected to:
 * - Stripe webhook
 * - User session
 * - Database flag
 */
export function isProUser(_req: NextRequest): boolean {
  // Phase 1: no auth yet → always false
  return false;
}
