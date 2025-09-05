import { Form } from "react-hook-form"

interface FormFooterProps {
    message: string;
    redirectText: string;
    redirectLink: string;
}

export default function FormFooter({ message, redirectText, redirectLink }: FormFooterProps) {
    return(
        <p className="text-center text-sm text-gray-500">
            {message}{' '}
            <a href={redirectLink} className="font-semibold text-[#647FBC] hover:underline">
                {redirectText}
            </a>
        </p>
    )
}