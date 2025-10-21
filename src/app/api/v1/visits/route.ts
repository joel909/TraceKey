import { NextRequest, NextResponse} from "next/server";
import { getClientIPv4 } from "@/lib/utils/user-client/getClientIP";
import userClientRequestsController from "@/lib/controllers/client.requests.controller";

export async function POST(req: NextRequest) {
    const userClientController = new userClientRequestsController(req);
    const clientIp = userClientController.getClientIP();
    const device_information = userClientController.getDeviceInfo();
    console.log("Client IP :", clientIp);
    console.log("Device Information :", device_information);
    return NextResponse.json({ message: "Visit logged successfully", clientIp, device_information }, { status: 200 });
}
