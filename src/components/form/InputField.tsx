import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    errorMessage: string | null;
}
export default function InputField({ label, name, placeholder, value, onChange, IconComponent, errorMessage, type }: InputFieldProps) {
  return (
    <div>
      <div className="space-y-2">
        <label className="text-[#647FBC] font-semibold" htmlFor={label}>{label}</label>
            <div className="relative flex items-center">
            <IconComponent className="absolute left-4 h-5 w-5 text-[#647FBC]" />
            <Input
                type={type||"text"}
                id={label}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="text-blue-300 pl-12  w-full h-12 rounded-xl border border-gray-300 focus:border-[#647FBC] focus-visible:ring-[#647FBC] transition-all duration-300"
            />
            </div>
            {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
        </div>
    </div>
  );
}
