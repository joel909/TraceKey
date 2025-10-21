"use client";
import { useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code, PartyPopper, BarChartHorizontal } from "lucide-react";
import { apiClient } from '@/lib/user-requests/api/client';

// The props type is now { params: Promise<{ apikey: string }> }
export default function SampleAnalyticsPageThemed({ params }: { params: Promise<{ apikey: string }> }) {
  // `use(params)` correctly unwraps the promise to get the object
  const { apikey } = use(params);

  useEffect(() => {
    const trackVisit = async () => {
      if (!apikey) {
        console.error("API key is missing.");
        return;
      }
      console.log("TraceKey: Tracking visit with API Key:", apikey);
      try {
        await apiClient.post('/v1/visits', { api_key: apikey });
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
            It is Working!
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
              When this page loaded, our script sent a POST request to 
              <code className="bg-gray-200 text-gray-700 font-mono text-sm px-1.5 py-0.5 rounded-md mx-1">
                /api/v1/visits
              </code>
              with your project&apos;s unique 
              <code className="bg-gray-200 text-gray-700 font-mono text-sm px-1.5 py-0.5 rounded-md mx-1">
                API_KEY
              </code>.
            </p>
            <p className="text-gray-600">
              This request included headers, IP address, device details, and more. We then decode it all on our end.
            </p>
            <p className="mt-4 text-tracekey-primary font-semibold">
              YAY! Your first visitor (you!) is now logged.
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-800 mb-6">
              You can now check your project dashboard to see the details. Enjoy, have fun!
            </p>
            {/* Use useRouter for navigation */}
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
