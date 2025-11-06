import { NextRequest, NextResponse} from "next/server";
import userClientRequestsController from "@/lib/controllers/client.requests.controller";
import { projectController } from "@/lib/controllers/project.controller";
import { ValidationError } from "@/lib/errors/extended_errors/ValidationError";
//TODO 
//1 -- VALIDATE THE API KEY AND MAKE SURE IT IS REGISTERED TO A PROJECT
//2 -- Validate the body of the request of additional device info and other fields to prevent injection attacks
export async function POST(req: NextRequest) {
    const body = await req.json();
    const { api_key, additionalDeviceInfo = {} } = body;
    if (!api_key) {return NextResponse.json({ message: "API key is missing" }, { status: 400 });}
    const userClientController = new userClientRequestsController(req);

    try{
        // const additionalDeviceInfo = req.
        // await authController.verifyAuthKey(auth_key);
        const ip_address = await userClientController.getClientIP();
        const user_agent = req.headers.get("user-agent") || "Unknown User Agent";
        const refferer_url = req.headers.get("referer") || "";
        const device_information = await userClientController.getDeviceInfo();
        const device_type = await userClientController.getDeviceType();
        const cookies =  req.cookies.getAll();
        const location = await userClientController.getDeviceLocation(ip_address);
        await projectController.createUserClientIpRecord(api_key, ip_address, user_agent, refferer_url, device_information, cookies, device_type, location,additionalDeviceInfo);
        console.log("Client IP :", ip_address);
        console.log("Device Information :", device_information);
        return NextResponse.json({ message: "Visit logged successfully", ip_address, device_information, user_agent, refferer_url, cookies }, { status: 200 });
    }
    catch (error) {
        if(error instanceof ValidationError){
            return NextResponse.json({ message: error.message, field: error.field }, { status: 400 });
        }
        console.error("Error logging visit:", error);
        return NextResponse.json({ message: "Error logging visit" }, { status: 500 });
    }
    

    
    
}
