import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from './components/LoadingScreen';
import BlackScreenContent from './components/BlackScreen/BlackScreenContent';
import logoImg from './assets/Logo-trans.png';
import aboutAvatarImg from './assets/about_avatar.png';
import resumePdf from './assets/certificate/resume.PDF';
import './style/gsap/gsap.css';


export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Draggable logo state (morphs to circle & spins clockwise on drag)
    const [isDraggingLogo, setIsDraggingLogo] = useState(false);
    const [logoPos, setLogoPos] = useState({ x: 0, y: 0 });
    const dragStartRef = useRef({ x: 0, y: 0 });

    const handleLogoPointerDown = (e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        dragStartRef.current = {
            x: e.clientX - logoPos.x,
            y: e.clientY - logoPos.y,
        };
        setIsDraggingLogo(true);
    };

    const handleLogoPointerMove = (e) => {
        if (!isDraggingLogo) return;
        setLogoPos({
            x: e.clientX - dragStartRef.current.x,
            y: e.clientY - dragStartRef.current.y,
        });
    };

    const handleLogoPointerUp = () => {
        setIsDraggingLogo(false);
        // Smooth spring back to initial position
        setLogoPos({ x: 0, y: 0 });
    };

    // Headline with two distinct lines:
    // Line 1: We don't just Think. (Think highlighted in #3D5EE1)
    // Line 2: We Do. (Do highlighted in #3D5EE1)
    const headlineLine1 = [
        { text: "We", isAccent: false },
        { text: "don't", isAccent: false },
        { text: "just", isAccent: false },
        { text: "Think.", isAccent: true },
    ];

    const headlineLine2 = [
        { text: "We", isAccent: false },
        { text: "Do.", isAccent: true },
    ];

    // States for triggering entry animations
    const [heroTitleVisible, setHeroTitleVisible] = useState(false);
    const [aboutBulletsVisible, setAboutBulletsVisible] = useState(false);
    const bulletListRef = useRef(null);

    // Trigger hero editorial title linear down-to-up entry animation when loading completes
    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => {
                setHeroTitleVisible(true);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    // Trigger about section professional summary bullet list linear left-to-right entry animation on scroll
    useEffect(() => {
        const el = bulletListRef.current;
        if (!el) return;

        if (typeof IntersectionObserver === 'undefined') {
            const timer = setTimeout(() => setAboutBulletsVisible(true), 0);
            return () => clearTimeout(timer);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAboutBulletsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px',
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // GSAP ScrollTrigger circle transition refs
    const transitionSectionRef = useRef(null);
    const stageRef = useRef(null);
    const floodVortexRef = useRef(null);
    const blackholeSystemRef = useRef(null);
    const orbitsRef = useRef(null);
    const circleRef = useRef(null);
    const scrollHintRef = useRef(null);
    const blackScreenContentRef = useRef(null);

    // Black Hole orbital tiers with clockwise rotating black dots & motion shades
    const blackholeOrbitTiers = [
        { radius: 55, count: 6, speed: '8s', dotSize: 5 },
        { radius: 95, count: 8, speed: '12s', dotSize: 6 },
        { radius: 145, count: 10, speed: '16s', dotSize: 7 },
        { radius: 205, count: 12, speed: '20s', dotSize: 5 },
    ];

    // GSAP ScrollTrigger: Black circle set at center -> scales larger based on scroll -> fills full screen into black screen -> reveals BlackScreenContent & pans horizontal projects
    useEffect(() => {
        if (isLoading) return;

        gsap.registerPlugin(ScrollTrigger);

        const timer = setTimeout(() => {
            const container = transitionSectionRef.current;
            const circle = circleRef.current;
            const scrollHint = scrollHintRef.current;

            if (!container || !circle) return;

            const ctx = gsap.context(() => {
                // The circle transition is set directly at center
                if (blackholeSystemRef.current) {
                    gsap.set(blackholeSystemRef.current, {
                        xPercent: -50,
                        yPercent: -50,
                        x: 0,
                        y: 0,
                    });
                }

                gsap.set(circle, {
                    xPercent: -50,
                    yPercent: -50,
                    transformOrigin: '50% 50%',
                    scale: 1,
                });

                if (orbitsRef.current) {
                    gsap.set(orbitsRef.current, {
                        opacity: 1,
                        scale: 1,
                    });
                }

                if (blackScreenContentRef.current) {
                    gsap.set(blackScreenContentRef.current, {
                        opacity: 0,
                    });
                }

                // ScrollTrigger timeline pinned at top of viewport
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        start: 'top top',
                        end: '+=180%',
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            // Activate global body dark theme and hide navbar when circle expands
                            if (self.progress > 0.32) {
                                document.body.classList.add('dark-theme-active');
                                document.body.classList.add('hide-navbar');
                            } else {
                                document.body.classList.remove('dark-theme-active');
                                document.body.classList.remove('hide-navbar');
                            }
                        },
                    },
                });

                // Overall page rotating background flood vortex (accelerates with scroll)
                if (floodVortexRef.current) {
                    tl.to(floodVortexRef.current, {
                        rotation: 720,
                        ease: 'none',
                        duration: 1.6,
                    }, 0);
                }

                // Accelerate clockwise orbit of black dots based on user scroll
                tl.to('.blackhole-orbit-tier', {
                    rotation: '+=720',
                    ease: 'none',
                    duration: 1.6,
                }, 0);

                // Fade out helper scroll hint as soon as user starts scrolling
                if (scrollHint) {
                    tl.to(scrollHint, {
                        opacity: 0,
                        duration: 0.3,
                    }, 0);
                }

                // Black hole circle scales into large based on scroll, until it fills full screen
                const maxDim = Math.hypot(window.innerWidth, window.innerHeight);
                const targetScale = Math.max(75, Math.ceil((maxDim / 44) * 1.55));

                tl.to(circle, {
                    scale: targetScale,
                    transformOrigin: '50% 50%',
                    ease: 'power2.inOut',
                    duration: 1.6,
                }, 0);

                // Orbiting dots pulled into the singularity as it engulfs the view
                if (orbitsRef.current) {
                    tl.to(orbitsRef.current, {
                        opacity: 0,
                        scale: 0.2,
                        ease: 'power2.in',
                        duration: 1.0,
                    }, 0.6);
                }

                if (stageRef.current) {
                    tl.to([container, stageRef.current], {
                        backgroundColor: '#000000',
                        ease: 'power2.inOut',
                        duration: 1.6,
                    }, 0);
                }

                // Reveal the dedicated BlackScreenContent component when black hole fills full screen
                if (blackScreenContentRef.current) {
                    tl.to(blackScreenContentRef.current, {
                        opacity: 1,
                        ease: 'power2.out',
                        duration: 0.8,
                    }, 1.2);
                }
            });

            return () => ctx.revert();
        }, 120);

        return () => clearTimeout(timer);
    }, [isLoading]);


    // Professional Summary bullet points for character-by-character animation
    const professionalSummaryBullets = [
        "Innovative and user-centric UI/UX Designer and Web/App Developer bridging the gap between design concepts and functional code.",
        "Proficient in crafting intuitive user experiences through high-fidelity wireframing and prototyping in Figma.",
        "Experienced in seamlessly translating designs into high-performing digital products using Visual Studio and GitHub.",
        "Adept at leveraging Zoho Creator, Zoho CRM, Zoho Catalyst and Zoho products to develop responsive web and mobile applications, automate business workflows, streamline customer relationship management, and deliver scalable, user-friendly digital solutions within the Zoho ecosystem.",
    ];

    let globalCharIndex = 0;

    // Smooth navigation to Get In Touch section across all screen states
    const handleNavigateToContact = (e) => {
        e?.preventDefault?.();
        setMobileMenuOpen(false);

        // 1. Scroll window down past circle transition so the black hole expands
        const transitionSection = transitionSectionRef.current;
        if (transitionSection) {
            const targetScroll = transitionSection.offsetTop + window.innerHeight * 1.85;
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
        }

        // 2. Dispatch custom event so BlackScreenContent sets phase='projects' and scrolls to Get in Touch
        window.dispatchEvent(new CustomEvent('navigate-to-contact'));
    };

    return (
        <>
            {isLoading && (
                <LoadingScreen onComplete={() => setIsLoading(false)} />
            )}

            {/* Main Portfolio Application */}
            <div className="portfolio-app">
                {/* Navigation Bar */}
                <header className="navbar">
                    <div className="navbar-container">
                        <div className="navbar-left">
                            <a href="#hero" className="navbar-logo" onClick={(e) => isDraggingLogo && e.preventDefault()}>
                                {/* Draggable Logo Badge: Morphs into circle & spins clockwise on drag */}
                                <div
                                    className={`logo-badge ${isDraggingLogo ? 'dragging' : ''}`}
                                    style={{
                                        transform: `translate(${logoPos.x}px, ${logoPos.y}px)`,
                                        transition: isDraggingLogo ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                    }}
                                    onPointerDown={handleLogoPointerDown}
                                    onPointerMove={handleLogoPointerMove}
                                    onPointerUp={handleLogoPointerUp}
                                    onPointerCancel={handleLogoPointerUp}
                                    title="Drag me! Background turns into a circle & logo rotates clockwise"
                                >
                                    <img src={logoImg} alt="Sudhan Logo" />
                                </div>
                                <span>Sudhan</span>
                            </a>

                            <nav className="navbar-links">
                                <a href="#hero" className="navbar-link">Home</a>
                                <a href="#about" className="navbar-link">About</a>
                                <a href="#projects" className="navbar-link">Projects</a>
                                <a href="#skills" className="navbar-link">Skills</a>
                            </nav>
                        </div>

                        <div className="navbar-actions">
                            <a
                                href={resumePdf}
                                target="_blank"
                                rel="noreferrer"
                                download="Sudharsan_Resume.pdf"
                                className="navbar-action-link"
                                title="Download and View Resume"
                            >
                                Resume
                            </a>
                            <button
                                type="button"
                                className="navbar-btn-outline"
                                onClick={handleNavigateToContact}
                                title="Get in Touch"
                            >
                                Get in Touch
                            </button>

                            {/* Mobile Hamburger Toggle */}
                            <button
                                className={`navbar-mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle navigation menu"
                                aria-expanded={mobileMenuOpen}
                                title="Toggle navigation menu"
                            >
                                <span className="toggle-bar" />
                                <span className="toggle-bar" />
                                <span className="toggle-bar" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Drawer */}
                    <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                        <nav className="navbar-mobile-nav">
                            <a href="#hero" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
                            <a href="#about" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>About</a>
                            <a href="#projects" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>Projects</a>
                            <a href="#skills" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>Skills</a>
                            <div className="navbar-mobile-divider" />
                            <a
                                href={resumePdf}
                                target="_blank"
                                rel="noreferrer"
                                download="Sudharsan_Resume.pdf"
                                className="navbar-mobile-link"
                                onClick={() => setMobileMenuOpen(false)}
                                title="Download and View Resume"
                            >
                                Resume
                            </a>
                            <button
                                type="button"
                                className="navbar-mobile-cta"
                                onClick={handleNavigateToContact}
                                title="Get in Touch"
                            >
                                Get in Touch
                            </button>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main>
                    <section id="hero" className="hero-section">
                        <div className="hero-container">
                            {/* Top Announcement Pill with #3D5EE1 Blinking Dot */}
                            <div className="hero-announcement-pill" title="Hover to see the blink effect!">
                                <span className="announcement-dot" />
                                <span>Open for new opportunities &middot; Full-Stack &amp; UI/UX</span>
                            </div>

                            {/* Editorial Serif Main Headline: Two distinct lines with linear down-to-up character entry animation */}
                            <h1 className={`hero-editorial-title ${heroTitleVisible ? 'animate-entry' : ''}`}>
                                {/* Line 1: We don't just Think. */}
                                <div className="hero-title-line">
                                    {headlineLine1.map((wordObj, wIdx) => {
                                        const chars = wordObj.text.split('');
                                        return (
                                            <span key={wIdx} className="hero-word">
                                                {chars.map((char, cIdx) => {
                                                    const delay = 0.12 + (globalCharIndex++) * 0.035;
                                                    return (
                                                        <span
                                                            key={cIdx}
                                                            className={`hero-char ${wordObj.isAccent ? 'accent' : ''}`}
                                                            style={{ animationDelay: `${delay.toFixed(3)}s` }}
                                                        >
                                                            {char}
                                                        </span>
                                                    );
                                                })}
                                            </span>
                                        );
                                    })}
                                </div>

                                {/* Line 2: We Do. */}
                                <div className="hero-title-line">
                                    {headlineLine2.map((wordObj, wIdx) => {
                                        const chars = wordObj.text.split('');
                                        return (
                                            <span key={wIdx} className="hero-word">
                                                {chars.map((char, cIdx) => {
                                                    const delay = 0.12 + (globalCharIndex++) * 0.035;
                                                    return (
                                                        <span
                                                            key={cIdx}
                                                            className={`hero-char ${wordObj.isAccent ? 'accent' : ''}`}
                                                            style={{ animationDelay: `${delay.toFixed(3)}s` }}
                                                        >
                                                            {char}
                                                        </span>
                                                    );
                                                })}
                                            </span>
                                        );
                                    })}
                                </div>
                            </h1>

                            {/* Subtitle Description */}
                            <p className="hero-subtitle-text">
                                Sudharsan K is a UI/UX designer and frontend developer creating intuitive digital products with Figma and React—from thoughtful interface design to responsive web experiences.
                            </p>

                            {/* Hero CTA Button: Only "Explore my project" */}
                            <div className="hero-cta-group">
                                <a
                                    href="#projects"
                                    className="hero-explore-btn"
                                    title="Explore my project"
                                >
                                    <span>Explore my project</span>
                                </a>
                            </div>

                            {/* Avatar Stack & Social Proof */}
                            <div className="hero-proof-wrap">
                                <div className="hero-avatar-stack">
                                    <div className="avatar-circle avatar-1">SD</div>
                                    <div className="avatar-circle avatar-2">UI</div>
                                    <div className="avatar-circle avatar-3">3D</div>
                                </div>
                                <span className="hero-proof-text">5+ Trusted projects &middot; Creative Engineering</span>
                            </div>
                        </div>
                    </section>

                    {/* About Section - Matching Editorial Reference Design */}
                    <section id="about" className="about-section">
                        {/* Section Header with decorative horizontal lines: — About — */}
                        <div className="about-section-header">
                            <span className="about-header-line" />
                            <h2 className="about-title">About</h2>
                            <span className="about-header-line" />
                        </div>

                        <div className="about-container">
                            {/* Left Column: 3D Wizard Character on Floating Cloud */}
                            <div className="about-visual-col">
                                <div className="about-avatar-wrapper">
                                    <img
                                        src={aboutAvatarImg}
                                        alt="Product Designer & Developer 3D Character on Cloud"
                                        className="about-avatar-img"
                                        loading="lazy"
                                    />
                                </div>
                            </div>

                            {/* Right Column: Narrative, Experience, and Social Actions */}
                            <div className="about-content-col">
                                {/* Professional Summary & Bulleted Expertise */}
                                <div className="about-block">
                                    <h3 className="about-heading">Professional Summary</h3>
                                    <ul
                                        ref={bulletListRef}
                                        className={`about-bullet-list ${aboutBulletsVisible ? 'animate-entry' : ''}`}
                                    >
                                        {professionalSummaryBullets.map((bulletText, bIdx) => {
                                            const words = bulletText.split(' ');
                                            const bulletStartDelay = 0.05 + bIdx * 0.3;
                                            let charIndexInBullet = 0;

                                            return (
                                                <li key={bIdx} className="about-bullet-item">
                                                    {words.map((word, wIdx) => {
                                                        const chars = word.split('');
                                                        return (
                                                            <span key={wIdx}>
                                                                <span className="about-bullet-word">
                                                                    {chars.map((char, cIdx) => {
                                                                        const delay = bulletStartDelay + (charIndexInBullet++) * 0.007;
                                                                        return (
                                                                            <span
                                                                                key={cIdx}
                                                                                className="about-bullet-char"
                                                                                style={{ animationDelay: `${delay.toFixed(3)}s` }}
                                                                            >
                                                                                {char}
                                                                            </span>
                                                                        );
                                                                    })}
                                                                </span>
                                                                {wIdx < words.length - 1 ? ' ' : ''}
                                                            </span>
                                                        );
                                                    })}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                {/* Two-Column Split under Bullet List: Left = Roles, Right = Social, Resume & Experience */}
                                <div className="about-split-row">
                                    {/* Left Side: Roles */}
                                    <div className="about-split-col about-split-left">
                                        {/* I can play Roles Section */}
                                        <div className="about-roles-group">
                                            <h3 className="about-roles-heading">I can play Roles :</h3>
                                            <div className="about-roles-chips">
                                                <div className="about-role-chip">
                                                    <span className="about-role-num">1</span>
                                                    <span>Web / Mobile App Development</span>
                                                </div>
                                                <div className="about-role-chip">
                                                    <span className="about-role-num">2</span>
                                                    <span>Zoho Products</span>
                                                </div>
                                                <div className="about-role-chip">
                                                    <span className="about-role-num">3</span>
                                                    <span>Ui/UX Design</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Social, Resume & Experience */}
                                    <div className="about-split-col about-split-right">
                                        {/* Social Channels Block with Rotating Circle Micro-Interactions */}
                                        <div className="about-social-group">
                                            <h3 className="about-social-heading">Also view my projects on</h3>
                                            <div className="about-social-pills">
                                                {/* GitHub */}
                                                <a
                                                    href="https://github.com/Sudhan-2603"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="social-pill"
                                                    title="GitHub"
                                                    aria-label="GitHub"
                                                >
                                                    <span className="social-icon-circle">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                                        </svg>
                                                    </span>
                                                </a>

                                                {/* Dribbble */}
                                                <a
                                                    href="https://dribbble.com/tsk26"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="social-pill"
                                                    title="Dribbble"
                                                    aria-label="Dribbble"
                                                >
                                                    <span className="social-icon-circle">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
                                                            <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
                                                            <path d="M8.5 2.5a14.7 14.7 0 0 1 7.2 18.8" />
                                                        </svg>
                                                    </span>
                                                </a>

                                                {/* Behance */}
                                                <a
                                                    href="https://www.behance.net/sudharsank18"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="social-pill"
                                                    title="Behance"
                                                    aria-label="Behance"
                                                >
                                                    <span className="social-icon-circle">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M22 7h-7v2h7V7zm1.726 10c-.442 1.297-2.029 3-4.976 3-3.411 0-5.69-2.389-5.69-6.059 0-3.692 2.321-6.041 5.6-6.041 3.511 0 5.37 2.371 5.37 5.795 0 .546-.075 1.109-.105 1.305H15.93c.12 1.636 1.488 2.441 2.825 2.441 1.258 0 2.21-.579 2.658-1.441h2.313zM15.96 13h4.72c-.104-1.282-1.02-2.141-2.345-2.141-1.396 0-2.27.846-2.375 2.141zM2 4h6.059c2.31 0 4.141.678 4.141 2.891 0 1.341-.758 2.316-1.892 2.766 1.547.45 2.392 1.688 2.392 3.238 0 2.417-1.983 3.105-4.341 3.105H2V4zm2.841 5.405h2.898c1.171 0 1.94-.486 1.94-1.441 0-.918-.75-1.396-1.94-1.396H4.841v2.837zm0 4.39h3.111c1.298 0 2.158-.555 2.158-1.575 0-1.053-.876-1.545-2.158-1.545H4.841v3.12z" />
                                                        </svg>
                                                    </span>
                                                </a>

                                                {/* LeetCode */}
                                                <a
                                                    href="https://leetcode.com/u/RPIXbIZxAI/"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="social-pill"
                                                    title="LeetCode"
                                                    aria-label="LeetCode"
                                                >
                                                    <span className="social-icon-circle">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 4.818 3.535 5.86 5.86 0 0 0 1.026.046 5.92 5.92 0 0 0 3.298-1.248l3.966-3.705a1.378 1.378 0 0 0-1.884-2.012l-3.966 3.705a3.17 3.17 0 0 1-1.768.67 3.14 3.14 0 0 1-.55-.024 3.2 3.2 0 0 1-2.6-1.907 3.15 3.15 0 0 1-.188-.548 3.28 3.28 0 0 1-.033-1.272 3.22 3.22 0 0 1 .65-1.135l3.854-4.126 5.406-5.788A1.374 1.374 0 0 0 13.483 0z" />
                                                            <path d="M12.094 10.984a1.376 1.376 0 0 0-1.375 1.375v.003c0 .76.615 1.375 1.375 1.375h7.531a1.376 1.376 0 0 0 1.375-1.375v-.003a1.376 1.376 0 0 0-1.375-1.375h-7.531z" />
                                                            <path d="M15.406 18.062a1.376 1.376 0 0 0-1.375 1.375v.003c0 .76.615 1.375 1.375 1.375h4.219a1.376 1.376 0 0 0 1.375-1.375v-.003a1.376 1.376 0 0 0-1.375-1.375h-4.219z" />
                                                        </svg>
                                                    </span>
                                                </a>

                                                {/* LinkedIn */}
                                                <a
                                                    href="https://linkedin.com/in/sudharsan-k-902030322"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="social-pill"
                                                    title="LinkedIn"
                                                    aria-label="LinkedIn"
                                                >
                                                    <span className="social-icon-circle">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 1.54-1.54 1.54 1.54 0 0 0-3.08 0c0 .85.69 1.54 1.54 1.54m1.37 9.74v-8.37H5.09v8.37h2.74z" />
                                                        </svg>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Under about-split-row: Resume Group & Experience Card */}
                                <div className="about-bottom-group">
                                    {/* Resume Download CTA (Blue Style) */}
                                    <div className="about-resume-group about-resume-wrap">
                                        <a
                                            href={resumePdf}
                                            target="_blank"
                                            rel="noreferrer"
                                            download="Sudharsan_Resume.pdf"
                                            className="about-resume-btn"
                                            title="Download and View Resume"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                <polyline points="7 10 12 15 17 10" />
                                                <line x1="12" y1="15" x2="12" y2="3" />
                                            </svg>
                                            <span>Download Resume</span>
                                        </a>
                                    </div>

                                    {/* Experience Block (Under Resume Group) */}
                                    <div className="about-experience-card">
                                        <h4 className="about-experience-title">Experience</h4>
                                        <p className="about-experience-desc">
                                            <span>Flinthin &mdash; CRM Intern</span>
                                            <span className="about-exp-tag">Automation</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* GSAP Scroll-Triggered Circle Transition Section */}
                    <section id="circle-transition" className="gsap-transition-section" ref={transitionSectionRef}>
                        <div id="projects" style={{ position: 'absolute', top: 0, pointerEvents: 'none' }} />
                        <div className="gsap-pinned-stage" ref={stageRef}>

                            {/* Background Shades - Overall page flood vortex swirl */}
                            <div ref={floodVortexRef} className="blackhole-flood-vortex">
                                <div className="blackhole-flood-ripple ripple-1" />
                                <div className="blackhole-flood-ripple ripple-2" />
                                <div className="blackhole-flood-ripple ripple-3" />
                            </div>

                            {/* Scroll Hint indicator */}
                            <div ref={scrollHintRef} className="gsap-scroll-hint">
                                <span>Scroll to expand</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <polyline points="19 12 12 19 5 12" />
                                </svg>
                            </div>

                            {/* Black Hole Gravitational System with Clockwise Orbiting Black Dots & Motion Shades */}
                            <div ref={blackholeSystemRef} className="blackhole-system">
                                {/* Cosmic Accretion Disk & Photon Boundary */}
                                <div className="blackhole-accretion-disk" />
                                <div className="blackhole-photon-ring" />

                                {/* Concentric Orbit Tracks with Clockwise Rotating Black Dots and Motion Trail Shades */}
                                <div ref={orbitsRef} className="blackhole-orbits-wrap">
                                    {blackholeOrbitTiers.map((tier, tIdx) => (
                                        <div
                                            key={tIdx}
                                            className={`blackhole-orbit-tier tier-${tIdx}`}
                                            style={{
                                                width: tier.radius * 2,
                                                height: tier.radius * 2,
                                                animationDuration: tier.speed,
                                            }}
                                        >
                                            {Array.from({ length: tier.count }).map((_, dIdx) => {
                                                const angleDeg = (360 / tier.count) * dIdx;
                                                return (
                                                    <div
                                                        key={dIdx}
                                                        className="blackhole-orbit-dot"
                                                        style={{
                                                            width: tier.dotSize,
                                                            height: tier.dotSize,
                                                            transform: `rotate(${angleDeg}deg) translateX(${tier.radius}px)`,
                                                        }}
                                                    >
                                                        {/* Trailing motion shade streaming behind clockwise movement */}
                                                        <div className="dot-motion-shade" />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>

                                {/* Central Black Hole Event Horizon (#0000 / #000000) */}
                                <div
                                    ref={circleRef}
                                    className="gsap-black-circle blackhole-singularity"
                                    id="gsap-circle"
                                    aria-hidden="true"
                                />
                            </div>

                            {/* Dedicated Full-Screen Black Screen Contents Component */}
                            <BlackScreenContent
                                ref={blackScreenContentRef}
                                onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                onNavigateToSection={(sectionId) => {
                                    const el = document.getElementById(sectionId);
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth' });
                                    } else {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }}
                            />
                        </div>
                    </section>

                </main>
            </div>
        </>
    );
}

