"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { NavbarAuth } from "@/components/layout/navbar";
import GoogleLoginButton from "@/components/ui/buttons/google/GoogleLogin";
import { authClient } from "@/utils/auth-client";
import { registerSchema } from "@/utils/validation";
import "./register.sass";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedFormData = {
      ...formData,
      [name]: value
    }
  
    const mappedFormData = {
      ...updatedFormData,
      confirm: updatedFormData.confirmPassword
    }
  
    setFormData(updatedFormData)
  
    const result = registerSchema.safeParse(mappedFormData)
  
    if (!result.success) {
      const fieldError = result.error.errors.find((error) =>
        error.path[0] === (name === 'confirmPassword' ? 'confirm' : name)
      )
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: fieldError ? fieldError.message : ''
      }))
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    const mappedFormData = {
      ...formData,
      confirm: formData.confirmPassword
    }
  
    const result = registerSchema.safeParse(mappedFormData)
  
    if (!result.success) {
      const errors = result.error.errors.reduce((acc, err) => {
        const key = err.path[0] === 'confirm' ? 'confirmPassword' : err.path[0]
        acc[key as string] = err.message
        return acc
      }, {} as Record<string, string>)
      setErrors(errors)
      return
    }
  
    setLoading(true)
  
    try {
      await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        fetchOptions: {
          onSuccess: () => {
            router.push("/dashboard")
          },
          onError: () => {
            setErrors((prevErrors) => ({
              ...prevErrors,
              form: "An error occurred, please try again later."
            }))
          }
        }
      })
    } catch {
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: "An error occurred, please try again later."
      }))
    }
  
    setLoading(false)
  }

  return (
    <div className="register-page">
      <NavbarAuth type="register" />
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
                    {errors.name && (
                      <span className="register__form-error">{errors.name}</span>
                    )}
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
                    {errors.email && (
                      <span className="register__form-error">{errors.email}</span>
                    )}
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
                      autoComplete="new-password"
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
                      autoComplete="new-password"
                    />
                  </div>
                </div>       
                {errors.password && (
                  <span className="d-flex jc-center register__form-error">{errors.password}</span>
                )}
                {errors.confirmPassword && (
                    <span className="d-flex jc-center register__form-error">
                      {errors.confirmPassword}
                    </span>
                  )}
                <div className="register__button">
                  <button type="submit" disabled={loading}>
                    Sign Up
                  </button>
                </div>
                <div className="d-flex ac-center jc-center">
                  <span>OR</span>
                </div>
                <GoogleLoginButton />
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
