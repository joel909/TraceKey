'use client';

interface SuccessMessageProps {
  message?: string;
}

export function SuccessMessage({ message = '✓ Updated successfully' }: SuccessMessageProps) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
      <p className="text-sm text-green-700 font-medium">{message}</p>
    </div>
  );
}
