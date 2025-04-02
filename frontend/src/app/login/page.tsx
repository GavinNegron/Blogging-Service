"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavbarAuth } from '@/components/layout/navbar/index';
import './login.sass';
import GoogleLoginButton from '@/components/ui/buttons/google/GoogleLogin';
import { authClient } from '@/utils/auth-client';

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email.trim() || !password.trim()) {
            setError("Email and password are required.");
            return;
        }

        await authClient.signIn.email({ email, password });

        try {
            await authClient.signIn.email({
              email,
              password,
              fetchOptions: {
                onSuccess: () => {
                    router.push('/dashboard');
                },
                onError: () => {
                    setError("Invalid email or password.");
                },
              },
            });
          } catch {
            console.error("An unexpected error occurred.");
          }
    };

    return (
        <div className='login-page'>
            <NavbarAuth type='login'/>
            <main className='d-flex ai-center jc-center flex-col'>
                <div className="login">
                    <div className="login__inner">
                        <div className="login__section login__section--form">
                            <div className="login__header">
                                <h1>Login</h1>
                            </div>
                            <form className="login__form" onSubmit={handleSubmit}>
                                {error && <p className="login__form__error"><i className="fa-solid fa-hexagon-exclamation"></i>{error}</p>}
                                <span className='login__form-span'>Enter email:</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <span className='login__form-span'>Enter password:</span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="login__button">
                                    <button type="submit">Submit</button>
                                </div>
                                <span className='d-flex ac-center jc-center login__form-span'>OR</span>
                                <GoogleLoginButton/>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}