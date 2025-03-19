import React from 'react';
import { NavbarLogin } from '@/components/navbar/index';
import { signUp } from '@/server/users';
import Link from 'next/link';
import './register.sass'

export default async function Register() {
  return (
    <div className='register-page'>
      <NavbarLogin />
      <main className='d-flex ai-center jc-center flex-row'>
        <div className="register-img">
          <img src="/register.svg" alt="secure registration" />
        </div>
        <section className="register">
          <div className="register__inner">
            <div className="register__section register__section--form">
              <header className="register__header">
                <h1>Create Account</h1>
              </header>
              <form className="register__form" onSubmit={signUp}>
                <div className="register__form-row">
                  <div className="register__form-item">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" required />
                  </div>
                  <div className="register__form-item">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" required />
                  </div>
                </div>
                <div className="register__form-row">
                  <div className="register__form-item">
                    <label>Select Gender:</label>
                    <div className="register__form-row">
                      <div className="register__form-item--row">
                        <input id='gender-male' name="gender" type="radio" value='Male' required />
                        <label htmlFor='gender-male'>Male</label>
                      </div>
                      <div className="register__form-item--row">
                        <input id='gender-female' name="gender" type="radio" value='Female' required />
                        <label htmlFor='gender-female'>Female</label>
                      </div>
                      <div className="register__form-item--row">
                        <input id='gender-pns' name="gender" type="radio" value='pns' required />
                        <label htmlFor='gender-pns'>Prefer not to say</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="register__form-row">
                  <div className="register__form-item">
                    <label htmlFor="email">Email Address:</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                </div>
                <div className="register__form-row">
                  <div className="register__form-item">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" required />
                  </div>
                  <div className="register__form-item">
                    <label htmlFor="password-confirm">Confirm Password:</label>
                    <input type="password" name="password-confirm" id="password-confirm" required />
                  </div>
                </div>
                <div className="register__form-row">
                  <div className="register__form-item">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" required />
                  </div>
                  <div className="register__form-item">
                    <label htmlFor="birthDate">Birth Date:</label>
                    <input type="date" id="birthDate" name="birthDate" required />
                  </div>
                </div>
                <div className="register__button">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}