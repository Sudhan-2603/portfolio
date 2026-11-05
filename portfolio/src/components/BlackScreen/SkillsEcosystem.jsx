import { useState, useEffect, useRef, useCallback } from 'react';
import './SkillsEcosystem.css';

// Crisp, high-fidelity SVG brand & tech icons (logo only)
const TechIcon = ({ id }) => {
    switch (id) {
        // --- HTML, CSS & JS ---
        case 'html5':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4zm13.3 4.2l-.2 2.5H9.6l.2 2.3h7l-.5 5.5-4.3 1.2-4.3-1.2-.3-3.2h2.2l.1 1.6 2.3.6 2.3-.6.2-2.4H7.2L6.6 7.2h10.7z" fill="#E44D26" />
                </svg>
            );
        case 'css3':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4zm13.3 4.2l-1 10.3-4.3 1.2-4.3-1.2-.3-3.2h2.2l.1 1.6 2.3.6 2.3-.6.3-3.6H7.4l-.2-2.3h9.3l.2-2.6H6.9L6.7 7.2h10.6z" fill="#1572B6" />
                </svg>
            );
        case 'javascript':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#f7df1e" />
                    <path d="M7 17.5c.6.9 1.4 1.5 2.6 1.5 1.3 0 2.2-.7 2.2-2.1v-5.4h-1.9v5.4c0 .5-.3.8-.8.8-.4 0-.7-.3-.9-.7l-1.2.5zm7.3-.2c.7.9 1.7 1.5 3 1.5 1.7 0 2.8-.9 2.8-2.3 0-1.4-.9-2-2.3-2.6l-.8-.3c-.8-.3-1.2-.7-1.2-1.2 0-.6.5-1.1 1.3-1.1.7 0 1.3.3 1.7.9l1.4-1c-.8-1-1.8-1.4-3.1-1.4-1.7 0-2.8.9-2.8 2.2 0 1.3.8 1.9 2.2 2.5l.8.3c.9.4 1.4.8 1.4 1.4 0 .7-.6 1.2-1.5 1.2-.9 0-1.6-.4-2.1-1.2l-1.3.8z" fill="#000000" />
                </svg>
            );

        // --- MERN Stack ---
        case 'mongodb':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C12 2 6 7.5 6 13c0 3.3 2.7 6 6 7 3.3-1 6-3.7 6-7 0-5.5-6-11-6-11z" fill="#47A248" />
                    <path d="M12 2v18c.3 0 .7-.1 1-.2 2.6-.9 4.7-3.2 4.7-6.8 0-4.8-4.7-9.5-5.7-11z" fill="#499D4A" />
                    <path d="M12 19.5v2.5c-.3 0-.6-.1-.9-.2L12 19.5z" fill="#3F9142" />
                </svg>
            );
        case 'express':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    <text x="12" y="16.5" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ex</text>
                </svg>
            );
        case 'react':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61dafb" strokeWidth="1.5" />
                    <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61dafb" strokeWidth="1.5" transform="rotate(60 12 12)" />
                    <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61dafb" strokeWidth="1.5" transform="rotate(120 12 12)" />
                    <circle cx="12" cy="12" r="1.8" fill="#61dafb" />
                </svg>
            );
        case 'nodejs':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l8.5 4.9v9.8L12 21.6 3.5 16.7V6.9L12 2z" stroke="#68a063" strokeWidth="1.6" fill="rgba(104, 160, 99, 0.15)" />
                    <path d="M12 6.5v11m-4.5-8l4.5 2.5 4.5-2.5" stroke="#68a063" strokeWidth="1.5" />
                </svg>
            );

        // --- C, C++, Java ---
        case 'c':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 13.5c-.8 1-2.1 1.7-3.7 1.7-3.1 0-5.3-2.3-5.3-5.2s2.2-5.2 5.3-5.2c1.6 0 2.9.7 3.7 1.7l-1.5 1.4c-.6-.7-1.3-1.1-2.2-1.1-1.9 0-3.2 1.4-3.2 3.2s1.3 3.2 3.2 3.2c.9 0 1.6-.4 2.2-1.1l1.5 1.4z" fill="#659AD2" />
                </svg>
            );
        case 'cpp':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M11 5c-3.9 0-7 3.1-7 7s3.1 7 7 7c2.4 0 4.5-1.2 5.7-3.1l-2.1-1.3C13.8 15.7 12.5 16.5 11 16.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5c1.5 0 2.8.8 3.6 1.9l2.1-1.3C15.5 6.2 13.4 5 11 5zm7 4h1.5v2H21v1.5h-1.5V14H18v-1.5h-1.5V11H18V9zm4 0h1.5v2H25v1.5h-1.5V14H22v-1.5h-1.5V11H22V9z" fill="#00599C" />
                </svg>
            );
        case 'java':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M7.8 17.5c2.3.3 5.4.3 7.4-.7-1.8-.7-3.8-.8-5.6-.6-1 .1-1.6.5-1.8 1.3zm8.3-3.6c-2.7 1.2-6.5.9-9.1-.2.8-.7 2-.9 3.2-1 2.2-.1 4.2.4 5.9 1.2zm-2.4-5.2c.4 1.1-.3 2.1-1.2 3.1 1.6-.5 3-1.6 3.1-3.1.1-1.3-.8-2.3-1.9-3.2-.2 1.1-.3 2.2 0 3.2zm-2.3-4.7c-1.3 1.4-2.1 3-2.1 4.8 1-.4 2.1-.9 2.8-1.7 1-1.1 1.2-2.3.9-3.1-.5 0-1.1 0-1.6 0zm-5 15.6c4.2.4 9.4.1 13.2-1.7-.8-.4-1.8-.7-2.7-.9-3.4-.6-7.2-.2-10.5 1.5 0 .4 0 .8 0 1.1z" fill="#E76F00" />
                </svg>
            );

        // --- SQL ---
        case 'sql':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#ffffff" strokeWidth="1.8" />
                    <path d="M4 6v5c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#ffffff" strokeWidth="1.8" />
                    <path d="M4 11v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" stroke="#ffffff" strokeWidth="1.8" />
                </svg>
            );

        // --- Flutter ---
        case 'flutter':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M13.5 2L4 11.5l2.8 2.8L19.2 2H13.5z" fill="#42A5F5" />
                    <path d="M13.5 12.5l-4.5 4.5 4.5 4.5h5.7l-4.5-4.5 4.5-4.5h-5.7z" fill="#0D47A1" />
                    <path d="M9 17l2.5 2.5 4-4-2.5-2.5-4 4z" fill="#29B6F6" />
                </svg>
            );

        // --- Three.JS & GSAP ---
        case 'threejs':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2l6.8 3.8L12 11.8 5.2 8 12 4.2zM4.8 9.5l6.2 3.5v7.2L4.8 16.5V9.5zm8.4 10.7v-7.2l6.2-3.5v7l-6.2 3.7z" fill="#ffffff" />
                </svg>
            );
        case 'gsap':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#0ae448" />
                    <path d="M5 12a7 7 0 1 1 14 0 7 7 0 0 1-14 0zm7-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fill="#000000" />
                </svg>
            );

        // --- Tools: Figma, Firebase, Wix ---
        case 'figma':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <rect x="7" y="2" width="5" height="5" rx="2.5" fill="#F24E1E" />
                    <rect x="12" y="2" width="5" height="5" rx="2.5" fill="#FF7262" />
                    <rect x="7" y="7" width="5" height="5" rx="2.5" fill="#A259FF" />
                    <circle cx="14.5" cy="9.5" r="2.5" fill="#1ABCFE" />
                    <rect x="7" y="12" width="5" height="5" rx="2.5" fill="#0ACF83" />
                </svg>
            );
        case 'firebase':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M4.5 17.5L8 3.5l3.5 6.5-7 7.5z" fill="#FFA000" />
                    <path d="M4.5 17.5l7.5 4.5 7.5-4.5-3.5-12.5-4 5-7.5 7.5z" fill="#FFCA28" />
                    <path d="M12 22l7.5-4.5L16 5 12 22z" fill="#F57C00" />
                </svg>
            );
        case 'wix':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#141414" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                    <text x="12" y="16" fill="#ffffff" fontSize="10.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">WIX</text>
                </svg>
            );

        // --- Zoho Products: CRM, Creator, Catalyst ---
        case 'zohocrm':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="5" fill="#e1251b" />
                    <path d="M7 6h10v3h-7v2h6v3h-6v4H7V6z" fill="#ffffff" />
                    <circle cx="17" cy="17" r="2" fill="#ffb400" />
                </svg>
            );
        case 'zohocreator':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="5" fill="#0083cb" />
                    <path d="M6 12l4-5h4l-4 5 4 5h-4l-4-5zm6-5h4l4 5-4 5h-4l4-5-4-5z" fill="#ffffff" />
                </svg>
            );
        case 'zohocatalyst':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="5" fill="#138808" />
                    <path d="M13 3L6 14h5l-2 7 9-12h-5l2-6z" fill="#ffffff" />
                </svg>
            );

        default:
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="6" fill="#ffffff" />
                </svg>
            );
    }
};

