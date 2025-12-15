
import { NextResponse } from 'next/server';
export const runtime = 'edge';
export async function POST(req: Request){
  const body = await req.json();
  return NextResponse.json({ success: true, input: body, result: "Stub response" });
}
