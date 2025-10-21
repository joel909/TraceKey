"use client";

import { useEffect, useState } from 'react';

// Define a type for the User Agent Data object for better TypeScript support
interface UserAgentData {
  brands: { brand: string, version: string }[];
  mobile: boolean;
  platform: string;
  model?: string; // model is an optional property
}

export default function AdvancedDeviceChecker() {
  const [userAgentString, setUserAgentString] = useState('');
  const [userAgentDataObject, setUserAgentDataObject] = useState<UserAgentData | null>(null);

  useEffect(() => {
    // 1. Get the old User-Agent string
    setUserAgentString(navigator.userAgent);

    // 2. Get the new, structured User-Agent Data object
    // The `navigator` object in TypeScript might not have `userAgentData` by default,
    // so we cast it to `any` to access it.
    if ((navigator as any).userAgentData) {
      const uad = (navigator as any).userAgentData as UserAgentData;
      setUserAgentDataObject(uad);
    }
  }, []);

  return (
    <div className="space-y-4">
      {/* Old Method Result */}
      <div className="mt-5 p-3 border border-yellow-500 bg-yellow-50 rounded-md">
        <h4 className="font-bold">Old Method (`navigator.userAgent`):</h4>
        <p className="break-all text-sm text-gray-700">
          {userAgentString || "Loading..."}
        </p>
      </div>

      {/* New Method Result */}
      <div className="mt-5 p-3 border border-green-500 bg-green-50 rounded-md">
        <h4 className="font-bold">New Method (`navigator.userAgentData`):</h4>
        {userAgentDataObject ? (
          <pre className="break-all text-sm text-gray-700">
            {JSON.stringify(userAgentDataObject, null, 2)}
          </pre>
        ) : (
          <p className="text-sm text-red-600">`navigator.userAgentData` is not available in this browser.</p>
        )}
      </div>
    </div>
  );
}
