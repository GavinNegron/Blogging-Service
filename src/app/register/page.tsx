"use client";

import React, { useState, useEffect } from "react";
import { NavbarLogin } from "@/components/navbar/index";
import { signUp } from "@/server/users";
import { authClient } from "@/utils/auth-client";
import "./register.sass";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const result = await signUp({
      email: formData.email,
      password: formData.password,
      name: formData.name,
    });

    if (!result.success) {
      alert(result.message);
    }
  };
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
        provider: "google"
    })
  }
  
  return (
    <div className="register-page">
      <NavbarLogin />
      <main className="d-flex ai-center jc-center flex-row">
        <section className="register">
          <div className="register__inner">
            <div className="register__section register__section--form">
              <header className="register__header">
                <h1>Create Account</h1>
              </header>
              <form className="register__form" onSubmit={handleSubmit}>
                <div className="register__form-row">
                  <div className="register__form-item">
                    <label htmlFor="name">Full Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="register__form-row">
                  <div className="register__form-item">
                    <label htmlFor="email">Email Address:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="register__form-row">
                  <div className="register__form-item">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="register__form-item">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="register__button">
                  <button type="submit">Sign Up</button>
                </div>
                <div className="d-flex ac-center jc-center">
                  <span>OR</span>
                </div>
              </form>
              <div className="register__button">
                <button type="button" onClick={handleGoogleLogin}>
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}