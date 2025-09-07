"use client";
import { useState} from "react"
import InputField from "@/components/form/InputField";
import UserIcon from "@/components/icons/UserIcon";
import EnvelopeIcon from "@/components/icons/EnvelopeIcon";
import FormContainer from "@/components/form/FormContainer";
import FormFooter from "@/components/form/FormFooter";
import FormSubmitButton from "@/components/form/SubmitButton";
import validateAuthInput from "@/lib/auth/validateAuthInput";
import {cleanInput} from "@/lib/auth/cleanInput";
import requestAccountCreation from "@/lib/auth/accountCreationRequest";
export const metadata = {
  title: "Sign Up - TraceKey",
  description: "Create your TraceKey account to track and manage your website visitors",
};

export default function SignupForm() {
    const [FormData,setFormData] = useState({username:"",email:"",password:"",confirmPassword:""})
    const [emailError,setEmailError] = useState<string | null>(null);
    const [usernameError,setUsernameError] = useState<string | null>(null);
    const [passwordError,setPasswordError] = useState<string | null>(null);

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData, [name]: value }));
    }

    const handleSubmit = async () => {
        console.log("submitting")
        let { password, username, email } = FormData;
        password = cleanInput(password)
        username = cleanInput(username)
        email = cleanInput(email)
        //console.log(password, username, email)
        //console.log("Validating input fields...")
        setEmailError(null);
        setUsernameError(null);
        setPasswordError(null);
        const [isValid, fields,reason] = validateAuthInput(email,password,username);
        if(!isValid) {
            console.log("Invalid input fields detected on",fields,"because : ",reason);
            if (fields === "username") {
                setUsernameError(reason);
            }
            else if (fields === "email") {
                setEmailError(reason);
            }
            else if (fields === "password") {
                setPasswordError(reason);
            }
        }
        else {
            console.log("All input fields are valid");
            try{
                const result = await requestAccountCreation(email,username,password);
                if (!result.ok) {
                    if (result.error && result.field === "email") {
                    console.log("Email error from server:", result.error);
                    setEmailError(result.error);
                    }
                    throw new Error(`API Error: ${result.status} ${result.statusText}`);
                }
                console.log("Account creation request successful:", result);
                
            }catch(error){
                console.error("Error during account creation request:", error);
                
            }
        }

        
    }
    return(
        <FormContainer title="Create your account" description="Sign up to get a TraceKey!">
            <form onSubmit={handleSubmit} className="space-y-7">
                <InputField
                    label="Username"
                    name="username"
                        placeholder="Enter your username"
                        value={FormData.username}
                        onChange={handleFormDataChange}
                        IconComponent={() => (<UserIcon className="absolute left-4 h-5 w-5 text-[#647FBC]" />)}
                        errorMessage={usernameError}
                    />
                     <InputField
                        label="Email"
                        name="email"
                        placeholder="Enter your Email"
                        value={FormData.email}
                        onChange={handleFormDataChange}
                        IconComponent={() => (<EnvelopeIcon className="absolute left-4 h-5 w-5 text-[#647FBC]" />)}
                        errorMessage={emailError}
                    />
                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your Password"
                        value={FormData.password}
                        onChange={handleFormDataChange}
                        IconComponent={() => (<EnvelopeIcon className="absolute left-4 h-5 w-5 text-[#647FBC]" />)}
                        errorMessage={passwordError}
                    />

                </form>
                <FormFooter 
                    message="Already have an account?" 
                    redirectText="Log in" 
                    redirectLink="/login" 
                />
                <FormSubmitButton text="Sign Up" handleSubmit={handleSubmit} />
        </FormContainer>
   )
}