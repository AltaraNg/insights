"use client";

import cn from "classnames";
import { useState } from "react";
import { SignInResponse, signIn } from "next-auth/react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [_, setError] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError(false);
        setLoading(true);
        try {
            const response: SignInResponse | undefined = await signIn("credentials", { redirect: false, staff_id: email, password });
            if (!response?.ok) {
                setError(true);
            }
            window.location.href = "/";
            setLoading(false);
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
            <button type="button" className={cn("btn btn-primary w-full", loading && "loading")} disabled={loading} onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
}
