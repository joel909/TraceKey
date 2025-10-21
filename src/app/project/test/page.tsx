"use client";

import { useEffect, useState } from 'react';

// This is an advanced type for the full data object
// Note: model and platformVersion are part of the 'high entropy' values
interface UaHighEntropyValues {
  brands: { brand: string, version: string }[];
  mobile: boolean;
  platform: string;
  model: string;
  platformVersion: string;
}

export default function FinalDeviceChecker() {
  const [deviceInfo, setDeviceInfo] = useState({
    brand: '...',
    platform: '...',
    model: '...',
    platformVersion: '...'
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDeviceInfo = async () => {
      // Check if userAgentData API is available
      if (!(navigator as any).userAgentData) {
        setError("User-Agent Client Hints API is not supported in this browser.");
        return;
      }

      try {
        // Request the "high entropy" values, which include the detailed model and platform version
        const uaData = await (navigator as any).userAgentData.getHighEntropyValues([
          "platform",
          "platformVersion",
          "model"
        ]) as UaHighEntropyValues;

        // Find the "real" brand by filtering out the junk value
        const primaryBrand = uaData.brands.find(b => b.brand !== "Not;A=Brand");
        
        setDeviceInfo({
          brand: primaryBrand ? primaryBrand.brand : "Unknown",
          platform: uaData.platform,
          model: uaData.model || "Not Available",
          platformVersion: uaData.platformVersion
        });

      } catch (err) {
        console.error("Error getting high entropy values:", err);
        setError("Could not retrieve detailed device information. The user may have denied the request.");
      }
    };

    getDeviceInfo();
  }, []);

  return (
    <div className="mt-5 p-4 border border-blue-500 bg-blue-50 rounded-lg shadow-md">
      <h4 className="text-lg font-bold text-blue-800">Correct Device Information:</h4>
      
      {error ? (
        <p className="text-red-600 mt-2">{error}</p>
      ) : (
        <ul className="mt-2 space-y-1 list-disc list-inside text-gray-800">
          <li><strong>Brand:</strong> {deviceInfo.brand}</li>
          <li><strong>Platform:</strong> {deviceInfo.platform}</li>
          <li><strong>OS Version:</strong> {deviceInfo.platformVersion}</li>
          <li><strong>Model:</strong> {deviceInfo.model}</li>
        </ul>
      )}
    </div>
  );
}
