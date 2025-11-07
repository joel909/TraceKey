import { cleanInputForServer } from "./cleanInputs";

/**
 * Cleans device information object to prevent XSS attacks.
 * 
 * - Accepts any input (null, objects, arrays, primitives)
 * - Only sanitizes string values using DOMPurify
 * - Leaves non-string values (numbers, booleans, etc.) unchanged
 * - For arrays: cleans string elements, keeps others unchanged
 * - Returns the cleaned object/array safe from injection attacks
 * 
 * @param deviceInfo - The device information object from the client
 * @returns Cleaned device information object or array
 * 
 * @example
 * const dirty = { brand: "<img onerror='alert(1)'>", model: "" };
 * const clean = cleanDeviceInfo(dirty);
 * // Result: { brand: "&lt;img onerror='alert(1)'&gt;", model: "" }
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cleanDeviceInfo(deviceInfo: any): any {
    // If it's null or a primitive, return as-is
    if (deviceInfo === null || typeof deviceInfo !== 'object') {
        return deviceInfo;
    }

    // Handle arrays
    if (Array.isArray(deviceInfo)) {
        return deviceInfo.map(item => {
            if (typeof item === 'string') {
                return cleanInputForServer(item);
            }
            return item;
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cleanedInfo: Record<string, any> = {};

    // Iterate through the object properties and clean string values
    for (const [key, value] of Object.entries(deviceInfo)) {
        if (typeof value === 'string') {
            // Clean string values to prevent XSS
            cleanedInfo[key] = cleanInputForServer(value);
        } else {
            // Keep non-string values as is
            cleanedInfo[key] = value;
        }
    }

    return cleanedInfo;
}
