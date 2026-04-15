"use client";
import { useState } from "react"
import { useRouter } from "next/navigation";
import InputField from "@/components/form/InputField";
import EnvelopeIcon from "@/components/icons/EnvelopeIcon";
import FormContainer from "@/components/form/FormContainer";
import FormFooter from "@/components/form/FormFooter";
import FormSubmitButton from "@/components/form/SubmitButton";
import validateAuthInput from "@/lib/utils/validateAuthInput";
import { cleanInput } from "@/lib/utils/client/cleanInput";
import { authRequests } from "@/lib/user-requests/AuthRequest";
import { ValidationError } from "@/lib/errors/extended_errors/ValidationError";

export default function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log("Changing", name, "to", value)
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsLoading(true);
        console.log("submitting login")
        
        let { password, email } = formData;
        password = cleanInput(password)
        email = cleanInput(email)
        
        setEmailError(null);
        setPasswordError(null);

        // Basic validation
        if (!email.trim()) {
            setEmailError("Email is required");
            setIsLoading(false);
            return;
        }

        if (!password.trim()) {
            setPasswordError("Password is required");
            setIsLoading(false);
            return;
        }

        try {
            const loginRequestData = {
                email,
                password
            }
            
            console.log("Login request data:", loginRequestData);
            const result = await authRequests.loginUser(loginRequestData);
            
            console.log("Login successful:", result);
            router.push("/dashboard");
            
        } catch (error) {
            if (error instanceof ValidationError) {
                switch (error.field) {
                    case "email":
                        setEmailError(error.message);
                        break;
                    case "password":
                        setPasswordError(error.message);
                        break;
                    default:
                        alert(error.message);
                }
            } else {
                alert("Login failed. Please check your credentials and try again. : " + error);
                console.log("Caught error during login:", error);
            }

            setIsLoading(false);
            console.error("Error during login:", error);
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <FormContainer 
            title="Welcome back" 
            description="Log in to your TraceKey account"
        >
            <form onSubmit={handleSubmit} className="space-y-7">
                <InputField
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleFormDataChange}
                    IconComponent={() => (<EnvelopeIcon className="absolute left-4 h-5 w-5 text-[#647FBC]" />)}
                    errorMessage={emailError}
                />
                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleFormDataChange}
                    IconComponent={() => (<EnvelopeIcon className="absolute left-4 h-5 w-5 text-[#647FBC]" />)}
                    errorMessage={passwordError}
                />
            </form>
            <FormFooter 
                message="Don't have an account?" 
                redirectText="Sign up" 
                redirectLink="/signup" 
            />
            <FormSubmitButton text="Log In" handleSubmit={handleSubmit} isLoading={isLoading} />
        </FormContainer>
    )
}
