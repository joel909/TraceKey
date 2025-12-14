import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
export const renderCollapsibleSection = (
    label: string, 
    content: string, 
    key: 'userAgent' | 'referrerUrl' | 'cookies',
    expandedSections : Record<string, boolean>,
    toggleSection : (key: 'userAgent' | 'referrerUrl' | 'cookies') => void
  ) => {
    const isExpanded = !!expandedSections[key];
    return (
      <div className="space-y-2">
        <Button
          variant="ghost"
          className="flex items-center justify-between w-full px-2 py-1 text-left text-sm font-semibold text-[#647FBC] hover:bg-gray-100"
          onClick={() => toggleSection(key)}
        >
          <span>{label}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isExpanded && (
          <div className="p-3 border rounded-md bg-gray-50/80 text-sm text-gray-700 break-words whitespace-pre-wrap max-h-48 overflow-y-auto font-mono">
            {content}
          </div>
        )}
      </div>
    );
  }