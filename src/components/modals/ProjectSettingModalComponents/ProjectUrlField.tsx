'use client';

import { Input } from '@/components/ui/input';

interface ProjectUrlFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProjectUrlField({ value, onChange }: ProjectUrlFieldProps) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#647FBC] mb-2 block">
        Deployed URL
      </label>
      <Input
        type="url"
        placeholder="https://example.com"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 rounded-lg border border-gray-300 focus:border-[#647FBC] focus-visible:ring-[#647FBC] text-[#647FBC] placeholder-gray-400 bg-white"
      />
      <p className="text-xs text-gray-500 mt-1">
        The URL where your project is deployed
      </p>
    </div>
  );
}
