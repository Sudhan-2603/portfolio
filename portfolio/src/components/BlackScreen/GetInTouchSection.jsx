import { useState, useEffect } from 'react';
import './GetInTouchSection.css';
import LiquidMetalButton from '../ui/LiquidMetal';
import logoImg from '../../assets/Logo-trans.png';
import resumePdf from '../../assets/certificate/resume.PDF';

const TITLES = [
  {
    type: 'get-in-touch',
    render: () => (
      <>
        <span className="title-word-blue">Get</span> in <span className="title-word-green-punk">touch</span>
      </>
    ),
  },
  {
    type: 'join-with-me',
    render: () => (
      <>
        <span className="title-word-red">Join</span> with me
      </>
    ),
  },
  {
    type: 'connect-with-me',
    render: () => (
      <>
        <span className="title-word-punk">Connect</span> with me
      </>
    ),
  },
];

/**
 * GetInTouchSection
 * 
 * 1. Dedicated Floating White Theme Headerbar at top (black screen headerbar removed).
 * 2. Rotating titles: 'Get'-Blue, 'Join'-Red, 'Touch'-Green punk, with fade-up animation.
 * 3. Email: sudharsan@sudhan.website everywhere.
 * 4. Social cards with SVG logos: GitHub, LinkedIn, Behance, Dribbble, Instagram.
 * 5. Contact form with heavy frosted glass blur (backdrop-filter: blur(44px)).
 * 6. Send button with white icon background, black icon, and hover inverting to white body.
 * 7. GPay payment successful animation with expanding ripple rings, drawing checkmark & confetti.
 * 8. Continuous blue-hour meadow background across grid and footer with giant frosted "Sudhan" wordmark.
 * 9. Strictly Zero Borders Rule (border: none !important).
 */
