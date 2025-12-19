'use client';

import { Input } from '@/components/ui/input';

interface ProjectNameFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProjectNameField({ value, onChange }: ProjectNameFieldProps) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#647FBC] mb-2 block">
        Project Name
      </label>
      <Input
        type="text"
        placeholder="Enter project name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 rounded-lg border border-gray-300 focus:border-[#647FBC] focus-visible:ring-[#647FBC] text-[#647FBC] placeholder-gray-400 bg-white"
      />
      <p className="text-xs text-gray-500 mt-1">The name of your project</p>
    </div>
  );
}
