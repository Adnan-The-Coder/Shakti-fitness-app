/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa"; // Importing React Icons
import toast from "react-hot-toast";
// import { NextResponse } from "next/server";

export default function VerifyEmailPage() {
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [verified, setVerified] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (index: number, value: string) => {
        const newCode = [...code];

        // Handle pasted content
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            // Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex]?.focus();
        } else {
            newCode[index] = value;
            setCode(newCode);

            // Move focus to the next input field if value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const verificationCode = code.join("");

        setIsLoading(true);
        try {
            const response = await axios.post('/api/users/verifyemail', { token: verificationCode });
            console.log("After posting axios", response.data);
            setVerified(true);
            toast.success("Email verified successfully");
        } catch (error: any) {
            setError(true);
            console.log(error.response?.data);
            toast.error("Verification failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Auto submit when all fields are filled
    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleSubmit(new Event("submit") as unknown as React.FormEvent<HTMLFormElement>);
        }
    }, [code]);

    return (
      <div className="py-8 min-h-screen bg-[#d9d9d9] flex items-center justify-center relative overflow-hidden">
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-md w-full bg-[#fff4f0] bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl p-8'
            >
                <h1 className="text-4xl font-bold text-center text-[#ff4e2a]">
                    Verify Email
                </h1>
                <p className="text-center text-gray-500 mb-6 mt-5">Enter the 6-digit code sent to your email address.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-between">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-12 text-center text-2xl font-bold bg-[#d8d8d9] text-black border-2 border-[#0000005f] rounded-lg focus:border-green-500 focus:outline-none"
                            />
                        ))}
                    </div>
                    {error && <p className="text-red-500 font-semibold mt-2">Verification failed. Please try again.</p>}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isLoading || code.some((digit) => !digit)}
                        className="w-full bg-gradient-to-r from-[#fe8c00] to-[#f83600] text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-[#f83600] hover:to-[#fe8c00] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
                    >
                        {isLoading ? "Verifying..." : "Verify Email"}
                    </motion.button>
                </form>

                {verified && (
                    <div className="flex flex-col items-center mt-6">
                        <FaCheckCircle className="text-green-500 text-5xl mb-2" />
                        <h2 className="text-2xl">Email Verified</h2>
                        <Link href="/profile" className="text-blue-500 hover:underline mt-2">Continue to Dashboard</Link>
                    </div>
                )}
            </motion.div>
        </div>
    </div>
    );
}