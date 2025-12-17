import { NextRequest, NextResponse } from "next/server";
import { isProUser } from "./pro";

const FREE_DAILY_LIMIT = 3;

export function checkUsage(req: NextRequest): {
  allowed: boolean;
  response?: NextResponse;
} {
  // Pro users = unlimited
  if (isProUser(req)) {
    return { allowed: true };
  }

  const cookie = req.cookies.get("cpa_usage");
  const used = cookie ? parseInt(cookie.value, 10) || 0 : 0;

  if (used >= FREE_DAILY_LIMIT) {
    return {
      allowed: false,
      response: NextResponse.json(
        {
          error: "limit_reached",
          message:
            "Free usage limit reached. Upgrade to Pro for unlimited access.",
        },
        { status: 429 }
      ),
    };
  }

  return { allowed: true };
}

export function incrementUsage(res: NextResponse, req: NextRequest) {
  if (isProUser(req)) return;

  const cookie = req.cookies.get("cpa_usage");
  const used = cookie ? parseInt(cookie.value, 10) || 0 : 0;

  res.cookies.set("cpa_usage", String(used + 1), {
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
      }
    
