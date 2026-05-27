import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { message: 'Account creation is disabled.' },
    { status: 410 }
  );
}
