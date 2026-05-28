"use client";

import type { ReactNode } from "react";
import { AlertCircle, ArrowLeft, LogOut, ShieldAlert, TriangleAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type DashboardErrorCase = "authentication" | "authorization" | "load_failed";

type DashboardErrorCopy = {
  title: string;
  line1: string;
  line2: string;
  reason: string;
  icon: ReactNode;
};

const COPY: Record<DashboardErrorCase, DashboardErrorCopy> = {
  authentication: {
    title: "Authentication error",
    line1: "Your session could not be verified.",
    line2: "Please sign in again to continue to the dashboard.",
    reason: "The session token is missing, expired, or invalid.",
    icon: <ShieldAlert className="h-8 w-8 text-gray-600" />,
  },
  authorization: {
    title: "Authorization error",
    line1: "This dashboard does not exist or you do not have access to it.",
    line2: "The project may be invalid, missing, or restricted to another account.",
    reason: "Your account is authenticated, but it does not have permission for this resource.",
    icon: <AlertCircle className="h-8 w-8 text-gray-600" />,
  },
  load_failed: {
    title: "Failed to load dashboard",
    line1: "We could not load the page right now.",
    line2: "Please try again later or contact the maintainer if the issue continues.",
    reason: "The dashboard data request failed before the page could render.",
    icon: <TriangleAlert className="h-8 w-8 text-gray-600" />,
  },
};

export default function InvalidDashboardPage({
  caseType,
  onBack,
}: {
  caseType: DashboardErrorCase;
  onBack?: () => void;
}) {
  const copy = COPY[caseType];

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    window.location.href = "/dashboard/customer";
  };

  const handleLogout = () => {
    window.location.href = "/logout";
  };

  return (
    <main className="flex-1 p-6">
      <div className="flex min-h-[60vh] flex-col items-center justify-center max-w-2xl mx-auto">
        <Card className="w-full border-gray-200/60 bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-4 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              {copy.icon}
            </div>
            <CardTitle className="mb-2 text-2xl font-bold text-[#647FBC]">
              {copy.title}
            </CardTitle>
            <CardDescription className="text-[#647FBC]/70">
              {copy.line1}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="space-y-3">
              <p className="text-lg text-[#647FBC]">{copy.line2}</p>
              <p className="text-[#647FBC]/70">{copy.reason}</p>
            </div>

            {caseType === "load_failed" && (
              <div className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-left text-sm text-orange-900">
                If this keeps happening, contact the maintainer.
              </div>
            )}

            <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center justify-center rounded-md border border-[#647FBC]/20 px-4 py-2 text-sm font-medium text-[#647FBC] hover:bg-[#647FBC]/10"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </button>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-md bg-[#647FBC] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a6fb0]"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
