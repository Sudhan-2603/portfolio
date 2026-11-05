import { useEffect, useRef, useState, useCallback } from 'react';
import './WhiteHoleSection.css';
import logoImg from '../../assets/Logo-trans.png';
import resumePdf from '../../assets/certificate/resume.PDF';

/**
 * WhiteHoleSection
 * Symmetrical counterpart to the opening Black Hole transition:
 * Center small white dots expand into a massive singularity based on user scroll,
 * filling the entire viewport and seamlessly transitioning into the White Theme.
 */
export default function WhiteHoleSection({ scrollContainerRef, onScrollToTop }) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const singularityRef = useRef(null);
  const orbitsRef = useRef(null);
  const contentRef = useRef(null);
  const hintRef = useRef(null);

  const [isWhiteThemeActive, setIsWhiteThemeActive] = useState(false);

  // Concentric white orbit tiers with small orbiting white dots & luminous trails
  const whiteOrbitTiers = [
    { radius: 50, count: 6, speed: '7s', dotSize: 5 },
    { radius: 90, count: 8, speed: '11s', dotSize: 6 },
    { radius: 140, count: 10, speed: '15s', dotSize: 7 },
    { radius: 200, count: 12, speed: '19s', dotSize: 5 },
  ];

  // Calculate scroll progress through the 240vh section inside the scroll container
  const updateScrollProgress = useCallback(() => {
    const section = sectionRef.current;
    const container = scrollContainerRef?.current;
    if (!section || !container) return;

    const sectionRect = section.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Distance scrolled past section top
    const relativeTop = sectionRect.top - containerRect.top;
    const scrollDistance = section.offsetHeight - container.clientHeight;

    if (scrollDistance <= 0) return;

    const p = relativeTop <= 0
      ? Math.min(1, Math.max(0, -relativeTop / scrollDistance))
      : 0;

    // Dynamic direct style transforms for instant, stutter-free 60fps response
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const maxDim = Math.hypot(winW, winH);
    // Target scale to exceed corners of viewport starting from a 34px circle
    const targetScale = Math.max(90, Math.ceil((maxDim / 34) * 1.55));

    // Power curve for cinematic acceleration
    const easedProgress = Math.pow(p, 1.75);
    const scale = 1 + (targetScale - 1) * easedProgress;

    if (singularityRef.current) {
      singularityRef.current.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
    }

    if (orbitsRef.current) {
      const orbitOpacity = Math.max(0, 1 - p * 2.4);
      const orbitScale = Math.max(0.1, 1 - p * 0.7);
      const orbitRot = (p * 540).toFixed(1);
      orbitsRef.current.style.opacity = orbitOpacity.toFixed(3);
      orbitsRef.current.style.transform = `translate(-50%, -50%) scale(${orbitScale.toFixed(3)}) rotate(${orbitRot}deg)`;
    }

    if (hintRef.current) {
      const hintOpacity = Math.max(0, 1 - p * 5.0);
      hintRef.current.style.opacity = hintOpacity.toFixed(3);
    }

    if (contentRef.current) {
      // Content reveals when white expansion engulfs viewport (p > 0.52)
      if (p > 0.52) {
        const contentP = Math.min(1, (p - 0.52) / 0.38);
        const translateY = ((1 - contentP) * 36).toFixed(1);
        contentRef.current.style.opacity = contentP.toFixed(3);
        contentRef.current.style.transform = `translateY(${translateY}px)`;
        contentRef.current.style.pointerEvents = contentP > 0.8 ? 'auto' : 'none';
        setIsWhiteThemeActive(true);
      } else {
        contentRef.current.style.opacity = '0';
        contentRef.current.style.transform = 'translateY(36px)';
        contentRef.current.style.pointerEvents = 'none';
        setIsWhiteThemeActive(false);
      }
    }
  }, [scrollContainerRef]);

  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    container.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    // Initial check
    updateScrollProgress();

    return () => {
      container.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [scrollContainerRef, updateScrollProgress]);

  // Smooth scroll back to top of portfolio
  const handleBackToTop = (e) => {
    if (e) e.preventDefault();
    if (onScrollToTop) {
      onScrollToTop();
    }
    const container = scrollContainerRef?.current;
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="white-hole-transition-section"
      className={`white-hole-section ${isWhiteThemeActive ? 'theme-white-active' : ''}`}
      aria-label="Transition to White Theme"
    >
      {/* Sticky Full-Viewport Stage */}
      <div ref={stickyRef} className="white-hole-sticky-stage">
        
        {/* Background Cosmic Starfield Backdrop behind the singularity */}
        <div className="white-hole-cosmic-bg" aria-hidden="true" />

        {/* Center White Hole Gravitational System */}
        <div className="white-hole-system" aria-hidden="true">
          
          {/* Glowing Accretion Aura */}
          <div className="white-hole-aura" />

          {/* Concentric Orbital Tiers with Clockwise Orbiting White Dots */}
          <div ref={orbitsRef} className="white-hole-orbits-wrap">
            {whiteOrbitTiers.map((tier, tIdx) => (
              <div
                key={tIdx}
                className={`white-hole-orbit-tier tier-${tIdx}`}
                style={{
                  width: `${tier.radius * 2}px`,
                  height: `${tier.radius * 2}px`,
                  animationDuration: tier.speed,
                }}
              >
                {Array.from({ length: tier.count }).map((_, dIdx) => {
                  const angleDeg = (360 / tier.count) * dIdx;
                  return (
                    <div
                      key={dIdx}
                      className="white-hole-orbit-dot"
                      style={{
                        width: `${tier.dotSize}px`,
                        height: `${tier.dotSize}px`,
                        transform: `rotate(${angleDeg}deg) translateX(${tier.radius}px)`,
                      }}
                    >
                      {/* Trailing motion glow streaming behind clockwise movement */}
                      <div className="white-dot-motion-shade" />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Central Small White Dot Singularity (#ffffff) that expands to fill screen */}
          <div
            ref={singularityRef}
            className="white-hole-singularity"
            id="white-singularity"
          />
        </div>

        {/* Scroll Indicator Prompt */}
        <div ref={hintRef} className="white-hole-scroll-hint">
          <div className="scroll-hint-dot" />
          <span className="scroll-hint-text">SCROLL TO EXPAND</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* ==========================================================================
            WHITE THEME EXPERIENCE
            Fully revealed when the white singularity expands to fill the entire viewport
            ========================================================================== */}
        <div ref={contentRef} className="white-theme-reveal-container">
          <div className="white-theme-content-wrapper">
            
            {/* Top Brand Pill Header */}
            <div className="white-theme-top-header">
              <div className="white-brand-badge" onClick={handleBackToTop} role="button" tabIndex={0}>
                <img src={logoImg} alt="Sudhan Logo" className="white-brand-logo" />
                <span className="white-brand-text">SUDHARSAN</span>
              </div>
              <span className="white-tag-pill">PORTFOLIO FINALE · 2026</span>
            </div>

            {/* Main Editorial Hero */}
            <div className="white-theme-hero-block">
              <div className="white-hero-eyebrow">
                <span className="white-eyebrow-dot" />
                <span>LET'S COLLABORATE & BUILD</span>
              </div>

              <h2 className="white-hero-title">
                We don't just Think. <span className="blue-accent">We Do.</span>
              </h2>

              <p className="white-hero-desc">
                Bridging human-centered UI/UX design with high-performance modern web engineering,
                responsive enterprise architectures, and intelligent workflows.
              </p>
            </div>

            {/* Quick Actions Row */}
            <div className="white-theme-actions-row">
              {/* Primary Get in Touch Button (White with blue hover effect) */}
              <a
                href="mailto:sudharsan@sudhan.website"
                className="white-primary-cta-btn"
                title="Send an email to Sudharsan"
              >
                <span>Get in Touch</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>

              {/* Download Resume Button */}
              <a
                href={resumePdf}
                target="_blank"
                rel="noreferrer"
                className="white-secondary-cta-btn"
                title="Download verified resume"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download Resume</span>
              </a>

              {/* Smooth Back to Top Button */}
              <button
                type="button"
                onClick={handleBackToTop}
                className="white-tertiary-cta-btn"
                title="Scroll back to the top of the portfolio"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
                <span>Back to Top</span>
              </button>
            </div>

            {/* Social Channels Row */}
            <div className="white-theme-social-section">
              <span className="white-social-label">Connect on Channels:</span>
              <div className="white-social-links">
                {/* GitHub */}
                <a
                  href="https://github.com/Sudhan-2603"
                  target="_blank"
                  rel="noreferrer"
                  className="white-social-pill"
                  title="GitHub"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/sudharsan-k-902030322"
                  target="_blank"
                  rel="noreferrer"
                  className="white-social-pill"
                  title="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 1.54-1.54 1.54 1.54 0 0 0-3.08 0c0 .85.69 1.54 1.54 1.54m1.37 9.74v-8.37H5.09v8.37h2.74z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>

                {/* Behance */}
                <a
                  href="https://www.behance.net/sudharsank18"
                  target="_blank"
                  rel="noreferrer"
                  className="white-social-pill"
                  title="Behance"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 7h-7v2h7V7zm1.726 10c-.442 1.297-2.029 3-4.976 3-3.411 0-5.69-2.389-5.69-6.059 0-3.692 2.321-6.041 5.6-6.041 3.511 0 5.37 2.371 5.37 5.795 0 .546-.075 1.109-.105 1.305H15.93c.12 1.636 1.488 2.441 2.825 2.441 1.258 0 2.21-.579 2.658-1.441h2.313zM15.96 13h4.72c-.104-1.282-1.02-2.141-2.345-2.141-1.396 0-2.27.846-2.375 2.141zM2 4h6.059c2.31 0 4.141.678 4.141 2.891 0 1.341-.758 2.316-1.892 2.766 1.547.45 2.392 1.688 2.392 3.238 0 2.417-1.983 3.105-4.341 3.105H2V4zm2.841 5.405h2.898c1.171 0 1.94-.486 1.94-1.441 0-.918-.75-1.396-1.94-1.396H4.841v2.837zm0 4.39h3.111c1.298 0 2.158-.555 2.158-1.575 0-1.053-.876-1.545-2.158-1.545H4.841v3.12z" />
                  </svg>
                  <span>Behance</span>
                </a>

                {/* Dribbble */}
                <a
                  href="https://dribbble.com/tsk26"
                  target="_blank"
                  rel="noreferrer"
                  className="white-social-pill"
                  title="Dribbble"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
                    <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
                    <path d="M8.5 2.5a14.7 14.7 0 0 1 7.2 18.8" />
                  </svg>
                  <span>Dribbble</span>
                </a>

                {/* LeetCode */}
                <a
                  href="https://leetcode.com/u/RPIXbIZxAI/"
                  target="_blank"
                  rel="noreferrer"
                  className="white-social-pill"
                  title="LeetCode"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 4.818 3.535 5.86 5.86 0 0 0 1.026.046 5.92 5.92 0 0 0 3.298-1.248l3.966-3.705a1.378 1.378 0 0 0-1.884-2.012l-3.966 3.705a3.17 3.17 0 0 1-1.768.67 3.14 3.14 0 0 1-.55-.024 3.2 3.2 0 0 1-2.6-1.907 3.15 3.15 0 0 1-.188-.548 3.28 3.28 0 0 1-.033-1.272 3.22 3.22 0 0 1 .65-1.135l3.854-4.126 5.406-5.788A1.374 1.374 0 0 0 13.483 0z" />
                    <path d="M12.094 10.984a1.376 1.376 0 0 0-1.375 1.375v.003c0 .76.615 1.375 1.375 1.375h7.531a1.376 1.376 0 0 0 1.375-1.375v-.003a1.376 1.376 0 0 0-1.375-1.375h-7.531z" />
                  </svg>
                  <span>LeetCode</span>
                </a>
              </div>
            </div>

            {/* Bottom Credits Footer */}
            <div className="white-theme-footer">
              <p className="white-footer-text">
                Designed & Developed with precision by <strong>Sudharsan</strong> · All rights reserved © 2026
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
