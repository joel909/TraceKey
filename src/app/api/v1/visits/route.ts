import { NextRequest, NextResponse} from "next/server";
import userClientRequestsController from "@/lib/controllers/client.requests.controller";

export async function POST(req: NextRequest) {
    const userClientController = new userClientRequestsController(req);
    const ip_address = await userClientController.getClientIP();
    const user_agent = await userClientController.getDeviceName();
    
    const refferer_url = req.headers.get("referer") || "";
    const timestamp = new Date().toISOString();
    const device_information = await userClientController.getDeviceInfo();
    const cookies = req.cookies;

    
    console.log("Client IP :", ip_address);
    console.log("Device Information :", device_information);
    return NextResponse.json({ message: "Visit logged successfully", ip_address, device_information, user_agent, refferer_url, timestamp, cookies }, { status: 200 });
}
