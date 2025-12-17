import { NextRequest, NextResponse } from "next/server";
import { isProUser } from "./pro";

const FREE_START_CREDITS = 5;
const PRO_START_CREDITS = 50;

function currentMonth(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function getInitialCredits(req: NextRequest): number {
  return isProUser(req) ? PRO_START_CREDITS : FREE_START_CREDITS;
}

export function checkCredits(
  req: NextRequest,
  cost: number
): { allowed: boolean; response?: NextResponse } {
  const month = currentMonth();

  const monthCookie = req.cookies.get("cpa_credit_month");
  const creditCookie = req.cookies.get("cpa_credits");

  // 🔁 Monthly reset
  if (!monthCookie || monthCookie.value !== month) {
    return { allowed: true };
  }

  const credits = creditCookie
    ? parseInt(creditCookie.value, 10)
    : getInitialCredits(req);

  if (credits < cost) {
    return {
      allowed: false,
      response: NextResponse.json(
        {
          error: "credits_required",
          message:
            "You’ve run out of credits. Upgrade to Pro or wait for the monthly reset.",
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
  const month = currentMonth();

  const monthCookie = req.cookies.get("cpa_credit_month");
  const creditCookie = req.cookies.get("cpa_credits");

  let credits: number;

  // 🔁 New month → reset credits
  if (!monthCookie || monthCookie.value !== month) {
    credits = getInitialCredits(req) - cost;
  } else {
    const current = creditCookie
      ? parseInt(creditCookie.value, 10)
      : getInitialCredits(req);
    credits = Math.max(current - cost, 0);
  }

  res.cookies.set("cpa_credit_month", month, {
    path: "/",
    maxAge: 60 * 60 * 24 * 31,
  });

  res.cookies.set("cpa_credits", String(credits), {
    path: "/",
    maxAge: 60 * 60 * 24 * 31,
  });
  }
    
