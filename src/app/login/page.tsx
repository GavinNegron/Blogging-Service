"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavbarLogin } from '@/components/navbar/index';
import { signIn } from '@/server/users';
import Link from 'next/link';
import './login.sass';

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

    const result = await signIn({ email, password });

    if (result?.success) {
      router.push('/dashboard'); 
    } else {
      setError(result?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className='login-page'>
      <NavbarLogin />
      <main className='d-flex ai-center jc-center flex-col'>
        <div className="login">
          <div className="login__inner">
            <div className="login__section login__section--form">
              <div className="login__header">
                <h1>Login</h1>
              </div>
              <form className="login__form" onSubmit={handleSubmit}>
                {error && <p className="login__form__error"><i className="fa-solid fa-hexagon-exclamation"></i>{error}</p>}
                <span>Enter email:</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span>Enter password:</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="login__button">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
            <div className="login__section login__section--content">
              <div className="login__section--content__header">
                <h1>New Here? Create an account now!</h1>
              </div>
              <div className="login__section--content__button">
                <button>
                  <Link href='/register'>Register Now</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
