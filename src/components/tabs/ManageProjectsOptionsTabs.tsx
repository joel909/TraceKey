"use client";

import { TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Clock } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_DURATION_KEY, DURATION_OPTIONS, normalizeDurationKey } from "@/lib/utils/client/durationMaps";

export default function ManageProjectHeading({tabs}: {tabs: string[]}) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedDuration = normalizeDurationKey(searchParams.get("duration"));

    // If the only tab provided is "overview" or nothing, don't show the tabs bar, just the time range filter.
    // If there are multiple tabs, show both the tabs and the time filter.
    const showTabs = tabs.length > 1;

    const handleDurationChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === DEFAULT_DURATION_KEY) {
            params.delete("duration");
        } else {
            params.set("duration", value);
        }

        const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
        router.replace(nextUrl);
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4 pb-2">
            {showTabs ? (
                <TabsList className="bg-white/70 border border-gray-200/60 w-full sm:w-auto overflow-x-auto justify-start">
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab} value={tab.toLowerCase()} className="data-[state=active]:bg-[#647FBC] data-[state=active]:text-white whitespace-nowrap">
                            {tab}
                        </TabsTrigger>
                    ))}
                </TabsList>
            ) : (
                <div className="hidden sm:block" /> /* Layout spacer */
            )}
            
            <Select value={selectedDuration} onValueChange={handleDurationChange}>
                <SelectTrigger className="w-[180px] bg-white/70 border-gray-200/60 shadow-sm focus:ring-[#647FBC] self-end">
                    <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-[#647FBC]" />
                        <SelectValue placeholder="Timeframe" />
                    </div>
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200/60 shadow-md">
                    {DURATION_OPTIONS.map((option) => (
                        <SelectItem
                            key={option.key}
                            value={option.key}
                            className="text-gray-700 cursor-pointer hover:bg-gray-50 focus:bg-gray-50 focus:text-gray-900"
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
