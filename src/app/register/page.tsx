import React from 'react';
import { NavbarLogin } from '@/components/navbar/index';
import { signUp } from '@/server/users';
import Link from 'next/link';
import './register.sass'

export default async function Register() {
  return (
    <div className='register-page'>
      <NavbarLogin/>
      <main className='d-flex ai-center jc-center flex-col'>
        <div className="register">
          <div className="register__inner">
            <div className="register__section register__section--form">
              <div className="register__header">
                <h1>Create Account</h1>
              </div>
              <div className="register__form">
                <span>Enter email:</span>
                <input type="email" />
                <span>Enter password:</span>
                <input type="password" />
                <div className="register__button">
                  <button onClick={signUp}>Submit</button>
                </div>
              </div>
            </div>
            <div className="register__section register__section--content">
              <div className="register__section--content__header">
                <h1>Already have an account?</h1>
              </div>
              <div className="register__section--content__button">
                <button>
                  <Link href='/register'>Login Now</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}