/**
 * The exact skill & tool clusters defined by user:
 * 1. HTML, CSS & JS
 * 2. MERN Stack
 * 3. Flutter
 * 4. C, C++, Java
 * 5. SQL
 * 6. Three.JS, GSAP
 * Tools: Figma, Firebase, Wix, Zoho CRM, Creator, Catalyst
 */
const SKILLS_CONFIG = {
    leftBranches: [
        {
            id: 'html-css-js',
            label: 'HTML, CSS & JS',
            skills: [
                { id: 'html5', name: 'HTML5' },
                { id: 'css3', name: 'CSS3' },
                { id: 'javascript', name: 'JavaScript' },
            ],
        },
        {
            id: 'mern-stack',
            label: 'MERN STACK',
            skills: [
                { id: 'mongodb', name: 'MongoDB' },
                { id: 'express', name: 'Express' },
                { id: 'react', name: 'React' },
                { id: 'nodejs', name: 'Node.js' },
            ],
        },
        {
            id: 'c-cpp-java',
            label: 'C, C++, JAVA',
            skills: [
                { id: 'c', name: 'C' },
                { id: 'cpp', name: 'C++' },
                { id: 'java', name: 'Java' },
            ],
        },
        {
            id: 'sql',
            label: 'SQL',
            skills: [
                { id: 'sql', name: 'SQL' },
            ],
        },
    ],
    rightBranches: [
        {
            id: 'flutter',
            label: 'FLUTTER',
            skills: [
                { id: 'flutter', name: 'Flutter' },
            ],
        },
        {
            id: 'threejs-gsap',
            label: 'THREE.JS, GSAP',
            skills: [
                { id: 'threejs', name: 'Three.js' },
                { id: 'gsap', name: 'GSAP' },
            ],
        },
        {
            id: 'tools',
            label: 'TOOLS',
            skills: [
                { id: 'figma', name: 'Figma' },
                { id: 'firebase', name: 'Firebase' },
                { id: 'wix', name: 'Wix' },
            ],
        },
        {
            id: 'zoho-products',
            label: 'ZOHO CLOUD',
            skills: [
                { id: 'zohocrm', name: 'Zoho CRM' },
                { id: 'zohocreator', name: 'Zoho Creator' },
                { id: 'zohocatalyst', name: 'Zoho Catalyst' },
            ],
        },
    ],
};

