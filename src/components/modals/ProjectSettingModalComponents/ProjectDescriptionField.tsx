'use client';

interface ProjectDescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProjectDescriptionField({ value, onChange }: ProjectDescriptionFieldProps) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#647FBC] mb-2 block">
        Description
      </label>
      <textarea
        placeholder="Enter project description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-20 rounded-lg border border-gray-300 focus:border-[#647FBC] focus-visible:ring-[#647FBC] text-[#647FBC] placeholder-gray-400 bg-white p-3 resize-none"
      />
      <p className="text-xs text-gray-500 mt-1">
        Brief description of your project (optional)
      </p>
    </div>
  );
}
