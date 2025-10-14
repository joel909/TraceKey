import { NextResponse } from 'next/server';

export default function generateResponse(
  data: Record<string, any>,
  status: number = 200
) {
  return NextResponse.json({ data }, { status });
}   