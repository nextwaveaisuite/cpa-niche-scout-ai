import { NextRequest, NextResponse } from "next/server";
import { isProUser } from "./pro";

const FREE_START_CREDITS = 5;
const PRO_START_CREDITS = 50;

function getInitialCredits(req: NextRequest): number {
  return isProUser(req) ? PRO_START_CREDITS : FREE_START_CREDITS;
}

export function checkCredits(
  req: NextRequest,
  cost: number
): { allowed: boolean; response?: NextResponse } {
  const cookie = req.cookies.get("cpa_credits");

  const credits = cookie
    ? parseInt(cookie.value, 10)
    : getInitialCredits(req);

  if (credits < cost) {
    return {
      allowed: false,
      response: NextResponse.json(
        {
          error: "credits_required",
          message: "You’ve run out of credits. Upgrade to Pro or wait for reset.",
        },
        { status: 402 }
      ),
    };
  }

  return { allowed: true };
}

export function deductCredits(
  res: NextResponse,
  req: NextRequest,
  cost: number
) {
  const cookie = req.cookies.get("cpa_credits");

  const current = cookie
    ? parseInt(cookie.value, 10)
    : getInitialCredits(req);

  const remaining = Math.max(current - cost, 0);

  res.cookies.set("cpa_credits", String(remaining), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
        }
