type CreditRecord = {
  date: string;
  used: number;
};

const DAILY_LIMIT = 10;

// In-memory store (Phase 1 safe)
const creditStore = new Map<string, CreditRecord>();

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function checkAndConsumeCredit(id: string) {
  const t = today();
  const record = creditStore.get(id);

  if (!record || record.date !== t) {
    creditStore.set(id, { date: t, used: 1 });
    return { allowed: true, remaining: DAILY_LIMIT - 1 };
  }

  if (record.used >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  record.used += 1;
  creditStore.set(id, record);

  return { allowed: true, remaining: DAILY_LIMIT - record.used };
}
