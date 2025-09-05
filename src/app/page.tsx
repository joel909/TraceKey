"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// SVG Icon components to replace react-icons
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const EnvelopeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
);

const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);


const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors = { username: '', email: '', password: '' };
        let isValid = true;

        if (formData.username.length < 2) {
            newErrors.username = "Username must be at least 2 characters.";
            isValid = false;
        }
        
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
            isValid = false;
        }

        if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form submitted with values:", formData);
            console.log(`Welcome, ${formData.username}! Check the console for form data.`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#AED6CF] to-[#91ADC8] p-6 font-sans">
            <div className="w-full max-w-md p-8 md:p-10 bg-white rounded-2xl shadow-2xl space-y-8">
                <div className="text-center">
                    <h2
                        className="text-3xl font-extrabold"
                        style={{ color: "#647FBC" }}
                    >
                        Create Account
                    </h2>
                    <p className="text-gray-500 mt-2">Join us and start your journey!</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-7">
                    <div className="space-y-2">
                        <label className="text-gray-700 font-semibold" htmlFor="username">Username</label>
                        <div className="relative flex items-center">
                            <UserIcon className="absolute left-4 h-5 w-5 text-[#647FBC]" />
                            <Input
                                id="username"
                                name="username"
                                placeholder="Your username"
                                value={formData.username}
                                onChange={handleChange}
                                className="pl-12 w-full h-12 rounded-xl border border-gray-300 focus:border-[#647FBC] focus-visible:ring-[#647FBC] transition-all duration-300"
                            />
                        </div>
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-gray-700 font-semibold" htmlFor="email">Email address</label>
                        <div className="relative flex items-center">
                            <EnvelopeIcon className="absolute left-4 h-5 w-5 text-[#647FBC]" />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="pl-12 w-full h-12 rounded-xl border border-gray-300 focus:border-[#647FBC] focus-visible:ring-[#647FBC] transition-all duration-300"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-700 font-semibold" htmlFor="password">Password</label>
                        <div className="relative flex items-center">
                            <LockIcon className="absolute left-4 h-5 w-5 text-[#647FBC]" />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="pl-12 w-full h-12 rounded-xl border border-gray-300 focus:border-[#647FBC] focus-visible:ring-[#647FBC] transition-all duration-300"
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 rounded-xl uppercase tracking-wider font-bold text-white bg-gradient-to-r from-[#647FBC] to-[#91ADC8] hover:from-[#91ADC8] hover:to-[#647FBC] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        Sign Up
                    </Button>
                </form>
                <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <a href="#" className="font-semibold text-[#647FBC] hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

const App = () => {
    return <SignupForm />;
}

export default App;

