"use client";
import { useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code, PartyPopper, BarChartHorizontal } from "lucide-react";
import { apiClient } from '@/lib/user-requests/api/client';
import {DeviceInfo} from '@/lib/interfaces/deviceInfoInterface';

// Define types for the data we're working with
interface UaHighEntropyValues {
  brands: { brand: string, version: string }[];
  mobile: boolean;
  platform: string;
  model: string;
  platformVersion: string;
}



export default function SampleAnalyticsPageThemed({ params }: { params: Promise<{ apikey: string }> }) {
  const { apikey } = use(params);

  useEffect(() => {
    const trackVisit = async () => {
      if (!apikey) {
        console.error("API key is missing.");
        return;
      }

      // --- Start of New Device Info Logic ---
      let deviceInfo: DeviceInfo = {}; // Default to an empty object

      try {
        // 1. Check if the modern API is available
        if ((navigator as any).userAgentData) {
          // 2. Request the detailed ("high entropy") values
          const uaData = await (navigator as any).userAgentData.getHighEntropyValues([
            "platform",
            "platformVersion",
            "model"
          ]) as UaHighEntropyValues;

          // 3. Find the real brand name, ignoring the junk value
          const primaryBrand = uaData.brands.find(b => b.brand !== "Not;A=Brand");
          
          // 4. Populate our deviceInfo object with the clean data
          deviceInfo = {
            brand: primaryBrand?.brand,
            model: uaData.model,
            platform: uaData.platform,
            platformVersion: uaData.platformVersion,
          };
        }
      } catch (error) {
        console.warn("Could not get detailed device info, proceeding with basic tracking.", error);
        // If it fails, deviceInfo remains an empty object, and the visit is still tracked.
      }
      // --- End of New Device Info Logic ---

      console.log("TraceKey: Tracking visit with API Key and Device Info:", { apikey, deviceInfo });

      try {
        // 5. Send the API key AND the collected device info in one request
        await apiClient.post('/v1/visits', { 
          api_key: apikey,
          device_info: deviceInfo // Nest the device info for clean data structure
        });
        console.log("TraceKey: Visit tracked successfully!");
      } catch (error) {
        console.error("TraceKey: Failed to track visit.", error);
      }
    };

    trackVisit();
  }, [apikey]);

  return (
    <div className="min-h-screen bg-tracekey-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-tracekey-secondary shadow-lg border-gray-200/80">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-16 bg-tracekey-primary rounded-full flex items-center justify-center shadow-md">
                <PartyPopper className="w-8 h-8 text-black" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold text-gray-800">
            It&apos;s Working!
          </CardTitle>
          <CardDescription className="text-lg text-gray-500 pt-2">
            This sample page confirms that TraceKey is successfully tracking visitors.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-4">
          <div className="text-left my-6 p-6 bg-gray-50/80 rounded-lg border border-gray-200/80">
            <h3 className="text-xl font-bold text-gray-700 mb-3 flex items-center">
                <Code className="w-5 h-5 mr-2 text-tracekey-primary"/>
                How It Works
            </h3>
            <p className="mb-4 text-gray-600">
              When this page loaded, our script collected your accurate device info and sent it in a POST request to 
              <code className="bg-gray-200 text-gray-700 font-mono text-sm px-1.5 py-0.5 rounded-md mx-1">
                /api/v1/visits
              </code>
              with your project&apos;s unique 
              <code className="bg-gray-200 text-gray-700 font-mono text-sm px-1.5 py-0.5 rounded-md mx-1">
                API_KEY
              </code>.
            </p>
            <p className="text-gray-600">
              This now includes details like your phone&apos;s model, brand, and OS version, bypassing any privacy spoofing.
            </p>
            <p className="mt-4 text-tracekey-primary font-semibold">
              YAY! Your first visitor (you!) is now logged with correct device data.
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-800 mb-6">
              You can now check your project dashboard to see the details. Enjoy, have fun!
            </p>
            <Button 
              size="lg"
              onClick={() => window.location.href = "/dashboard"}
              className="bg-tracekey-primary cursor-pointer text-black font-bold py-6 px-8 rounded-lg shadow-md hover:bg-opacity-90 transition-all"
            >
              <BarChartHorizontal className="w-5 h-5 mr-2" />
              Go to My Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
