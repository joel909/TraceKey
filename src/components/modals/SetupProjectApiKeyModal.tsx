"use client";

import { useMemo } from "react";
import {
  Activity,
  ExternalLink,
  KeyRound,
  PackagePlus,
} from "lucide-react";

import CopyButton from "@/components/buttons/CopyButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ApiSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
}

interface SetupStepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function SetupStep({
  number,
  title,
  description,
  icon,
  children,
}: SetupStepProps) {
  return (
    <section className="grid gap-4 rounded-xl border border-gray-200/80 bg-white p-4 sm:grid-cols-[44px_1fr] sm:p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#647FBC]/10 text-[#647FBC]">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#647FBC]/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#647FBC]">
              STEP {number}
            </span>
            <h3 className="font-semibold text-[#405A94]">{title}</h3>
          </div>
          <p className="mt-1.5 text-sm leading-5 text-[#647FBC]/70">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100/70 px-3 py-1.5">
        <span className="font-mono text-[11px] text-gray-500">{label}</span>
        <CopyButton
          textToCopy={code}
          label={label}
          variant="ghost"
          displayText="Copy"
          className="h-7 border-0 px-2 text-xs text-[#647FBC] hover:bg-[#647FBC]/10"
        />
      </div>
      <pre className="overflow-x-auto p-3.5 font-mono text-xs leading-6 text-slate-700 sm:text-[13px]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function ApiSetupModal({ isOpen, onClose, apiKey }: ApiSetupModalProps) {
  const snippets = useMemo(() => {
    const environment = `NEXT_PUBLIC_TRACEKEY_API_KEY=${apiKey}`;
    const client = `// src/lib/tracekey.ts
import { TracekeyClient } from 'tracekey-sdk';

export const tracekey = new TracekeyClient({
  apiKey: process.env.NEXT_PUBLIC_TRACEKEY_API_KEY!,
});`;
    const tracking = `'use client';

import { useEffect } from 'react';
import { tracekey } from '@/lib/tracekey';

export function TrackedPage() {
  useEffect(() => {
    void tracekey.logLandingEvent();
  }, []);

  return (
    <button onClick={() => tracekey.logButtonClickEvent('checkout')}>
      Checkout
    </button>
  );
}`;

    return { environment, client, tracking };
  }, [apiKey]);

  const fullSetup = `npm install tracekey-sdk\n\n# .env.local\n${snippets.environment}\n\n${snippets.client}\n\n${snippets.tracking}`;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="flex max-h-[85vh] flex-col gap-0 overflow-hidden rounded-xl border border-gray-200/60 bg-white p-0 text-[#647FBC] shadow-xl sm:max-w-3xl"
        aria-describedby="api-setup-description"
      >
        <DialogHeader className="border-b border-gray-200/80 px-5 py-5 pr-14 text-left sm:px-6">
          <DialogTitle className="text-2xl font-bold text-[#647FBC]">
            Setup API Key
          </DialogTitle>
          <DialogDescription
            id="api-setup-description"
            className="text-sm text-[#647FBC]/70"
          >
            Connect this project to your application with the official Tracekey SDK.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50/40 p-5 sm:p-6">
          <div className="rounded-xl border border-[#647FBC]/20 bg-[#FAFDD6]/45 p-4">
            <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#405A94]">Your project API key</p>
                <p className="mt-0.5 text-xs text-[#647FBC]/65">
                  This public key identifies events sent to this project.
                </p>
              </div>
              <a
                href="https://github.com/joel909/tracekey-sdk"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#647FBC] hover:text-[#405A94] hover:underline"
              >
                SDK documentation
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="flex min-w-0 items-center gap-2">
              <code className="min-w-0 flex-1 truncate rounded-md border border-gray-200 bg-white px-3 py-2 font-mono text-xs text-slate-700">
                {apiKey}
              </code>
              <CopyButton textToCopy={apiKey} label="API key" />
            </div>
          </div>

          <SetupStep
            number="01"
            title="Install the SDK"
            description="Add the official browser SDK to your JavaScript or TypeScript project."
            icon={<PackagePlus className="h-5 w-5" />}
          >
            <CodeBlock code="npm install tracekey-sdk" label="Terminal" />
          </SetupStep>

          <SetupStep
            number="02"
            title="Configure your API key"
            description="Add the public key to .env.local, then create one shared Tracekey client."
            icon={<KeyRound className="h-5 w-5" />}
          >
            <div className="space-y-3">
              <CodeBlock code={snippets.environment} label=".env.local" />
              <CodeBlock code={snippets.client} label="src/lib/tracekey.ts" />
            </div>
          </SetupStep>

          <SetupStep
            number="03"
            title="Track your first events"
            description="Call logging methods from client components, effects, or browser event handlers."
            icon={<Activity className="h-5 w-5" />}
          >
            <CodeBlock code={snippets.tracking} label="TrackedPage.tsx" />
            <p className="mt-3 text-xs leading-5 text-[#647FBC]/65">
              The SDK automatically attaches the current route, device ID, and device details.
              It also supports heartbeat, quit, custom, join-queue, and boarded events.
            </p>
          </SetupStep>
        </div>

        <DialogFooter className="flex-row items-center justify-between border-t border-gray-200/80 bg-white px-5 py-4 sm:px-6">
          <CopyButton
            textToCopy={fullSetup}
            label="Full setup"
            displayText="Copy all steps"
            className="border-[#647FBC]/25 bg-white text-[#647FBC] hover:bg-[#647FBC]/10 hover:text-[#405A94]"
          />
          <Button
            onClick={onClose}
            className="bg-[#647FBC] text-white hover:bg-[#5a6fb0]"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
