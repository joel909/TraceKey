import type { Metadata } from "next";
import LoginPage from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your TraceKey account to manage projects and analytics.",
};


export default function Login() {
    return <LoginPage />;
}
