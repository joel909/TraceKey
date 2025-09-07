// File: app/api/submit-form/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Parse the request body as JSON
    const data = await request.json();
    const { name, email } = data;

    // 2. Validate the data (optional, but recommended)
    if (!name || !email) {
      return NextResponse.json(
        { message: 'Name and email are required' },
        { status: 400 }
      );
    }

    // 3. Process the data (e.g., save to a database)
    console.log('Received data:', { name, email });
    // Example: await db.save({ name, email });

    // 4. Return a success response
    return NextResponse.json(
      { message: 'Form submitted successfully!', data },
      { status: 201 } // 201 Created
    );
  } catch (error) {
    // Handle any errors that occur during processing
    return NextResponse.json(
      { message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