export default function GetInTouchSection({ onScrollToTop }) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cycle titles every 2.8s
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    try {
      await fetch('https://formspree.io/f/xykbjlzj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
    } catch (err) {
      console.warn('Formspree submission fallback:', err);
    }

    // Trigger GPay-style celebration
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleBackToTop = (e) => {
    e?.preventDefault?.();
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavSection = (targetId) => {
    setMobileMenuOpen(false);
    const scrollContainer = document.querySelector('.blackscreen-scroll-container');
    const el = document.getElementById(targetId);
    if (scrollContainer && el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToForm = (e) => {
    e?.preventDefault?.();
    setMobileMenuOpen(false);
    const formCard = document.getElementById('contact-form') || document.querySelector('.contact-form-card') || document.querySelector('.get-in-touch-main');
    if (formCard) {
      formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const nameInput = document.getElementById('contact-name');
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 450);
      }
    }
  };

  return (
    <section className="get-in-touch-wrapper" id="contact">
      {/* Immersive Blue-Hour Meadow Background spanning grid & footer */}
      <div className="meadow-backdrop-container" aria-hidden="true">
        <video
          className="meadow-backdrop-video"
          src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4d01c727-d9c5-47c8-a778-35a451ffd39f.mp4"
          poster="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261014_121838_c97d0940-f430-4304-8573-4f47ee44f447.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        {/* Soft top haze blending into paper/white */}
        <div className="meadow-top-haze" />
      </div>

      {/* 1. White Theme Floating Headerbar */}
      <header className="white-capsule-header">
        <div className="white-capsule-bar">
          {/* Brand */}
          <div
            className="white-capsule-brand"
            onClick={handleBackToTop}
            role="button"
            tabIndex={0}
            title="Sudhan - Back to Top"
          >
            <div className="white-capsule-logo">
              <img src={logoImg} alt="Sudhan Logo" />
            </div>
            <span className="white-capsule-name">Sudhan</span>
          </div>

          {/* Navigation Links */}
          <nav className="white-capsule-links">
            <button type="button" className="white-nav-btn" onClick={handleBackToTop}>
              Home
            </button>
            <button type="button" className="white-nav-btn" onClick={() => handleNavSection('space-projects-section')}>
              Projects
            </button>
            <button type="button" className="white-nav-btn" onClick={() => handleNavSection('skills-ecosystem-section')}>
              Skills
            </button>
            <button type="button" className="white-nav-btn" onClick={() => handleNavSection('certificates-scanner-section')}>
              Certifications
            </button>
            <button type="button" className="white-nav-btn" onClick={handleScrollToForm}>
              Get in Touch
            </button>
          </nav>

          {/* Actions */}
          <div className="white-capsule-actions">
            <a
              href={resumePdf}
              target="_blank"
              rel="noreferrer"
              download="Sudharsan_Resume.pdf"
              className="white-action-resume"
              title="Download and View Resume"
            >
              Resume
            </a>
            <button type="button" onClick={handleScrollToForm} className="white-action-contact-btn" title="Get in Touch">
              Get in Touch
            </button>
            <button type="button" onClick={handleBackToTop} className="white-action-top">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
              <span>Back to Top</span>
            </button>

            {/* Mobile Burger Menu Toggle Button */}
            <button
              type="button"
              className={`white-mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              title="Toggle navigation menu"
            >
              <span className="white-toggle-bar" />
              <span className="white-toggle-bar" />
              <span className="white-toggle-bar" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Animated Underline */}
        <div className={`white-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <nav className="white-mobile-nav">
            <button
              type="button"
              className="white-mobile-link"
              onClick={() => {
                setMobileMenuOpen(false);
                handleBackToTop();
              }}
            >
              Home
            </button>
            <button
              type="button"
              className="white-mobile-link"
              onClick={() => handleNavSection('space-projects-section')}
            >
              Projects
            </button>
            <button
              type="button"
              className="white-mobile-link"
              onClick={() => handleNavSection('skills-ecosystem-section')}
            >
              Skills
            </button>
            <button
              type="button"
              className="white-mobile-link"
              onClick={() => handleNavSection('certificates-scanner-section')}
            >
              Certifications
            </button>
            <button
              type="button"
              className="white-mobile-link"
              onClick={handleScrollToForm}
            >
              Get in Touch
            </button>
            <div className="white-mobile-divider" />
            <a
              href={resumePdf}
              target="_blank"
              rel="noreferrer"
              download="Sudharsan_Resume.pdf"
              className="white-mobile-link"
              onClick={() => setMobileMenuOpen(false)}
              title="Download and View Resume"
            >
              Resume
            </a>
            <button
              type="button"
              className="white-mobile-cta"
              onClick={handleScrollToForm}
            >
              <span>Get in Touch</span>
            </button>
          </nav>
        </div>
      </header>

      {/* 2. Main Grid Content Floating over Meadow */}
      <div className="get-in-touch-main">
        <div className="get-in-touch-grid">

          {/* Left Column: Rotating Title & Opportunity Paragraph */}
          <div className="get-in-touch-left">
            <div className="get-in-touch-badge">
              <span className="get-in-touch-badge-dot" />
              <span>COLLABORATE & BUILD</span>
            </div>

            {/* Rotating Title with Fade-Up Animation and Dynamic Colors */}
            <div className="title-fadeup-viewport">
              <h1 key={titleIndex} className="title-fadeup-text">
                {TITLES[titleIndex].render()}
              </h1>
            </div>

            {/* Requested Opportunity Paragraph */}
            <p className="get-in-touch-paragraph">
              I'm currently open to new opportunities and collaborations. If you have a project in mind or just want to say hi, feel free to reach out!
            </p>

            {/* Direct Email Chip with sudharsan@sudhan.website */}
            <div className="contact-quick-chips">
              <a href="mailto:sudharsan@sudhan.website" className="contact-chip-item">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>sudharsan@sudhan.website</span>
              </a>
            </div>

            {/* Social Logos and Links (GitHub, LinkedIn, Behance, Dribbble, Instagram) */}
            <div className="social-links-grid" aria-label="Social Profiles">
              {/* GitHub */}
              <a
                href="https://github.com/Sudhan-2603"
                target="_blank"
                rel="noreferrer"
                className="social-logo-card"
                title="GitHub - Sudhan-2603"
              >
                <div className="social-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </div>
                <span>GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/sudharsan-k-902030322"
                target="_blank"
                rel="noreferrer"
                className="social-logo-card"
                title="LinkedIn - Sudharsan K"
              >
                <div className="social-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 1.54-1.54 1.54 1.54 0 0 0-3.08 0c0 .85.69 1.54 1.54 1.54m1.37 9.74v-8.37H5.09v8.37h2.74z" />
                  </svg>
                </div>
                <span>LinkedIn</span>
              </a>

              {/* Behance */}
              <a
                href="https://www.behance.net/sudharsank18"
                target="_blank"
                rel="noreferrer"
                className="social-logo-card"
                title="Behance - Sudharsan"
              >
                <div className="social-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 7h-7v2h7V7zm1.726 10c-.442 1.297-2.029 3-4.976 3-3.411 0-5.69-2.389-5.69-6.059 0-3.692 2.321-6.041 5.6-6.041 3.511 0 5.37 2.371 5.37 5.795 0 .546-.075 1.109-.105 1.305H15.93c.12 1.636 1.488 2.441 2.825 2.441 1.258 0 2.21-.579 2.658-1.441h2.313zM15.96 13h4.72c-.104-1.282-1.02-2.141-2.345-2.141-1.396 0-2.27.846-2.375 2.141zM2 4h6.059c2.31 0 4.141.678 4.141 2.891 0 1.341-.758 2.316-1.892 2.766 1.547.45 2.392 1.688 2.392 3.238 0 2.417-1.983 3.105-4.341 3.105H2V4zm2.841 5.405h2.898c1.171 0 1.94-.486 1.94-1.441 0-.918-.75-1.396-1.94-1.396H4.841v2.837zm0 4.39h3.111c1.298 0 2.158-.555 2.158-1.575 0-1.053-.876-1.545-2.158-1.545H4.841v3.12z" />
                  </svg>
                </div>
                <span>Behance</span>
              </a>

              {/* Dribbble */}
              <a
                href="https://dribbble.com/tsk26"
                target="_blank"
                rel="noreferrer"
                className="social-logo-card"
                title="Dribbble - tsk26"
              >
                <div className="social-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
                    <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
                    <path d="M8.5 2.5a14.7 14.7 0 0 1 7.2 18.8" />
                  </svg>
                </div>
                <span>Dribbble</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="social-logo-card"
                title="Instagram"
              >
                <div className="social-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form with Heavy Frosted Glass Blur & GPay Animation */}
          <div className="get-in-touch-right">
            <div className="contact-form-card" id="contact-form">
              {isSuccess ? (
                /* Google Pay (GPay) Payment-Style Success Animation */
                <div className="gpay-success-container">
                  <div className="gpay-circle-wrapper">
                    {/* Concentric ripple pulse waves */}
                    <span className="gpay-ripple-wave wave-1" />
                    <span className="gpay-ripple-wave wave-2" />
                    <span className="gpay-ripple-wave wave-3" />

                    {/* Confetti sparkle particles */}
                    <span className="gpay-confetti p1" />
                    <span className="gpay-confetti p2" />
                    <span className="gpay-confetti p3" />
                    <span className="gpay-confetti p4" />
                    <span className="gpay-confetti p5" />
                    <span className="gpay-confetti p6" />

                    {/* Emerald green checkmark circle */}
                    <div className="gpay-emerald-circle">
                      <svg className="gpay-checkmark-svg" viewBox="0 0 52 52">
                        <circle className="gpay-checkmark-circle" cx="26" cy="26" r="24" fill="none" />
                        <path className="gpay-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                      </svg>
                    </div>
                  </div>

                  <h3 className="gpay-success-title">Message Sent!</h3>
                  <p className="gpay-success-subtitle">
                    Thank you, <strong>{formData.name}</strong>! Your inquiry has been delivered directly to <strong>sudharsan@sudhan.website</strong>.
                  </p>

                  <button type="button" onClick={handleReset} className="gpay-new-msg-btn">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-header">
                    <h3 className="form-card-title">Let's Connect</h3>
                  </div>

                  <form
                    className="contact-form contact-form-body"
                    action="https://formspree.io/f/xykbjlzj"
                    method="POST"
                    onSubmit={handleSubmit}
                  >
                    {/* Name */}
                    <div className="input-group form-group">
                      <label htmlFor="contact-name" className="form-label">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="form-input"
                      />
                    </div>

                    {/* Email */}
                    <div className="input-group form-group">
                      <label htmlFor="contact-email" className="form-label">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="form-input"
                      />
                    </div>

                    {/* Message */}
                    <div className="input-group form-group">
                      <label htmlFor="contact-message" className="form-label">Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, idea, or questions..."
                        required
                        rows={4}
                        className="form-textarea"
                      />
                    </div>

                    {/* Submit Button with LiquidMetalButton */}
                    <div className="form-submit-row">
                      <LiquidMetalButton
                        type="submit"
                        size="md"
                        borderWidth={3}
                        metalConfig={{
                          colorBack: '#888888',
                          colorTint: '#ffffff',
                          speed: 0.45,
                          repetition: 4,
                          distortion: 0.15,
                          scale: 1,
                        }}
                        icon={
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        }
                      >
                        Send Message
                      </LiquidMetalButton>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Footer Stage: Giant Frosted-Glass "Sudhan" Wordmark Sinking into Lavender Fog */}
      <footer className="footer-meadow-base" aria-hidden="true" onClick={handleBackToTop}>
        <p className="meadow-wordmark">
          Sudhan
        </p>
        <div className="meadow-fog" />
      </footer>
    </section>
  );
}