// Holographic Glowing Earth Sphere SVG
const EarthGlobeSvg = ({ width = 38, height = 38 }) => (
    <svg
        className="earth-globe-svg"
        width={width}
        height={height}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <radialGradient id="earthRadialGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#80b5ff" />
                <stop offset="45%" stopColor="#3D5EE1" />
                <stop offset="85%" stopColor="#0d1b40" />
                <stop offset="100%" stopColor="#050a18" />
            </radialGradient>
            <linearGradient id="continentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#48e59b" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.8" />
            </linearGradient>
        </defs>
        {/* Earth Sphere Base */}
        <circle cx="18" cy="18" r="15" fill="url(#earthRadialGrad)" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
        {/* Stylized Continents & Lat/Long grid */}
        <ellipse cx="18" cy="18" rx="15" ry="6.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none" />
        <ellipse cx="18" cy="18" rx="6.5" ry="15" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none" />
        <line x1="3" y1="18" x2="33" y2="18" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
        <line x1="18" y1="3" x2="18" y2="33" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
        {/* Continents shapes */}
        <path d="M12 9c1.5 0 2.8 1.2 2.8 2.5 0 1-1.2 1.8-2 2-1 .2-2.5 0-3-1s.7-3.5 2.2-3.5z" fill="url(#continentGrad)" />
        <path d="M22 13c1.8-.5 3.5.5 3.5 2 0 1.8-1.5 2.5-3 2.5-1.2 0-2.2-.8-2-2.2.2-1.2.5-2.1 1.5-2.3z" fill="url(#continentGrad)" />
        <path d="M13 22c1.2.2 2.5 1.5 2 2.8-.5 1-2.2 1.5-3.2 1-1.2-.5-1.5-2-.8-3 .5-.8 1-1 2-0.8z" fill="url(#continentGrad)" />
        {/* Core pulse center point */}
        <circle cx="18" cy="18" r="2.4" fill="#ffffff" filter="drop-shadow(0 0 5px #ffffff)" />
    </svg>
);

