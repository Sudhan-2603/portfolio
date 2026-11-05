import { forwardRef, useEffect, useRef, useState, useCallback } from 'react';
import './BlackScreenContent.css';
import SkillsEcosystem from './SkillsEcosystem';
import CertificatesScanner from './CertificatesScanner';
import StrandsZoomSection from './StrandsZoomSection';

import dayLogo from '../../assets/Day-logo.png';
import youtifyLogo from '../../assets/Youtify-logo.png';
import ticketifyImg from '../../assets/Ticketify.png';
import skoolErpImg from '../../assets/Skool-Erp.png';
import campayImg from '../../assets/Campay.png';
import logoImg from '../../assets/Logo-trans.png';
import resumePdf from '../../assets/certificate/resume.PDF';

/**
 * All 7 Featured Projects based on user's portfolio plan:
 * 1. Open Sources -> Day, Youtify
 * 2. Normal Project -> Ticketify, Skool ERP
 * 3. Design -> College ERP, Fity
 * 4. Programming -> Bank Management System
 */
const PROJECTS_DATA = [
    {
        id: 'project-day',
        number: '01',
        title: 'Day',
        categoryBadge: 'Open Source',
        tagline: 'Open-source daily habit & activity matrix tracker',
        spec1: 'React · Vite',
        spec2: 'Web App',
        pillTag: 'Free & Open',
        btnText: 'View Project',
        link: 'https://github.com/Sudhan-2603/Day',
        sourceLink: 'https://github.com/Sudhan-2603/Day',
        image: dayLogo,
    },
    {
        id: 'project-youtify',
        number: '02',
        title: 'Youtify',
        categoryBadge: 'Open Source',
        tagline: 'Ad-free YouTube & streaming music audio client',
        spec1: 'React · Audio',
        spec2: 'Media App',
        pillTag: 'Open Audio',
        btnText: 'View Project',
        link: 'https://github.com/Sudhan-2603/Youtify',
        sourceLink: 'https://github.com/Sudhan-2603/Youtify',
        image: youtifyLogo,
    },
    {
        id: 'project-ticketify',
        number: '03',
        title: 'Ticketify',
        categoryBadge: 'Web App',
        tagline: 'Event ticketing, QR validation & booking platform',
        spec1: 'MERN Stack',
        spec2: 'Full-Stack',
        pillTag: 'Production',
        btnText: 'View Project',
        link: 'https://ticketify-19t0.onrender.com',
        sourceLink: 'https://github.com/Sudhan-2603/Ticketify',
        image: ticketifyImg,
    },
    {
        id: 'project-skool-erp',
        number: '04',
        title: 'Skool ERP',
        categoryBadge: 'Enterprise SaaS',
        tagline: 'All-in-one school grading & attendance portal',
        spec1: 'React · Firebase',
        spec2: 'SaaS ERP',
        pillTag: 'Cloud ERP',
        btnText: 'View Project',
        link: 'https://skool.sudhan.website',
        sourceLink: 'https://github.com/Sudhan-2603/Skool',
        image: skoolErpImg,
    },
    {
        id: 'project-campay',
        number: '05',
        title: 'Campay',
        categoryBadge: 'UI/UX Design',
        tagline: 'University campus academic lifecycle design system',
        spec1: 'Figma UI/UX',
        spec2: 'Design System',
        pillTag: 'Figma UI',
        btnText: 'View Design',
        link: 'https://www.behance.net/sudharsank18',
        sourceLink: null,
        image: campayImg,
    },
    {
        id: 'project-fity',
        number: '06',
        title: 'Fity',
        categoryBadge: 'Mobile UI/UX',
        tagline: 'Gamified workout & daily health tracking mobile UI',
        spec1: 'Figma · Proto',
        spec2: 'Mobile App',
        pillTag: 'Mobile App',
        btnText: 'View Prototype',
        link: 'https://www.figma.com/proto/qgTDM9Cqaz8tUbSsJlW7bS/Product-Design?node-id=64-1908&p=f&t=4LHjLm2vO432UQ1g-0&scaling=scale-down&content-scaling=fixed&page-id=64%3A1908&starting-point-node-id=5707%3A3138',
        sourceLink: null,
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 'project-bank-management',
        number: '07',
        title: 'Bank Management System',
        categoryBadge: 'Core Systems',
        tagline: 'High-security transaction ledger & account vault core',
        spec1: 'C++ ',
        spec2: 'Banking Core',
        pillTag: 'C++ ',
        btnText: 'View Project',
        link: 'https://github.com/Sudhan-2603/Bank-Management',
        sourceLink: 'https://github.com/Sudhan-2603/Bank-Management',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    },
];

