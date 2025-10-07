// components/CopyButton.tsx
"use client";

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "ghost" | "secondary";
  displayText?: string; 
}

export default function CopyButton({ 
  textToCopy, 
  label = "Text",
  className,
  size = "sm",
  variant = "outline",
  displayText = ""
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      toast.success(`${label} copied to clipboard!`);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      toast.error('Failed to copy');
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleCopy}
      disabled={isCopied}
      className={cn(
        "border-[#647FBC]/20 text-[#647FBC] hover:bg-[#647FBC]/10 cursor-pointer transition-all duration-200",
        isCopied && "bg-green-50 border-green-300 text-green-600 hover:bg-green-50",
        className
      )}
    >
      <div className="relative w-4 h-4">
        {/* Copy Icon */}
        <Copy
          className={cn(
            "absolute inset-0 h-4 w-4 transition-all duration-300 ease-in-out",
            isCopied 
              ? "scale-0 opacity-0 rotate-180" 
              : "scale-100 opacity-100 rotate-0"
          )}
        />
        
        
        {/* Check Icon */}
        <Check
          className={cn(
            "absolute inset-0 h-4 w-4 transition-all duration-300 ease-in-out",
            isCopied 
              ? "scale-100 opacity-100 rotate-0" 
              : "scale-0 opacity-0 -rotate-180"
          )}
        />
      </div>
      {displayText}
    </Button>
  );
}
