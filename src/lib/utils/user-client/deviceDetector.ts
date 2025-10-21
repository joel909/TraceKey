import {UAParser} from "ua-parser-js";
import {DeviceInfoInterface} from "@/lib/interfaces/deviceInfoInterface";

export function detectDevice(userAgentString: string): DeviceInfoInterface {
    const parser = new UAParser(userAgentString);
    const result = parser.getResult();
    const deviceInfo: DeviceInfoInterface = {
        userAgent: userAgentString,
        browser: {
            name: result.browser.name || undefined,
            version: result.browser.version || undefined,
        },
        device: {
            type: result.device.type || "desktop",
            vendor: result.device.vendor || undefined,
            model: result.device.model || undefined,
        },
        os: {
            name: result.os.name || undefined,
            version: result.os.version || undefined,
        },
        cpu: {
            architecture: result.cpu.architecture || undefined,
        }
    };
    return deviceInfo;


}

export function getDeviceName(deviceInfo: DeviceInfoInterface): string {
    const { device, os } = deviceInfo;
    if (device.model) {
        return `${device.vendor || ''} ${device.model}`.trim();
    }
    if (os.name === 'iOS') {
        return device.type === 'tablet' ? 'iPad' : 'iPhone';
    }
    if (device.type && os.name) {
        return `${os.name} ${device.type}`;
    }
    return os.name || 'Unknown Device';
}
