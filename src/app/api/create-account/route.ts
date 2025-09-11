import { NextResponse } from 'next/server';
import { createAccountService } from '@/lib/controllers/account.controller';
import { ValidationError } from '@/lib/errors/ValidationError';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await createAccountService(data);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message, field: error.field }, { status: 422 });
    }
    console.error("Error creating account:", error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}
