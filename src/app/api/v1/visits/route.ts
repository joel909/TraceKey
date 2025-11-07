import { NextRequest, NextResponse} from "next/server";
import userClientRequestsController from "@/lib/controllers/client.requests.controller";
import { projectController } from "@/lib/controllers/project.controller";
import { ValidationError } from "@/lib/errors/extended_errors/ValidationError";
import { authController } from "@/lib/controllers/auth.controller";
import { AuthenticationError } from "@/lib/errors/extended_errors/AuthenticationError";
import { cleanDeviceInfo } from "@/lib/utils/cleanDeviceInfo";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { api_key, additionalDeviceInfo = {} } = body;
    if (!api_key) {return NextResponse.json({ message: "API key is missing" }, { status: 400 });}
    
    // Validate additionalDeviceInfo type
    if (additionalDeviceInfo !== null && typeof additionalDeviceInfo !== 'object') {
        throw new ValidationError("additionalDeviceInfo must be an object, array, or null", "additionalDeviceInfo");
    }
    
    // Validate and clean the additionalDeviceInfo
    const cleanedDeviceInfo = cleanDeviceInfo(additionalDeviceInfo);
    
    await authController.verifyApiKey(api_key);
    const userClientController = new userClientRequestsController(req);

    try{
        const ip_address = await userClientController.getClientIP();
        const user_agent = req.headers.get("user-agent") || "Unknown User Agent";
        const refferer_url = req.headers.get("referer") || "";
        const device_information = await userClientController.getDeviceInfo();
        const device_type = await userClientController.getDeviceType();
        const cookies =  req.cookies.getAll();
        const location = await userClientController.getDeviceLocation(ip_address);
        await projectController.createUserClientIpRecord(api_key, ip_address, user_agent, refferer_url, device_information, cookies, device_type, location, cleanedDeviceInfo);
        return NextResponse.json({ message: "Visit logged successfully", ip_address, device_information, user_agent, refferer_url, cookies }, { status: 200 });
    }
    catch (error) {
        if(error instanceof ValidationError){
            return NextResponse.json({ message: error.message, field: error.field }, { status: 400 });
        }
        else if (error instanceof AuthenticationError){
            return NextResponse.json({ message: error.message }, { status: 401 });
        }
        console.error("Error logging visit:", error);
        return NextResponse.json({ message: "Error logging visit" }, { status: 500 });
    }
    

    
    
}
