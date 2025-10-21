// app/your-test-page/page.tsx
import { headers } from 'next/headers';
import ClientSideUserAgentChecker from '@/app/project/test/ClientSideUserAgentChecker'; // Adjust path

export default async function TestPage() {
  // 1. Get the User-Agent on the SERVER
  const serverUserAgent = (await headers()).get('user-agent');
  console.log("SERVER-SIDE USER-AGENT:", serverUserAgent);

  return (
    <div>
      <h1>User-Agent Test</h1>
      <div style={{ padding: '10px', border: '1px solid blue', backgroundColor: '#f0f8ff' }}>
        <h4>Server-Side Result:</h4>
        <p style={{ wordBreak: 'break-all' }}>{serverUserAgent}</p>
      </div>

      {/* 2. Render the client-side component */}
      <ClientSideUserAgentChecker />
    </div>
  );
}
