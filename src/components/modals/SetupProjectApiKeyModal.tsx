// components/ApiSetupModal.tsx
"use client";
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import CopyButton  from '@/components/buttons/CopyButton';
import { Button } from '@/components/ui/button';
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, Info } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus';

interface ApiSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  projectUrl: string;
}

type Language = 'javascript' | 'typescript' | 'python' | 'curl';

const codeExamples = {
  javascript: (apiKey: string, projectUrl: string) => `// Install axios (optional)
// npm install axios

const axios = require('axios');

async function trackVisitor() {
  try {
    const response = await axios.post(
      '${projectUrl}/api/track',
      {
        page: window.location.pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      },
      {
        headers: {
          'Authorization': 'Bearer ${apiKey}',
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Visitor tracked:', response.data);
  } catch (error) {
    console.error('Error tracking:', error);
  }
}

trackVisitor();`,

  typescript: (apiKey: string, projectUrl: string) => `// npm install axios

import axios, { AxiosResponse } from 'axios';

interface TrackingData {
  page: string;
  referrer: string;
  userAgent: string;
}

interface TrackingResponse {
  success: boolean;
  visitorId: string;
}

async function trackVisitor(): Promise<void> {
  try {
    const data: TrackingData = {
      page: window.location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    };

    const response: AxiosResponse<TrackingResponse> = 
      await axios.post(
        '${projectUrl}/api/track',
        data,
        {
          headers: {
            'Authorization': 'Bearer ${apiKey}',
            'Content-Type': 'application/json'
          }
        }
      );
    
    console.log('Visitor tracked:', response.data);
  } catch (error) {
    console.error('Error tracking:', error);
  }
}

trackVisitor();`,

  python: (apiKey: string, projectUrl: string) => `# pip install requests

import requests

def track_visitor():
    url = "${projectUrl}/api/track"
    
    headers = {
        "Authorization": f"Bearer ${apiKey}",
        "Content-Type": "application/json"
    }
    
    data = {
        "page": "/home",
        "referrer": "https://google.com",
        "userAgent": "Mozilla/5.0..."
    }
    
    try:
        response = requests.post(
            url, 
            headers=headers, 
            json=data
        )
        response.raise_for_status()
        
        result = response.json()
        print("Visitor tracked:", result)
        
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")

track_visitor()`,

  curl: (apiKey: string, projectUrl: string) => `curl -X POST "${projectUrl}/api/track" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "page": "/home",
    "referrer": "https://google.com",
    "userAgent": "Mozilla/5.0"
  }'`
};

export function ApiSetupModal({ 
  isOpen, 
  onClose, 
  apiKey, 
  projectUrl 
}: ApiSetupModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('javascript');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl font-bold text-[#647FBC]">
            Setup API Key
          </DialogTitle>
          <DialogDescription className="text-[#647FBC]/70">
            Integrate TraceKey into your application
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable content area */}
        <div className="space-y-6 overflow-y-auto flex-1 pr-2">
          {/* API Key Display */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#647FBC]">
                Your API Key
              </label>
              <a 
                href="/docs/getting-started" 
                target="_blank"
                className="text-xs text-[#647FBC] hover:text-[#5a6fb0] flex items-center gap-1 hover:underline"
              >
                <Info className="h-3 w-3" />
                Learn how this works
              </a>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-2.5 bg-gray-100 rounded-md text-xs text-[#647FBC] font-mono break-all border border-gray-200 overflow-hidden">
                {apiKey}
              </div>
              <CopyButton 
                textToCopy={apiKey} 
                label="API Key"
                size="sm"
              />
            </div>
            <Alert className="border-blue-200 bg-blue-50/50">
              <Info className="h-4 w-4 text-green-600" style={{ color: '#16a34a' }}  />
              <AlertDescription className="text-xs text-blue-800">
                This is your Public API key used as identifier to track visitors. You can Expose this
              </AlertDescription>
            </Alert>
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-[#647FBC]">
              How to integrate
            </h3>
            <p className="text-sm text-[#647FBC]/70">
              Copy the API call to track visitors in your app. Choose your language:
            </p>
          </div>

          {/* Language Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#647FBC]">
                Choose Language
              </label>
                          <Select
                value={selectedLanguage} 
                onValueChange={(value) => setSelectedLanguage(value as Language)}
              >
                <SelectTrigger className="w-[180px] border-[#647FBC] bg-[#FAFDD6] text-[#647FBC] hover:bg-[#647FBC]/10">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-[#FAFDD6]">
                  <SelectItem value="javascript" className="text-[#647FBC] hover:bg-[#647FBC]/10 focus:bg-[#647FBC]/10">JavaScript</SelectItem>
                  <SelectItem value="typescript" className="text-[#647FBC] hover:bg-[#647FBC]/10 focus:bg-[#647FBC]/10">TypeScript</SelectItem>
                  <SelectItem value="python" className="text-[#647FBC] hover:bg-[#647FBC]/10 focus:bg-[#647FBC]/10">Python</SelectItem>
                  <SelectItem value="curl" className="text-[#647FBC] hover:bg-[#647FBC]/10 focus:bg-[#647FBC]/10">cURL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Code Display - with proper overflow handling */}
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              <div className="absolute top-2 right-6 z-10">
                <CopyButton 
                  textToCopy={codeExamples[selectedLanguage](apiKey, projectUrl)}
                  label="Code"
                  variant="secondary"
                  size="sm"
                  displayText='Copy Code'
                />
        
              </div>
              <div className="overflow-x-auto">
                <SyntaxHighlighter
                  language={selectedLanguage === 'curl' ? 'bash' : selectedLanguage}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    padding: '1rem',
                    maxHeight: '400px',
                    overflow: 'auto',
                  }}
                  showLineNumbers
                  wrapLines={true}
                  wrapLongLines={true}
                >
                  {codeExamples[selectedLanguage](apiKey, projectUrl)}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

          {/* Additional Instructions */}
          <div className="space-y-2 bg-[#647FBC]/5 p-3 rounded-lg border border-[#647FBC]/20">
            <h4 className="text-sm font-semibold text-[#647FBC] flex items-center gap-2">
              <Check className="h-4 w-4" />
              Next Steps
            </h4>
            <ul className="space-y-1.5 text-xs text-[#647FBC]/80">
              <li className="flex items-start gap-2">
                <span className="text-[#647FBC] mt-0.5 font-medium">1.</span>
                <span>Copy the code snippet and integrate it into your application</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#647FBC] mt-0.5 font-medium">2.</span>
                <span>Replace placeholder values with your actual data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#647FBC] mt-0.5 font-medium">3.</span>
                <span>Test the integration and monitor visitor data in your dashboard</span>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex-shrink-0 border-t pt-4 mt-4">
          <Button 
            onClick={onClose}
            className="bg-[#647FBC] hover:bg-[#5a6fb0] text-white w-full sm:w-auto"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
