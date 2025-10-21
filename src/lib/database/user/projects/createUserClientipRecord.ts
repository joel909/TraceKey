import { DeviceInfo, DeviceInfoInterface } from "@/lib/interfaces/deviceInfoInterface";
import { query } from "../../config/db";
import { createUserClientIPRecordQuery } from "../../config/queries";

export default async function createUserClientRecord(api_key : string, ip_address: string, user_agent: string, refferer_url: string, device_information: DeviceInfoInterface, _cookies: any,device:string,location:string,additionalDeviceInfo: DeviceInfo = {}) {
    const requestRecordCreation = query("CREATE_USER_IP_RECORD",createUserClientIPRecordQuery,[api_key, ip_address, user_agent, refferer_url, JSON.stringify(device_information), JSON.stringify(_cookies),device,location, JSON.stringify(additionalDeviceInfo)]);
    // console.log(requestRecordCreation);
    return requestRecordCreation;
}