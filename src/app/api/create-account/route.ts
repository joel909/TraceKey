
import { NextResponse } from 'next/server';
import UserHandler from "../../../lib/database/user/UserHandler"
import gen_auth_key from '@/lib/utils/auth_key';
import {cleanInputForServer} from '@/lib/auth/api-functions/cleanInputs';
import validateAuthInput from '@/lib/auth/validateAuthInput';
import { ValidationError } from '@/lib/errors/ValidationError';
import { fields } from '@hookform/resolvers/arktype/src/__tests__/__fixtures__/data.js';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    let { username, email, password } = data;
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'Username, email, and password are required' },
        { status: 400 }
      );
    }
    const userHandler = new UserHandler();
    password = cleanInputForServer(password);
    username = cleanInputForServer(username);
    email = cleanInputForServer(email);
    const [isValid, fields,reason] = validateAuthInput(email,password,username);

    if(!isValid) {
        return NextResponse.json(
            { message: `Invalid input fields detected on ${fields} because : ${reason}` },
            { status: 400 }
          );
    }

    const createAccount = await userHandler.createUser(email, username, password, gen_auth_key());

    console.log('Successfully Created User Account with', { username, email, password });

    return NextResponse.json(
      { message: 'Account created successfully!', data: createAccount },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ValidationError && error.field === 'email') {
      return NextResponse.json({ error: error.message ,field : error.field}, { status: 422 });
    }
    console.error(`Error: Failed To Create Account Main Route : \n\t${error}`);
    return NextResponse.json(
      { message: 'An unexpected error occurred.'},
      { status: 500 }
    );
  }
}


