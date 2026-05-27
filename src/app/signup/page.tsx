import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your TraceKey account to track and manage website visitors.",
};


export default function SignupPage() {
    redirect("/login");
}
