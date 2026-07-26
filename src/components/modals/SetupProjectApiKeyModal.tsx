"use client";

import { useMemo } from "react";
import {
  Activity,
  CheckCircle2,
  ExternalLink,
  KeyRound,
  PackagePlus,
  Terminal,
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
    <section className="relative grid gap-4 border-b border-slate-800 px-5 py-6 last:border-b-0 sm:grid-cols-[48px_1fr] sm:px-7">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="mb-4 flex items-start gap-3">
          <span className="pt-0.5 font-mono text-xs font-semibold tracking-widest text-slate-500">
            {number}
          </span>
          <div>
            <h3 className="font-semibold text-slate-100">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/80 bg-[#090f1c]">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-3 py-2">
        <span className="font-mono text-[11px] text-slate-500">{label}</span>
        <CopyButton
          textToCopy={code}
          label={label}
          variant="ghost"
          displayText="Copy"
          className="h-7 border-0 px-2 text-xs text-slate-400 hover:bg-slate-800 hover:text-cyan-300"
        />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-slate-300 sm:text-[13px]">
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
        className="max-h-[90vh] gap-0 overflow-hidden border-slate-700 bg-slate-950 p-0 text-slate-100 shadow-2xl sm:max-w-4xl"
        aria-describedby="api-setup-description"
      >
        <DialogHeader className="border-b border-slate-800 bg-[#0b1220] px-5 py-4 pr-14 text-left sm:px-7">
          <div className="mb-2 flex items-center gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ml-2 font-mono text-[11px] text-slate-600">
              tracekey / setup
            </span>
          </div>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-white">
            <Terminal className="h-5 w-5 text-cyan-300" />
            Connect your project
          </DialogTitle>
          <DialogDescription
            id="api-setup-description"
            className="text-sm text-slate-400"
          >
            Install the official Tracekey SDK and start tracking events in three steps.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto">
          <div className="border-b border-slate-800 bg-gradient-to-r from-cyan-400/5 to-transparent px-5 py-3 sm:px-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                Your public project key is ready
              </div>
              <a
                href="https://github.com/joel909/tracekey-sdk"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-cyan-300"
              >
                View SDK documentation
                <ExternalLink className="h-3 w-3" />
              </a>
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
            <p className="mt-3 text-xs leading-5 text-slate-500">
              The SDK automatically attaches the current route, device ID, and device details.
              It also supports heartbeat, quit, custom, join-queue, and boarded events.
            </p>
          </SetupStep>
        </div>

        <DialogFooter className="flex-row items-center justify-between border-t border-slate-800 bg-[#0b1220] px-5 py-4 sm:px-7">
          <CopyButton
            textToCopy={fullSetup}
            label="Full setup"
            displayText="Copy all steps"
            className="border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-cyan-300"
          />
          <Button
            onClick={onClose}
            className="bg-cyan-300 text-slate-950 hover:bg-cyan-200"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
