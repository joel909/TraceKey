'use client';

import { Button } from '@/components/ui/button';
import { X, Save } from 'lucide-react';

interface ModalFooterProps {
  onCancel: () => void;
  onSave: () => void;
  isSaving: boolean;
}

export function ModalFooter({ onCancel, onSave, isSaving }: ModalFooterProps) {
  return (
    <div className="flex gap-3 pt-6 border-t mt-6">
      <Button
        variant="outline"
        onClick={onCancel}
        disabled={isSaving}
        className="border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        <X className="mr-2 h-4 w-4" />
        Cancel
      </Button>
      <Button
        onClick={onSave}
        disabled={isSaving}
        className="bg-[#647FBC] hover:bg-[#5a6fb0] text-white"
      >
        {isSaving ? (
          <>
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </>
        )}
      </Button>
    </div>
  );
}