// Central Earth Origin Node with pulsing shockwaves & atmosphere
const EarthCoreOrigin = ({ isMobile = false, pulseActive = false, onClick }) => (
    <div
        className={`ecosystem-core-node earth-core-node ${isMobile ? 'earth-mobile-node' : ''} ${pulseActive ? 'birth-pulse-active' : ''}`}
        onClick={onClick}
        title="Earth Core Origin - Click to emit creation pulse wave"
    >
        {/* Luminous creation wave shock rings emitted from Earth */}
        <div className="earth-birth-ring ring-1" aria-hidden="true" />
        <div className="earth-birth-ring ring-2" aria-hidden="true" />
        <div className="earth-birth-ring ring-3" aria-hidden="true" />

        <div className="core-node-inner earth-core-inner">
            <div className="earth-atmosphere-glow" />
            <EarthGlobeSvg />
        </div>
    </div>
);

const SkillsEcosystem = () => {
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const wrapperRef = useRef(null);
    const boardRef = useRef(null);
    const hubRef = useRef(null);
    const leftDotRefs = useRef([]);
    const rightDotRefs = useRef([]);

    const [isRevealed, setIsRevealed] = useState(false);
    const [earthPulseActive, setEarthPulseActive] = useState(false);
    const [circuitLines, setCircuitLines] = useState({ left: [], right: [], width: 0, height: 0 });

    // Intersection Observer to trigger entrance animations when user scrolls to Skills Section
    useEffect(() => {
        if (!wrapperRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsRevealed(true);
                        setEarthPulseActive(true);
                        setTimeout(() => setEarthPulseActive(false), 2400);
                    }
                });
            },
            { threshold: 0.12 }
        );
        observer.observe(wrapperRef.current);
        return () => observer.disconnect();
    }, []);

    // Manual click on Earth to re-pulse and birth skills dynamically
    const handleTriggerEarthPulse = () => {
        setEarthPulseActive(true);
        setTimeout(() => setEarthPulseActive(false), 2200);
    };

    // Pixel-perfect line measurement connecting center of Earth directly outward to each connector dot
    const calculateLines = useCallback(() => {
        const board = boardRef.current;
        const hub = hubRef.current;
        if (!board || !hub) return;

        const boardRect = board.getBoundingClientRect();
        const coreNode = hub.querySelector('.ecosystem-core-node') || hub;
        const nodeRect = coreNode.getBoundingClientRect();

        // Exact geometric center coordinates of Earth / central core
        const earthCenterX = nodeRect.left - boardRect.left + nodeRect.width / 2;
        const earthCenterY = nodeRect.top - boardRect.top + nodeRect.height / 2;

        const leftPaths = leftDotRefs.current.map((dotEl) => {
            if (!dotEl) return null;
            const dotRect = dotEl.getBoundingClientRect();
            // Center of the left connector dot
            const dotX = dotRect.left - boardRect.left + dotRect.width / 2;
            const dotY = dotRect.top - boardRect.top + dotRect.height / 2;

            const dx = Math.abs(earthCenterX - dotX);
            const cp1X = earthCenterX - dx * 0.42;
            const cp1Y = earthCenterY;
            const cp2X = dotX + dx * 0.52;
            const cp2Y = dotY;

            // Drawn from Earth center OUTWARD to left dot so motion travels from Earth to skills!
            return `M ${earthCenterX} ${earthCenterY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${dotX} ${dotY}`;
        });

        const rightPaths = rightDotRefs.current.map((dotEl) => {
            if (!dotEl) return null;
            const dotRect = dotEl.getBoundingClientRect();
            // Center of the right connector dot
            const dotX = dotRect.left - boardRect.left + dotRect.width / 2;
            const dotY = dotRect.top - boardRect.top + dotRect.height / 2;

            const dx = Math.abs(dotX - earthCenterX);
            const cp1X = earthCenterX + dx * 0.42;
            const cp1Y = earthCenterY;
            const cp2X = dotX - dx * 0.52;
            const cp2Y = dotY;

            // Drawn from Earth center OUTWARD to right dot so motion travels from Earth to skills!
            return `M ${earthCenterX} ${earthCenterY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${dotX} ${dotY}`;
        });

        setCircuitLines({
            left: leftPaths.filter(Boolean),
            right: rightPaths.filter(Boolean),
            width: boardRect.width,
            height: boardRect.height,
        });
    }, []);

    useEffect(() => {
        calculateLines();
        window.addEventListener('resize', calculateLines);
        window.addEventListener('scroll', calculateLines, { passive: true });

        let ro;
        if (window.ResizeObserver && boardRef.current) {
            ro = new ResizeObserver(() => calculateLines());
            ro.observe(boardRef.current);
        }

        const t1 = setTimeout(calculateLines, 80);
        const t2 = setTimeout(calculateLines, 300);
        const t3 = setTimeout(calculateLines, 800);

        return () => {
            window.removeEventListener('resize', calculateLines);
            window.removeEventListener('scroll', calculateLines);
            if (ro) ro.disconnect();
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [calculateLines]);

    return (
        <div ref={wrapperRef} className={`skills-ecosystem-wrapper ${isRevealed ? 'is-revealed' : ''}`}>
            {/* Header Section: Small dots coalescing into texts entry animation */}
            <div className="skills-ecosystem-header">
                <div className="ecosystem-pill-badge">
                    <span className="pill-dot" />
                    <span>SKILLS & TOOLS</span>
                </div>

                {/* Title with small dots coalescing into texts */}
                <div className="dots-to-text-container">
                    {isRevealed && (
                        <div className="text-coalesce-dots-field" aria-hidden="true">
                            {Array.from({ length: 38 }).map((_, i) => (
                                <span
                                    key={i}
                                    className="coalesce-particle"
                                    style={{
                                        '--start-x': `${((i % 2 === 0 ? 1 : -1) * (45 + (i * 37) % 360))}px`,
                                        '--start-y': `${((i % 3 === 0 ? -1 : 1) * (20 + (i * 29) % 130))}px`,
                                        '--size': `${1.8 + (i % 4) * 1.2}px`,
                                        '--delay': `${((i % 14) * 0.038).toFixed(3)}s`,
                                        '--glow': i % 3 === 0 ? '#3D5EE1' : '#ffffff',
                                    }}
                                />
                            ))}
                        </div>
                    )}
                    <h2 className={`ecosystem-main-title ${isRevealed ? 'title-coalesced' : 'title-pre-coalesce'}`}>
                        <span className="coalesce-word" style={{ '--word-idx': 0 }}>Built-in</span>{' '}
                        <span className="coalesce-word title-highlight" style={{ '--word-idx': 1 }}>ecosystem</span>{' '}
                        <span className="coalesce-word" style={{ '--word-idx': 2 }}>on</span>{' '}
                        <span className="coalesce-word" style={{ '--word-idx': 3 }}>which</span><br />
                        <span className="coalesce-word" style={{ '--word-idx': 4 }}>every</span>{' '}
                        <span className="coalesce-word" style={{ '--word-idx': 5 }}>project</span>{' '}
                        <span className="coalesce-word" style={{ '--word-idx': 6 }}>is</span>{' '}
                        <span className="coalesce-word" style={{ '--word-idx': 7 }}>engineered</span>
                    </h2>
                </div>

                <p className={`ecosystem-subtitle ${isRevealed ? 'subtitle-entered' : 'subtitle-pre'}`}>
                    Core technical competencies and tools powering modern digital solutions.
                </p>
            </div>

            {/* Main Interactive Diagram Board */}
            <div ref={boardRef} className="ecosystem-diagram-board">
                {/* Dynamically Measured SVG Circuit Layer */}
                {circuitLines.width > 0 && (
                    <svg
                        className="ecosystem-dynamic-svg"
                        width={circuitLines.width}
                        height={circuitLines.height}
                        viewBox={`0 0 ${circuitLines.width} ${circuitLines.height}`}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <filter id="whiteCircuitGlow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Left Side Circuit Lines (Energy streams from Earth outward to Left) */}
                        {circuitLines.left.map((pathD, idx) => (
                            <g key={`left-circuit-${idx}`}>
                                <path
                                    d={pathD}
                                    className={`circuit-path ${
                                        hoveredCategory === SKILLS_CONFIG.leftBranches[idx]?.id ? 'is-active-path' : ''
                                    }`}
                                    stroke="#ffffff"
                                    strokeWidth="1.8"
                                    strokeOpacity="0.75"
                                    fill="none"
                                />
                                <circle r="3.2" fill="#ffffff" filter="url(#whiteCircuitGlow)">
                                    <animateMotion
                                        path={pathD}
                                        dur={earthPulseActive ? "1.2s" : `${3.2 + idx * 0.5}s`}
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </g>
                        ))}

                        {/* Right Side Circuit Lines (Energy streams from Earth outward to Right) */}
                        {circuitLines.right.map((pathD, idx) => (
                            <g key={`right-circuit-${idx}`}>
                                <path
                                    d={pathD}
                                    className={`circuit-path ${
                                        hoveredCategory === SKILLS_CONFIG.rightBranches[idx]?.id ? 'is-active-path' : ''
                                    }`}
                                    stroke="#ffffff"
                                    strokeWidth="1.8"
                                    strokeOpacity="0.75"
                                    fill="none"
                                />
                                <circle r="3.2" fill="#ffffff" filter="url(#whiteCircuitGlow)">
                                    <animateMotion
                                        path={pathD}
                                        dur={earthPulseActive ? "1.2s" : `${3.4 + idx * 0.4}s`}
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </g>
                        ))}
                    </svg>
                )}

                {/* 1. Left Branches Column */}
                <div className="ecosystem-branch-column branch-column-left">
                    {SKILLS_CONFIG.leftBranches.map((branch, bIdx) => (
                        <div
                            key={branch.id}
                            className={`ecosystem-branch-row row-left ${
                                hoveredCategory === branch.id ? 'is-focused' : ''
                            }`}
                            onMouseEnter={() => setHoveredCategory(branch.id)}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            {/* Skills Tiles Cluster - ONLY LOGO with Earth creation entry */}
                            <div className="branch-tiles-cluster tiles-left">
                                {branch.skills.map((skill, sIdx) => (
                                    <div
                                        key={skill.id}
                                        className={`skill-glass-card ${isRevealed ? 'skill-born' : 'skill-unborn'}`}
                                        style={{
                                            '--branch-delay': `${0.45 + bIdx * 0.12}s`,
                                            '--skill-delay': `${0.6 + bIdx * 0.12 + sIdx * 0.08}s`,
                                            '--birth-origin-x': '36px',
                                        }}
                                        aria-label={skill.name}
                                    >
                                        <div className="skill-card-inner">
                                            <TechIcon id={skill.id} />
                                        </div>
                                        <span className="skill-tooltip-name">{skill.name}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Category Label with Connector Dot */}
                            <div className="branch-label-wrap label-left">
                                <span className="branch-label-text">{branch.label}</span>
                                <div
                                    ref={(el) => (leftDotRefs.current[bIdx] = el)}
                                    className="connector-dot dot-left"
                                    style={{ '--branch-delay': `${0.45 + bIdx * 0.12}s` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* 2. Central Earth Hub - Origin that creates all skills */}
                <div ref={hubRef} className={`ecosystem-center-hub-zone ${isRevealed ? 'earth-birthing-skills' : ''}`}>
                    <EarthCoreOrigin
                        isMobile={false}
                        pulseActive={earthPulseActive}
                        onClick={handleTriggerEarthPulse}
                    />
                </div>

                {/* 3. Right Branches Column */}
                <div className="ecosystem-branch-column branch-column-right">
                    {SKILLS_CONFIG.rightBranches.map((branch, bIdx) => (
                        <div
                            key={branch.id}
                            className={`ecosystem-branch-row row-right ${
                                hoveredCategory === branch.id ? 'is-focused' : ''
                            }`}
                            onMouseEnter={() => setHoveredCategory(branch.id)}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            {/* Category Label with Connector Dot */}
                            <div className="branch-label-wrap label-right">
                                <div
                                    ref={(el) => (rightDotRefs.current[bIdx] = el)}
                                    className="connector-dot dot-right"
                                    style={{ '--branch-delay': `${0.5 + bIdx * 0.12}s` }}
                                />
                                <span className="branch-label-text">{branch.label}</span>
                            </div>

                            {/* Skills Tiles Cluster - ONLY LOGO with Earth creation entry */}
                            <div className="branch-tiles-cluster tiles-right">
                                {branch.skills.map((skill, sIdx) => (
                                    <div
                                        key={skill.id}
                                        className={`skill-glass-card ${isRevealed ? 'skill-born' : 'skill-unborn'}`}
                                        style={{
                                            '--branch-delay': `${0.5 + bIdx * 0.12}s`,
                                            '--skill-delay': `${0.65 + bIdx * 0.12 + sIdx * 0.08}s`,
                                            '--birth-origin-x': '-36px',
                                        }}
                                        aria-label={skill.name}
                                    >
                                        <div className="skill-card-inner">
                                            <TechIcon id={skill.id} />
                                        </div>
                                        <span className="skill-tooltip-name">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile / Responsive Flow (< 768px) - Aligned with Central Glowing Earth Origin */}
            <div className="ecosystem-mobile-flow">
                <div className="mobile-earth-container">
                    <EarthCoreOrigin
                        isMobile={true}
                        pulseActive={earthPulseActive}
                        onClick={handleTriggerEarthPulse}
                    />
                    <div className="mobile-earth-label">
                        <span className="mobile-earth-pulse-dot" />
                        <span className="mobile-earth-title">Earth Core Origin</span>
                    </div>
                    {/* Glowing vertical spine connector extending into the categories */}
                    <div className="mobile-earth-spine" aria-hidden="true" />
                </div>

                <div className="mobile-categories-grid">
                    {[...SKILLS_CONFIG.leftBranches, ...SKILLS_CONFIG.rightBranches].map((cat, cIdx) => (
                        <div key={cat.id} className="mobile-category-card" style={{ '--stack-index': cIdx }}>
                            <div className="mobile-cat-header">
                                <span className="mobile-cat-dot" />
                                <span className="mobile-cat-name">{cat.label}</span>
                            </div>
                            <div className="mobile-tiles-wrap">
                                {cat.skills.map((skill, sIdx) => (
                                    <div
                                        key={skill.id}
                                        className={`skill-glass-card mobile-tile ${isRevealed ? 'skill-born' : 'skill-unborn'}`}
                                        style={{
                                            '--skill-delay': `${0.25 + cIdx * 0.08 + sIdx * 0.05}s`,
                                            '--birth-origin-x': '0px',
                                        }}
                                        aria-label={skill.name}
                                    >
                                        <div className="skill-card-inner">
                                            <TechIcon id={skill.id} />
                                        </div>
                                        <span className="skill-tooltip-name">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default SkillsEcosystem;
