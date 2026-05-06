import { NextRequest, NextResponse } from "next/server";
import userClientRequestsController from "@/lib/controllers/client.requests.controller";
import { projectController } from "@/lib/controllers/project.controller";
import { ValidationError } from "@/lib/errors/extended_errors/ValidationError";
import { authController } from "@/lib/controllers/auth.controller";
import { AuthenticationError } from "@/lib/errors/extended_errors/AuthenticationError";
import { cleanDeviceInfo } from "@/lib/utils/cleanDeviceInfo";
import { createCorsPreflightResponse, validateCorsRequest, withCorsHeaders } from "@/lib/utils/cors";

export async function OPTIONS(req: NextRequest) {
  return createCorsPreflightResponse(req);
}

export async function POST(req: NextRequest) {
    const corsError = validateCorsRequest(req);
    if (corsError) {
        return corsError;
    }

    try{
        const body = await req.json();
        const { api_key, additionalDeviceInfo, device_id = "Unknown Device ID", page_route = "", event_name = "" } = body;

        if (!api_key) {
            return withCorsHeaders(req, NextResponse.json({ message: "API key is missing" }, { status: 400 }));
        }

        if (additionalDeviceInfo !== null && typeof additionalDeviceInfo !== "object") {
            return withCorsHeaders(
                req,
                NextResponse.json(
                    { message: "additionalDeviceInfo must be an object, array, or null", field: "additionalDeviceInfo" },
                    { status: 400 },
                ),
            );
        }

        const cleanedDeviceInfo = cleanDeviceInfo(additionalDeviceInfo);
        const userClientController = new userClientRequestsController(req);

        await authController.verifyApiKey(api_key);
        const ip_address = await userClientController.getClientIP();
        const user_agent = req.headers.get("user-agent") || "Unknown User Agent";
        const refferer_url = req.headers.get("referer") || "";
        const device_information = await userClientController.getDeviceInfo();
        const device_type = await userClientController.getDeviceType();
        const cookies =  req.cookies.getAll();
        const location = await userClientController.getDeviceLocation(ip_address);

        await projectController.createUserClientIpRecord(api_key, ip_address, user_agent, refferer_url, device_information, cookies, device_type, location, cleanedDeviceInfo,device_id,page_route,event_name);
        return withCorsHeaders(
            req,
            NextResponse.json(
                { message: "Visit logged successfully", ip_address, device_information, user_agent, refferer_url, cookies },
                { status: 200 },
            ),
        );
    }
    catch (error) {
        if(error instanceof ValidationError){
            return withCorsHeaders(
                req,
                NextResponse.json({ message: error.message, field: error.field }, { status: 400 }),
            );
        }
        else if (error instanceof AuthenticationError){
            return withCorsHeaders(req, NextResponse.json({ message: error.message }, { status: 401 }));
        }
        if (error instanceof SyntaxError) {
            return withCorsHeaders(req, NextResponse.json({ message: "Invalid JSON body" }, { status: 400 }));
        }
        console.error("Error logging visit:", error);
        return withCorsHeaders(req, NextResponse.json({ message: "Error logging visit" }, { status: 500 }));
    }
}
