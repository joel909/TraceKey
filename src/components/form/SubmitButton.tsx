// components/FormSubmitButton.tsx

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // Import the loader icon

type FormSubmitButtonProps = {
  text: string;
  handleSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
};

export default function FormSubmitButton({
  text,
  handleSubmit,
  isLoading,
}: FormSubmitButtonProps) {
  return (
    <Button
      onClick={handleSubmit}
      type="submit"
      disabled={isLoading}
      className="cursor-pointer w-full h-12 rounded-xl uppercase tracking-wider font-bold text-white bg-gradient-to-r from-[#647FBC] to-[#91ADC8] hover:from-[#91ADC8] hover:to-[#647FBC] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-75 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          <span>Please wait</span>
        </>
      ) : (
        text
      )}
    </Button>
  );
}