/**
 * BlackScreenContent
 * Deep Space Universe with real-time 3D moving starfield,
 * interactive cosmic parallax, shooting stars, and celestial nebulae.
 * Automatically transitions after 5 seconds from the welcome frame into
 * a fixed horizontal scroll carousel driven by the user's scroll.
 */
const BlackScreenContent = forwardRef((props, ref) => {
    const canvasRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const projectsContainerRef = useRef(null);
    const trackRef = useRef(null);
    const [isEntered, setIsEntered] = useState(false);

    // Phases: 'welcome' (5s auto vanish) -> 'vanishing' (ending animation) -> 'projects' (show projects section)
    const [phase, setPhase] = useState('welcome');
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [isExitingToSkills, setIsExitingToSkills] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // 1. Dynamic 3D Moving Starfield Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let width = 0;
        let height = 0;
        let centerX = 0;
        let centerY = 0;
        let dpr = 1;

        const STAR_COUNT = 900;
        const MAX_DEPTH = 1800;
        const BASE_SPEED = 2.4;
        let currentSpeed = BASE_SPEED;
        let targetSpeed = BASE_SPEED;

        let mouseX = 0;
        let mouseY = 0;
        let targetMouseX = 0;
        let targetMouseY = 0;

        const STAR_COLORS = [
            'rgba(255, 255, 255,',
            'rgba(255, 255, 255,',
            'rgba(255, 255, 255,',
            'rgba(186, 230, 253,',
            'rgba(199, 210, 254,',
            'rgba(254, 240, 138,',
        ];

        const stars = [];
        const initStar = (star = {}) => {
            star.x = (Math.random() - 0.5) * (width * 3.5 || 4000);
            star.y = (Math.random() - 0.5) * (height * 3.5 || 3000);
            star.z = Math.random() * MAX_DEPTH + 1;
            star.prevZ = star.z;
            star.baseSize = Math.random() * 1.8 + 0.8;
            star.colorPrefix = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
            star.twinkleRate = Math.random() * 0.04 + 0.02;
            star.twinklePhase = Math.random() * Math.PI * 2;
            return star;
        };

        const handleResize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            centerX = width / 2;
            centerY = height / 2;

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push(initStar({}));
        }

        // Shooting Stars
        const meteors = [];
        const createMeteor = () => {
            const startX = Math.random() * width * 0.8 + width * 0.1;
            const startY = Math.random() * height * 0.4;
            const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4;
            const speed = Math.random() * 16 + 22;
            const length = Math.random() * 120 + 80;

            meteors.push({
                x: startX,
                y: startY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                length,
                life: 1,
                decay: Math.random() * 0.018 + 0.014,
                width: Math.random() * 2 + 1.2,
                color: Math.random() > 0.4 ? 'rgba(255, 255, 255,' : 'rgba(147, 197, 253,',
            });
        };

        let nextMeteorTime = performance.now() + Math.random() * 2500 + 1500;

        const handlePointerMove = (e) => {
            const normX = (e.clientX - centerX) / (centerX || 1);
            const normY = (e.clientY - centerY) / (centerY || 1);
            targetMouseX = normX * 120;
            targetMouseY = normY * 90;
        };
        window.addEventListener('pointermove', handlePointerMove);

        const handleWheel = (e) => {
            const delta = Math.abs(e.deltaY);
            targetSpeed = Math.min(28, targetSpeed + delta * 0.015);
        };
        window.addEventListener('wheel', handleWheel, { passive: true });

        let lastTime = performance.now();

        const render = (now) => {
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;

            currentSpeed += (targetSpeed - currentSpeed) * 0.08;
            targetSpeed += (BASE_SPEED - targetSpeed) * 0.04;

            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            ctx.fillStyle = currentSpeed > 6 ? 'rgba(0, 0, 0, 0.42)' : 'rgba(0, 0, 0, 0.85)';
            ctx.fillRect(0, 0, width, height);

            const fov = Math.max(width, height) * 0.72;

            for (let i = 0; i < stars.length; i++) {
                const star = stars[i];
                star.prevZ = star.z;
                star.z -= currentSpeed * (dt * 60);

                if (star.z <= 0) {
                    star.z = MAX_DEPTH;
                    star.prevZ = MAX_DEPTH;
                    star.x = (Math.random() - 0.5) * width * 3.5;
                    star.y = (Math.random() - 0.5) * height * 3.5;
                }

                const k = fov / star.z;
                const prevK = fov / star.prevZ;

                const sx = centerX + star.x * k + mouseX * (1 - star.z / MAX_DEPTH);
                const sy = centerY + star.y * k + mouseY * (1 - star.z / MAX_DEPTH);

                const prevSx = centerX + star.x * prevK + mouseX * (1 - star.prevZ / MAX_DEPTH);
                const prevSy = centerY + star.y * prevK + mouseY * (1 - star.prevZ / MAX_DEPTH);

                if (sx < -60 || sx > width + 60 || sy < -60 || sy > height + 60) {
                    continue;
                }

                const depthRatio = 1 - star.z / MAX_DEPTH;
                const twinkle = 0.75 + 0.25 * Math.sin(now * star.twinkleRate + star.twinklePhase);
                const alpha = Math.min(1, Math.max(0.1, depthRatio * 1.5 * twinkle));
                const size = Math.max(0.6, depthRatio * star.baseSize * 2.8);

                const dist = Math.hypot(sx - prevSx, sy - prevSy);

                if (dist > 1.2 || currentSpeed > 4.5) {
                    ctx.beginPath();
                    ctx.moveTo(prevSx, prevSy);
                    ctx.lineTo(sx, sy);
                    ctx.strokeStyle = `${star.colorPrefix} ${alpha})`;
                    ctx.lineWidth = size * 0.9;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.arc(sx, sy, size, 0, Math.PI * 2);
                    ctx.fillStyle = `${star.colorPrefix} ${alpha})`;
                    ctx.fill();

                    if (depthRatio > 0.72) {
                        ctx.beginPath();
                        ctx.arc(sx, sy, size * 2.6, 0, Math.PI * 2);
                        ctx.fillStyle = `${star.colorPrefix} ${alpha * 0.25})`;
                        ctx.fill();
                    }
                }
            }

            if (now > nextMeteorTime) {
                createMeteor();
                nextMeteorTime = now + Math.random() * 4500 + 2000;
            }

            for (let m = meteors.length - 1; m >= 0; m--) {
                const meteor = meteors[m];
                meteor.x += meteor.vx * (dt * 60);
                meteor.y += meteor.vy * (dt * 60);
                meteor.life -= meteor.decay * (dt * 60);

                if (meteor.life <= 0 || meteor.x > width + 200 || meteor.y > height + 200) {
                    meteors.splice(m, 1);
                    continue;
                }

                const tailX = meteor.x - (meteor.vx / Math.hypot(meteor.vx, meteor.vy)) * meteor.length;
                const tailY = meteor.y - (meteor.vy / Math.hypot(meteor.vx, meteor.vy)) * meteor.length;

                const grad = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
                grad.addColorStop(0, `${meteor.color} ${meteor.life * 0.95})`);
                grad.addColorStop(0.35, `${meteor.color} ${meteor.life * 0.5})`);
                grad.addColorStop(1, `${meteor.color} 0)`);

                ctx.beginPath();
                ctx.moveTo(meteor.x, meteor.y);
                ctx.lineTo(tailX, tailY);
                ctx.strokeStyle = grad;
                ctx.lineWidth = meteor.width;
                ctx.lineCap = 'round';
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(meteor.x, meteor.y, meteor.width * 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${meteor.life})`;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    // 2. Observer to detect dark theme entry when user scrolls down
    useEffect(() => {
        const checkDarkTheme = () => {
            if (document.body.classList.contains('dark-theme-active')) {
                setIsEntered(true);
            } else {
                setIsEntered(false);
                // Only reset back to welcome if user scrolled all the way back to the top of the webpage
                if (window.scrollY < 120) {
                    setPhase('welcome');
                }
            }
        };

        checkDarkTheme();

        const observer = new MutationObserver(checkDarkTheme);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    // 3. Trigger Ending Vanish Transition function
    const triggerVanish = useCallback(() => {
        if (phase === 'vanishing' || phase === 'projects') return;
        setPhase('vanishing');
        const timer = setTimeout(() => {
            setPhase('projects');
        }, 850);
        return () => clearTimeout(timer);
    }, [phase]);

    // 4. 5-Second Timer: stays on screen for 5s, then triggers ending animation
    useEffect(() => {
        if (!isEntered || phase !== 'welcome') return;

        const timer = setTimeout(() => {
            triggerVanish();
        }, 5000);

        return () => clearTimeout(timer);
    }, [isEntered, phase, triggerVanish]);

    // 5. User Scroll Driven Horizontal Carousel & Vertical Page Scroll:
    // When hovering over the carousel track, wheels horizontally through the card deck.
    // When reaching the end or scrolling elsewhere, naturally flows vertically down to the Skills Ecosystem!
    useEffect(() => {
        if (phase !== 'projects') return;

        let snapTimeout = null;

        const onWheel = (e) => {
            const tr = trackRef.current;
            if (!tr) return;

            // Check if cursor/wheel target is over the carousel track
            const carouselWrapper = tr.closest('.space-carousel-wrapper');
            const isOverCarousel = carouselWrapper && (carouselWrapper === e.target || carouselWrapper.contains(e.target));

            if (isOverCarousel) {
                // Prevent any horizontal swipe from displacing the outer webpage
                if (Math.abs(e.deltaX) > 0) {
                    e.preventDefault();
                }

                const maxScroll = tr.scrollWidth - tr.clientWidth;
                const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
                const delta = isHorizontal ? e.deltaX : e.deltaY;

                // If scrolling right/down and not at the end of carousel:
                if (delta > 0 && tr.scrollLeft < maxScroll - 4) {
                    e.preventDefault();
                    tr.style.scrollSnapType = 'none';
                    tr.scrollLeft += delta * 1.35;

                    if (snapTimeout) clearTimeout(snapTimeout);
                    snapTimeout = setTimeout(() => {
                        if (tr) tr.style.scrollSnapType = 'x mandatory';
                    }, 150);
                    return;
                }

                // If scrolling left/up and not at the beginning of carousel:
                if (delta < 0 && tr.scrollLeft > 4) {
                    e.preventDefault();
                    tr.style.scrollSnapType = 'none';
                    tr.scrollLeft += delta * 1.35;

                    if (snapTimeout) clearTimeout(snapTimeout);
                    snapTimeout = setTimeout(() => {
                        if (tr) tr.style.scrollSnapType = 'x mandatory';
                    }, 150);
                    return;
                }

                // If user is swiping horizontally at ends, prevent page from jumping sideways
                if (isHorizontal) {
                    e.preventDefault();
                }
            }

            // Otherwise, allow standard smooth vertical scrolling through the black screen sections!
        };

        const onWindowScroll = () => {
            if (window.scrollX !== 0) {
                window.scrollTo({ left: 0, top: window.scrollY });
            }
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('scroll', onWindowScroll, { passive: true });
        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('scroll', onWindowScroll);
            if (snapTimeout) clearTimeout(snapTimeout);
        };
    }, [phase]);

    // Track scroll listener to update active index & dots
    const handleTrackScroll = () => {
        const track = trackRef.current;
        if (!track) return;
        const scrollLeft = track.scrollLeft;
        const cardWidth = 380;
        const newIndex = Math.min(
            PROJECTS_DATA.length - 1,
            Math.max(0, Math.round(scrollLeft / cardWidth))
        );
        setActiveCardIndex(newIndex);
    };

    // Carousel navigation controls - scrolls carousel track directly without shifting the outer page
    const scrollToCard = (index) => {
        const track = trackRef.current;
        if (!track) return;
        const cards = track.querySelectorAll('.reference-style-card');
        const targetCard = cards[index];
        if (targetCard) {
            const trackRect = track.getBoundingClientRect();
            const cardRect = targetCard.getBoundingClientRect();
            const targetLeft = (cardRect.left - trackRect.left) + track.scrollLeft - (track.clientWidth / 2) + (targetCard.clientWidth / 2);
            track.scrollTo({
                left: Math.max(0, targetLeft),
                behavior: 'smooth'
            });
        }
    };

    const handleNextProject = () => {
        const nextIndex = (activeCardIndex + 1) % PROJECTS_DATA.length;
        setActiveCardIndex(nextIndex);
        scrollToCard(nextIndex);
    };

    const handlePrevProject = () => {
        const prevIndex = (activeCardIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
        setActiveCardIndex(prevIndex);
        scrollToCard(prevIndex);
    };

    const handleDotClick = (index) => {
        setActiveCardIndex(index);
        scrollToCard(index);
    };

    // Scroll to explore with smooth vanish dots exit animation
    const handleExploreSkills = () => {
        setIsExitingToSkills(true);
        setTimeout(() => {
            const skillsEl = document.getElementById('skills-ecosystem-section');
            if (skillsEl) {
                skillsEl.scrollIntoView({ behavior: 'smooth' });
            }
        }, 280);
    };

    // Monitor vertical scroll within black screen to trigger exit vanish / entrance across all sections
    const handleScrollContainer = (e) => {
        const container = e.currentTarget;
        const scrollTop = container.scrollTop;

        // Projects Section exit vanish transition
        if (scrollTop > 220) {
            if (!isExitingToSkills) setIsExitingToSkills(true);
        } else if (scrollTop < 80) {
            if (isExitingToSkills) setIsExitingToSkills(false);
        }
    };

    // Dedicated smooth scroll down to Get In Touch section
    const scrollToGetInTouch = useCallback(() => {
        setMobileMenuOpen(false);
        if (phase !== 'projects') {
            setPhase('projects');
        }
        setIsEntered(true);
        document.body.classList.add('dark-theme-active');
        document.body.classList.add('hide-navbar');

        const doScroll = () => {
            const container = scrollContainerRef.current;
            if (container) {
                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: 'smooth',
                });
            }
        };

        doScroll();
        const t1 = setTimeout(doScroll, 120);
        const t2 = setTimeout(doScroll, 400);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [phase]);

    // Global listener so App navbar can trigger jump into Get In Touch section
    useEffect(() => {
        const handleNavigate = () => {
            scrollToGetInTouch();
        };

        window.addEventListener('navigate-to-contact', handleNavigate);
        return () => window.removeEventListener('navigate-to-contact', handleNavigate);
    }, [scrollToGetInTouch]);

    return (
        <div ref={ref} className="blackscreen-content-root">
            {/* Ambient Cosmic Nebula Layers */}
            <div className="blackscreen-cosmos-backdrop">
                <div className="blackscreen-nebula nebula-deep-purple" />
                <div className="blackscreen-nebula nebula-interstellar-cyan" />
                <div className="blackscreen-nebula nebula-cosmic-magenta" />
            </div>

            {/* Dynamic 3D Moving Starfield Canvas */}
            <canvas ref={canvasRef} className="blackscreen-space-canvas" />

            {/* Ambient 4-Point Celestial Sparkle Star */}
            <div className="space-sparkle-star" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
                </svg>
            </div>

            {/* 1. HERO MESSAGE FRAME: "Welcome To The Project Section" with 5s display, entry & ending animation */}
            {phase !== 'projects' && (
                <div
                    className={`space-message-frame ${isEntered ? 'is-entered' : ''} ${phase === 'vanishing' ? 'is-vanishing' : ''
                        }`}
                >
                    {/* Crosshair Corner Grid */}
                    <div className="space-crosshair-grid">
                        <div className="space-corner-crosshair crosshair-tl" aria-hidden="true">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <path d="M14.5 0H15.5V30H14.5V0Z" fill="currentColor" />
                                <path d="M30 14.5V15.5L0 15.5L0 14.5L30 14.5Z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="space-corner-crosshair crosshair-tr" aria-hidden="true">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <path d="M14.5 0H15.5V30H14.5V0Z" fill="currentColor" />
                                <path d="M30 14.5V15.5L0 15.5L0 14.5L30 14.5Z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="space-corner-crosshair crosshair-bl" aria-hidden="true">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <path d="M14.5 0H15.5V30H14.5V0Z" fill="currentColor" />
                                <path d="M30 14.5V15.5L0 15.5L0 14.5L30 14.5Z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="space-corner-crosshair crosshair-br" aria-hidden="true">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <path d="M14.5 0H15.5V30H14.5V0Z" fill="currentColor" />
                                <path d="M30 14.5V15.5L0 15.5L0 14.5L30 14.5Z" fill="currentColor" />
                            </svg>
                        </div>
                    </div>

                    {/* Text Body */}
                    <div className="space-message-body">
                        <div className="space-message-eyebrow">
                            <span className="eyebrow-pulse-dot" />
                            <span>PORTFOLIO SHOWCASE</span>
                        </div>

                        <h2 className="space-message-title">Welcome To The Project Section</h2>

                        <p className="space-message-description">
                            Crafting standout digital products, modern web applications, and intuitive interfaces with precision, quality, and creativity.
                        </p>
                    </div>
                </div>
            )}

            {/* 2. REVEALED PROJECTS & SKILLS SECTIONS: Scroll-driven flow in unified cosmic space */}
            {phase === 'projects' && (
                <div ref={scrollContainerRef} className="blackscreen-scroll-container" onScroll={handleScrollContainer}>
                    {/* Floating Capsule Style Navbar: Perfectly aligned on all screens */}
                    <div className="blackscreen-navbar-capsule-wrapper">
                        <header className="blackscreen-capsule-bar">
                            {/* 1. Left: Brand */}
                            <div
                                className="capsule-brand"
                                onClick={() => {
                                    if (props.onScrollToTop) {
                                        props.onScrollToTop();
                                    } else {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }}
                                title="Sudhan - Home"
                                role="button"
                                tabIndex={0}
                            >
                                <div className="capsule-logo-badge">
                                    <img src={logoImg} alt="Sudhan Logo" />
                                </div>
                                <span className="capsule-brand-name">Sudhan</span>
                            </div>

                            {/* 2. Center: Desktop / Tablet Centered Nav Links */}
                            <nav className="capsule-nav-links">
                                <button
                                    type="button"
                                    className="capsule-nav-link"
                                    onClick={() => {
                                        if (props.onScrollToTop) {
                                            props.onScrollToTop();
                                        } else {
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    Home
                                </button>
                                <button
                                    type="button"
                                    className="capsule-nav-link"
                                    onClick={() => {
                                        if (props.onNavigateToSection) {
                                            props.onNavigateToSection('about');
                                        } else {
                                            const el = document.getElementById('about');
                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    About
                                </button>
                                <button
                                    type="button"
                                    className="capsule-nav-link"
                                    onClick={() => {
                                        if (projectsContainerRef.current) {
                                            projectsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    Projects
                                </button>
                                <button
                                    type="button"
                                    className="capsule-nav-link"
                                    onClick={() => {
                                        const skillsEl = document.getElementById('skills-ecosystem-section');
                                        if (skillsEl) skillsEl.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Skills
                                </button>
                                <button
                                    type="button"
                                    className="capsule-nav-link"
                                    onClick={() => {
                                        const certEl = document.getElementById('certificates-scanner-section');
                                        if (certEl) certEl.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Certifications
                                </button>
                            </nav>

                            {/* 3. Right: Actions & Mobile Hamburger */}
                            <div className="capsule-actions-group">
                                <a
                                    href={resumePdf}
                                    target="_blank"
                                    rel="noreferrer"
                                    download="Sudharsan_Resume.pdf"
                                    className="capsule-action-resume"
                                    title="Download and View Resume"
                                >
                                    Resume
                                </a>
                                <button
                                    type="button"
                                    className="capsule-btn-getintouch"
                                    onClick={scrollToGetInTouch}
                                    title="Go to Get in Touch"
                                >
                                    Get in Touch
                                </button>

                                {/* Mobile Toggle Button */}
                                <button
                                    type="button"
                                    className={`blackscreen-mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    aria-label="Toggle navigation menu"
                                    aria-expanded={mobileMenuOpen}
                                    title="Toggle menu"
                                >
                                    <span className="bs-toggle-bar" />
                                    <span className="bs-toggle-bar" />
                                    <span className="bs-toggle-bar" />
                                </button>
                            </div>
                        </header>

                        {/* Mobile Navigation Drawer */}
                        <div className={`blackscreen-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
                            <nav className="blackscreen-mobile-nav">
                                <button
                                    type="button"
                                    className="bs-mobile-link"
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        if (props.onScrollToTop) {
                                            props.onScrollToTop();
                                        } else {
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    Home
                                </button>
                                <button
                                    type="button"
                                    className="bs-mobile-link"
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        if (props.onNavigateToSection) {
                                            props.onNavigateToSection('about');
                                        } else {
                                            const el = document.getElementById('about');
                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    About
                                </button>
                                <button
                                    type="button"
                                    className="bs-mobile-link"
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        if (projectsContainerRef.current) {
                                            projectsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    Projects
                                </button>
                                <button
                                    type="button"
                                    className="bs-mobile-link"
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        const skillsEl = document.getElementById('skills-ecosystem-section');
                                        if (skillsEl) skillsEl.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Skills
                                </button>
                                <button
                                    type="button"
                                    className="bs-mobile-link"
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        const certEl = document.getElementById('certificates-scanner-section');
                                        if (certEl) certEl.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Certifications
                                </button>
                                <div className="bs-mobile-divider" />
                                <a
                                    href={resumePdf}
                                    target="_blank"
                                    rel="noreferrer"
                                    download="Sudharsan_Resume.pdf"
                                    className="bs-mobile-link"
                                    onClick={() => setMobileMenuOpen(false)}
                                    title="Download and View Resume"
                                >
                                    Resume
                                </a>
                                <button
                                    type="button"
                                    className="bs-mobile-cta"
                                    onClick={scrollToGetInTouch}
                                    title="Go to Get in Touch"
                                >
                                    Get in Touch
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Section 1: Projects Showcase with Vanishing Dots Exit Animation */}
                    <div
                        id="space-projects-section"
                        ref={projectsContainerRef}
                        className={`space-projects-section is-revealed clean-layout ${isExitingToSkills ? 'is-exiting-dots' : ''}`}
                    >
                        {/* Dynamic Vanishing Particle Cloud Overlay */}
                        {isExitingToSkills && (
                            <div className="projects-vanish-dots-overlay" aria-hidden="true">
                                {Array.from({ length: 42 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className="vanish-dot-particle"
                                        style={{
                                            '--dot-tx': `${((i % 2 === 0 ? 1 : -1) * (40 + (i * 23) % 260))}px`,
                                            '--dot-ty': `${(-60 - (i * 17) % 200)}px`,
                                            '--dot-scale': (0.5 + (i % 6) * 0.2).toFixed(2),
                                            '--dot-delay': `${((i % 12) * 0.035).toFixed(3)}s`,
                                            top: `${10 + (i * 3.7) % 80}%`,
                                            left: `${5 + (i * 4.3) % 90}%`,
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Projects Section Title */}
                        <div className="space-projects-header-simple">
                            <h2 className="space-projects-simple-title">Projects</h2>
                        </div>

                        {/* Horizontal Interactive Carousel Track */}
                        <div className="space-carousel-wrapper">
                            {/* Carousel Left & Right Side Blur Vignettes */}
                            <div className="carousel-edge-blur edge-left" aria-hidden="true" />
                            <div className="carousel-edge-blur edge-right" aria-hidden="true" />

                            {/* Project Cards Track */}
                            <div
                                ref={trackRef}
                                className="space-projects-track"
                                onScroll={handleTrackScroll}
                            >
                                {PROJECTS_DATA.map((project, idx) => (
                                    <article
                                        key={project.id}
                                        className={`reference-style-card ${idx === activeCardIndex ? 'active' : ''}`}
                                        onClick={() => setActiveCardIndex(idx)}
                                    >
                                        {/* Immersive Cover Background Image (Crystal clear on top) */}
                                        <div
                                            className="card-bg-cover-image"
                                            style={{ backgroundImage: `url(${project.image})` }}
                                        >
                                            <div className="card-bg-dark-gradient" />
                                        </div>

                                        {/* Top Floating Badge */}
                                        <div className="card-top-floating">
                                            <span className="card-top-pill">{project.categoryBadge}</span>
                                            <span className="card-top-num">{project.number}</span>
                                        </div>

                                        {/* Frosted Glassmorphism Bottom Overlay Container */}
                                        <div className="card-frosted-overlay">
                                            {/* Project Title (e.g., "The Hill Guest House" in reference) */}
                                            <h3 className="card-reference-title">{project.title}</h3>

                                            {/* Location / Tagline line with Icon */}
                                            <div className="card-reference-location">
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                    <circle cx="12" cy="10" r="3" />
                                                </svg>
                                                <span className="location-text">{project.tagline}</span>
                                            </div>

                                            {/* Specs Row with Frosted Blur Capsules */}
                                            <div className="card-reference-specs">
                                                <div className="spec-unit">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="16 18 22 12 16 6" />
                                                        <polyline points="8 6 2 12 8 18" />
                                                    </svg>
                                                    <span>{project.spec1}</span>
                                                </div>
                                                <div className="spec-unit">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                                        <line x1="8" y1="21" x2="16" y2="21" />
                                                        <line x1="12" y1="17" x2="12" y2="21" />
                                                    </svg>
                                                    <span>{project.spec2}</span>
                                                </div>
                                            </div>

                                            {/* Bottom Action Row: Sources Button on Left (except UI/UX), View Button on Right */}
                                            <div className="card-reference-bottom-row">
                                                {project.sourceLink && (
                                                    <a
                                                        href={project.sourceLink}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="card-source-glass-btn"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <span>Sources</span>
                                                    </a>
                                                )}
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={`card-reserve-white-btn ${!project.sourceLink ? 'full-length' : ''}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <span>{project.btnText}</span>
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        {/* Controls Bar under project cards row */}
                        <div className="space-projects-under-row">
                            {/* Pagination Indicators Dots */}
                            <div className="carousel-dots">
                                {PROJECTS_DATA.map((_, dotIdx) => (
                                    <button
                                        key={dotIdx}
                                        type="button"
                                        className={`carousel-dot ${dotIdx === activeCardIndex ? 'active' : ''}`}
                                        onClick={() => handleDotClick(dotIdx)}
                                        aria-label={`Go to project ${dotIdx + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Direct Jump to Skills Ecosystem */}
                            <button
                                type="button"
                                className="scroll-to-skills-pill"
                                onClick={handleExploreSkills}
                                title="Explore Skills Ecosystem"
                            >
                                <span>Scroll To Explore</span>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <polyline points="19 12 12 19 5 12" />
                                </svg>
                            </button>

                            {/* Carousel Navigation Toggle Buttons placed under the project card row */}
                            <div className="space-bottom-right-toggle under-cards" title="Toggle project slides">
                                <button
                                    type="button"
                                    className="toggle-arrow-btn"
                                    onClick={handlePrevProject}
                                    aria-label="Previous project"
                                    title="Previous project"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                </button>
                                <div className="toggle-pipe-divider" />
                                <button
                                    type="button"
                                    className="toggle-arrow-btn"
                                    onClick={handleNextProject}
                                    aria-label="Next project"
                                    title="Next project"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Skills Ecosystem Section */}
                    <section id="skills-ecosystem-section" className="space-skills-section">
                        <SkillsEcosystem />
                    </section>

                    {/* Section 3: Verified Certificates Scanner Section (placed directly under Skills) */}
                    <CertificatesScanner />

                    {/* Section 4: Strands Top Angle Zoom into Full-Screen White Background */}
                    <StrandsZoomSection
                        scrollContainerRef={scrollContainerRef}
                        onScrollToTop={props.onScrollToTop}
                    />
                </div>
            )}
        </div>
    );
});

BlackScreenContent.displayName = 'BlackScreenContent';

export default BlackScreenContent;
