import { NextResponse } from 'next/server';

export default function generateFailedResponse(
  message: string,
  status: number = 400,
  field?: string,
) {
  return NextResponse.json({ message, field }, { status });
}