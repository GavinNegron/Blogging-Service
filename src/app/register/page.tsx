"use client";

import React, { useState } from "react";
import { NavbarLogin } from "@/components/navbar/index";
import { authClient } from "@/utils/auth-client";
import { signUp } from "@/server/users"; 
import "./register.sass";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({ provider: "google" });
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // No change here, as null is allowed.
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    setLoading(true);
  
    const response = await signUp({
      email: formData.email,
      password: formData.password,
      name: formData.name,
    });
  
    setLoading(false);
  
    if (!response.success) {
      setError(response.message ?? "An unknown error occurred."); // Ensure message is always a string
    } else {
      console.log("User signed up successfully.");
    }
  };

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
                {error && <p className="error-message">{error}</p>}
                <div className="register__button">
                  <button type="submit" disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"}
                  </button>
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