"use client";

import cn from "classnames";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignInResponse, signIn } from "next-auth/react";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError(false);
        setLoading(true);
        try {
            const response: SignInResponse | undefined = await signIn("credentials", { redirect: false, email, password });
            if (!response?.ok) {
                setError(true);
            }
            setLoading(false);
            router.push("/");
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="text"
                    placeholder="Ex. email@email.com"
                    className="input input-bordered w-full form-fix"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    placeholder="Type password here....."
                    className="input input-bordered w-full form-fix"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className={cn("btn btn-primary w-full", loading && "loading")} disabled={loading} onClick={handleSubmit}>
                Submit
            </button>
            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm font-medium leading-6">
                        <span className="px-6 text-gray-900">Or continue with</span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4">
                    <button
                        type="button"
                        onClick={() => signIn("google")}
                        className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] p-3 text-white"
                    >
                        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                        <span className="text-sm font-semibold leading-6">Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
