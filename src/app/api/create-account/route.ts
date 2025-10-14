import { NextResponse } from 'next/server';
import { ValidationError } from '@/lib/errors/extended_errors/ValidationError';
import {authController} from '@/lib/controllers/account.controller';
import generateFailedResponse from '@/lib/utils/response-generator/FailedResponse';
import generateResponse from '@/lib/utils/response-generator/ValidResponse';
import { DatabaseError } from '@/lib/errors/errors/DatabaseError';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await authController.createUser(data);

    return generateResponse(result, 200);
  } catch (error) {
    if (error instanceof ValidationError) {
      return generateFailedResponse(error.message, 422, error.field);
    }
    if (error instanceof DatabaseError) {
      console.error(`${error.name} OCCURRED:`, error.message);
      return generateFailedResponse("Internal Server error occurred", 500);
    }
    console.error("Error creating account:", error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}
