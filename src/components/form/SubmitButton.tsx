import { Button } from "@/components/ui/button";
interface FormSubmitButtonProps {
    text: string;
    handleSubmit?: () => void;
}
export default function FormSubmitButton({ text, handleSubmit }: FormSubmitButtonProps) {
    return (
         <Button onClick={handleSubmit} type="submit" className="cursor-pointer w-full h-12 rounded-xl uppercase tracking-wider font-bold text-white bg-gradient-to-r from-[#647FBC] to-[#91ADC8] hover:from-[#91ADC8] hover:to-[#647FBC] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl">
            {text}
         </Button>
    )
}