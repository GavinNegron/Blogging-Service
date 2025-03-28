"use client";

import React from 'react';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { NavbarLanding } from '@/components/layout/navbar/index';
import "./landing.sass";

export default function Page() {
  const typedText = useTypingEffect({
    words: ['GAMERS', 'WRITERS', 'DEVELOPERS', 'DESIGNERS', 'STUDENTS', 'MARKETERS', 'HOBBYISTS', 'TEACHERS'],
    typingSpeed: 100,
    deleteSpeed: 100,
    pauseBeforeDelete: 2000,
    pauseBeforeNextWord: 100,
  });

  return (
    <div className='landing-page'>
      <NavbarLanding/>
      <main className='d-flex ai-center flex-col'>
        <section className='cta'>
          <div className="cta__header">
            <h1>
              <span>The Best Blog Creator For</span>
              <span>{typedText || '\u00A0'}</span>
            </h1>
          </div>
          <div className="cta_description">
            <span>Sign up now and start building your blog with ease. No coding needed—just choose a template and start publishing your content.</span>
          </div>
          <div className="cta__image">
            <img src="/dashboard.svg" alt="Dashboard Image" />
          </div>
        </section>
     
        <section className="about">
          <div className="about__inner">

          </div>
        </section>
      </main>
    </div>
  );
}
