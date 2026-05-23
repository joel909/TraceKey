import { authController } from "@/lib/controllers/auth.controller";
import generateFailedResponse from "@/lib/utils/response-generator/FailedResponse";
import generateResponse from "@/lib/utils/response-generator/ValidResponse";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    const { email, password } = await request.json();
    if (!email || !password) {
        return new Response(JSON.stringify({ message: 'Email and password are required.' }), { status: 400 });
    }
    try{
    const result = await authController.loginUserWithEmailPassword(email, password);
    return generateResponse(result, 200)
    }catch(error){
        if (error instanceof Error) {
            console.error(`${error.name} OCCURRED:`, error.message);
            return generateFailedResponse(error.message, 401)
        }
        console.error("Error creating account:", error);
            return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
    }
}