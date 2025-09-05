"use client";

import { use,useState} from "react"
import InputField from "@/components/form/InputField";
import UserIcon from "@/components/icons/UserIcon";
import EnvelopeIcon from "@/components/icons/EnvelopeIcon";
import FormContainer from "@/components/form/FormContainer";
import FormFooter from "@/components/form/FormFooter";
import FormSubmitButton from "@/components/form/SubmitButton";

export const metadata = {
  title: "Sign Up - TraceKey",
  description: "Create your TraceKey account to track and manage your website visitors",
};

export default function SignupForm() {
    const [FormData,setFormData] = useState({username:"",email:"",password:"",confirmPassword:""})
    
    const handleFormDataChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = () => {
        console.log("submitted")
        console.log(FormData)
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
                        errorMessage={null}
                    />
                     <InputField
                        label="Email"
                        name="email"
                        placeholder="Enter your Email"
                        value={FormData.email}
                        onChange={handleFormDataChange}
                        IconComponent={() => (<EnvelopeIcon className="absolute left-4 h-5 w-5 text-[#647FBC]" />)}
                        errorMessage={null}
                    />
                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your Password"
                        value={FormData.password}
                        onChange={handleFormDataChange}
                        IconComponent={() => (<EnvelopeIcon className="absolute left-4 h-5 w-5 text-[#647FBC]" />)}
                        errorMessage={null}
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