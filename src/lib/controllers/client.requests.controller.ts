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
    async getDeviceType(): Promise<string> {
        let device_type : string = "Desktop";
        const deviceInfo = await this.getDeviceInfo();
        if (typeof deviceInfo !== "string") {
            if (deviceInfo.device.type !== "Desktop") {
                device_type = "Mobile";
                return device_type;
            }

        }
        return device_type;
    }
    async getDeviceName(): Promise<string> {
        const deviceInfo = await this.getDeviceInfo();
        if (typeof deviceInfo === "string") {
            return deviceInfo;
        }
        return getDeviceName(deviceInfo);
    }
    async getDeviceLocation(ip:string): Promise<string> {
        // const ip = await this.getClientIP();
        try{
            const response = await fetch(`http://ip-api.com/json/${ip}`);
            const data = await response.json();
            return data.country || "Unknown Location";
        }catch(error){
            return "Unknown Location";
        }
    }
        
}