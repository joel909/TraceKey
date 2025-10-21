import { NextRequest } from "next/server";
import { getClientIPv4 } from "../utils/user-client/getClientIP";
import {detectDevice, getDeviceName} from "@/lib/utils/user-client/deviceDetector";
import { DeviceInfoInterface } from "../interfaces/deviceInfoInterface";

export default class userClientRequestsController{
    req: NextRequest;
    constructor(req: NextRequest) {
        this.req = req;
        // Initialization code here
    }
    async getClientIP(): Promise<string> {
        return getClientIPv4(this.req);
    }
    async getDeviceInfo(): Promise<DeviceInfoInterface | string> {
        const userAgent = this.req.headers.get("user-agent") || undefined;
        if (!userAgent) {
            return "Unknown Device";
        }
        return detectDevice(userAgent);
    }
    async getDeviceName(): Promise<string> {
        const deviceInfo = await this.getDeviceInfo();
        if (typeof deviceInfo === "string") {
            return deviceInfo;
        }
        return getDeviceName(deviceInfo);
    }
        
}