"use client";

import { useEffect, useState } from 'react';

export default function ClientSideUserAgentChecker() {
  const [clientUserAgent, setClientUserAgent] = useState('');

  useEffect(() => {
    // This code runs ONLY in the browser on your phone.
    const ua = navigator.userAgent;
    console.log("CLIENT-SIDE USER-AGENT:", ua);
    setClientUserAgent(ua);
  }, []);

  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid red', backgroundColor: '#fff3f3' }}>
      <h4>Client-Side Check:</h4>
      <p style={{ wordBreak: 'break-all' }}>{clientUserAgent || "Loading client-side user agent..."}</p>
    </div>
  );
}
