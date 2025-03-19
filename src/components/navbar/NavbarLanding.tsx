"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './NavbarLanding.sass';

const NavbarLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [borderScale, setBorderScale] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / scrollHeight;
      setBorderScale(scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`navbar ${isScrolled ? 'navbar__inner--scrolled' : ''}`}>
        <div className="navbar__top">
          <div 
            className="navbar__top-border"
            style={{
              transform: `scaleX(${borderScale})`,
              transformOrigin: 'left',
            }}
          ></div>
          <div className="navbar__top__inner">
            <div className="navbar__top__item">
              <span>Placeholder is currently in early access.</span>
            </div>
            <div className="navbar__top__item">
              <a href="/login">Login</a>
            </div>
          </div>
        </div>
        <div className="navbar__inner">
          <div className="navbar__item">
            <div className="navbar__logo">
              <span>PLACEHOLDER</span>
            </div>
          </div>
          <div className="navbar__item">
            <div className="navbar__list">
              <div className="navbar__list-item">
                <a href="#">Home</a>
              </div>
              <div className="navbar__list-item">
                <a href="#">About</a>
              </div>
              <div className="navbar__list-item">
                <a href="#">Features</a>
              </div>
              <div className="navbar__list-item">
                <a href="#">Pricing</a>
              </div>
              <div className="navbar__list-item">
                <a href="#">Blog</a>
              </div>
            </div>
          </div>
          <div className="navbar__item navbar__item--cta">
            <div className="navbar__theme-toggle">
              <button className="navbar__button--theme">
                <i className="fa-solid fa-moon" />
              </button>
            </div>
            <div className="navbar__cta">
              <Link href="/signup">
                <button className="navbar__button--cta">Get Started!</button>
              </Link>
            </div>
            <div className="navbar__mobile-menu">
              <button className="navbar__button--menu">
                <i className="fa-solid fa-bars" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarLanding;