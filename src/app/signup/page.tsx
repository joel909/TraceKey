import type { Metadata } from "next";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your TraceKey account to track and manage website visitors.",
};


export default function SignupPage() {
    return <SignupForm />;
}
