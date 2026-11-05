import { useEffect, useRef, useState } from 'react';
import './CertificatesScanner.css';
import logoImg from '../../assets/Logo-trans.png';

// Certificate image assets
import figmaImg from '../../assets/certificate/Figma.jpg';
import samsungImg from '../../assets/certificate/samsung.jpeg';
import crmImg from '../../assets/certificate/CRM.jpeg';
import crmUiImg from '../../assets/certificate/CRMUI.jpeg';
import adobeImg from '../../assets/certificate/Adobe .jpeg';
import hack2skillsImg from '../../assets/certificate/Hack2skills.jpeg';

// Certificate PDF assets
import dbmsPdf from '../../assets/certificate/DBMS.pdf';
import unstopFigmaPdf from '../../assets/certificate/unstop-figma.pdf';
import html5Pdf from '../../assets/certificate/HTML5.pdf';
import cssPdf from '../../assets/certificate/CSS.pdf';
import jsPdf from '../../assets/certificate/JAVASCRIPT.pdf';
import rbiPdf from '../../assets/certificate/RBI QUIZ certificate.pdf';
import sudhanPdf from '../../assets/certificate/24104070 Sudharsan.pdf';

// Master Certificates Data (13 Certificates from src/assets/certificate)
const CERTIFICATES_DATA = [
  {
    id: 'figma',
    number: '01',
    title: 'Figma UI/UX Design',
    issuer: 'Figma',
    category: 'UI/UX Design',
    pill: 'FIGMA',
    tag: 'Design System & Prototyping',
    isImage: true,
    file: figmaImg,
    themeColor: '#7C3AED',
    bgGradient: 'linear-gradient(135deg, rgba(124, 58, 237, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)',
    codeHtml: `<certificate id="figma">
  <h1>Figma UI/UX Design</h1>
  <issuer>Figma</issuer>
  <recipient>Sudharsan</recipient>
  <specialization>Design Systems & Prototyping</specialization>
  <tools>Figma, Wireframes, Auto-Layout</tools>
  <status>Verified Credential</status>
</certificate>`,
    codeMeta: `<!-- credential: verified -->
<!-- format: image/jpeg -->
<!-- issuer: Figma Academy -->
<!-- recipient: Sudharsan -->`
  },
  {
    id: 'samsung',
    number: '02',
    title: 'Samsung Innovation Campus',
    issuer: 'Samsung',
    category: 'Innovation & AI',
    pill: 'SAMSUNG',
    tag: 'Artificial Intelligence & Emerging Tech',
    isImage: true,
    file: samsungImg,
    themeColor: '#0284C7',
    bgGradient: 'linear-gradient(135deg, rgba(2, 132, 199, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)',
    codeHtml: `<certificate id="samsung">
  <h1>Samsung Innovation Campus</h1>
  <issuer>Samsung Electronics</issuer>
  <recipient>Sudharsan</recipient>
  <curriculum>AI & Future Technologies</curriculum>
  <score>Top Tier Performer</score>
  <status>Official Certification</status>
</certificate>`,
    codeMeta: `<!-- credential: verified -->
<!-- format: image/jpeg -->
<!-- issuer: Samsung Innovation Campus -->
<!-- recipient: Sudharsan -->`
  },
  {
    id: 'crm',
    number: '03',
    title: 'Zoho CRM Developer',
    issuer: 'Zoho Corporation',
    category: 'Cloud CRM',
    pill: 'ZOHO CRM',
    tag: 'Automation, Workflows & Deluge',
    isImage: true,
    file: crmImg,
    themeColor: '#EA580C',
    bgGradient: 'linear-gradient(135deg, rgba(234, 88, 12, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)',
    codeHtml: `<certificate id="zoho-crm">
  <h1>Zoho CRM Developer</h1>
  <issuer>Zoho Corporation</issuer>
  <recipient>Sudharsan</recipient>
  <skills>Deluge, Custom Functions, Blueprint</skills>
  <integration>CRM API & Webhooks</integration>
  <status>Certified Professional</status>
</certificate>`,
    codeMeta: `<!-- credential: verified -->
<!-- format: image/jpeg -->
<!-- issuer: Zoho Ecosystem -->
<!-- recipient: Sudharsan -->`
  },
  {
    id: 'crmui',
    number: '04',
    title: 'CRM UI Architecture',
    issuer: 'Zoho Ecosystem',
    category: 'Enterprise UI',
    pill: 'CRM UI',
    tag: 'Client Portals & Custom Interfaces',
    isImage: true,
    file: crmUiImg,
    themeColor: '#2563EB',
    bgGradient: 'linear-gradient(135deg, rgba(37, 99, 235, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)',
    codeHtml: `<certificate id="crm-ui">
  <h1>CRM UI Architecture</h1>
  <issuer>Zoho Ecosystem</issuer>
  <recipient>Sudharsan</recipient>
  <focus>Responsive Dashboards & Widgets</focus>
  <architecture>Component-Driven UI</architecture>
  <status>Certified Specialist</status>
</certificate>`,
    codeMeta: `<!-- credential: verified -->
<!-- format: image/jpeg -->
<!-- issuer: Zoho Creator / CRM -->
<!-- recipient: Sudharsan -->`
  },
  {
    id: 'adobe',
    number: '05',
    title: 'Adobe Creative Suite',
    issuer: 'Adobe',
    category: 'Visual Design',
    pill: 'ADOBE',
    tag: 'Vector Graphics & Digital Layouts',
    isImage: true,
    file: adobeImg,
    themeColor: '#DC2626',
    bgGradient: 'linear-gradient(135deg, rgba(220, 38, 38, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)',
    codeHtml: `<certificate id="adobe">
  <h1>Adobe Creative Suite</h1>
  <issuer>Adobe</issuer>
  <recipient>Sudharsan</recipient>
  <expertise>Vector Design, Digital Layouts</expertise>
  <portfolio>High-Fidelity Assets</portfolio>
  <status>Validated Competency</status>
</certificate>`,
    codeMeta: `<!-- credential: verified -->
<!-- format: image/jpeg -->
<!-- issuer: Adobe Certified -->
<!-- recipient: Sudharsan -->`
  },
  {
    id: 'hack2skills',
    number: '06',
    title: 'Hack2skill National Hackathon',
    issuer: 'Hack2skill',
    category: 'Hackathon',
    pill: 'HACKATHON',
    tag: 'Rapid Prototyping & Product Sprint',
    isImage: true,
    file: hack2skillsImg,
    themeColor: '#059669',
    bgGradient: 'linear-gradient(135deg, rgba(5, 150, 105, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)',
    codeHtml: `<certificate id="hack2skills">
  <h1>Hack2skill National Hackathon</h1>
  <issuer>Hack2skill</issuer>
  <recipient>Sudharsan</recipient>
  <achievement>Team Innovation & MVP Build</achievement>
  <duration>48h Sprint</duration>
  <status>Official Laureate</status>
</certificate>`,
    codeMeta: `<!-- credential: verified -->
<!-- format: image/jpeg -->
<!-- issuer: Hack2skill -->
<!-- recipient: Sudharsan -->`
  },
  {
    id: 'dbms',
    number: '07',
    title: 'Oracle Database Design',
    issuer: 'Oracle Academy',
    category: 'Database Management',
    pill: 'ORACLE',
    tag: 'Relational Modeling & SQL Architecture',
    isImage: false,
    file: dbmsPdf,
    themeColor: '#E11D48',
    bgGradient: 'linear-gradient(135deg, rgba(225, 29, 72, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)',
    codeHtml: `<certificate id="oracle-dbms">
  <h1>Database Design & DBMS</h1>
  <issuer>Oracle Academy</issuer>
  <recipient>Sudharsan</recipient>
  <skills>Relational Schema, SQL, Normalization</skills>
  <credential>Award of Completion</credential>
  <status>Accredited by Oracle</status>
</certificate>`,
    codeMeta: `<!-- credential: verified -->
<!-- format: application/pdf -->
<!-- issuer: Oracle Academy -->
<!-- recipient: Sudharsan -->`
  },
  {
    id: 'unstop-figma',
    number: '08',
    title: 'Unstop Figma Excellence',
    issuer: 'Unstop',
    category: 'Design Championship',
    pill: 'UNSTOP',
    tag: 'UI/UX Design Championship & Prototyping',
    isImage: false,
    file: unstopFigmaPdf,
    themeColor: '#8B5CF6',
    bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)',
    codeHtml: `<certificate id="unstop-figma">
  <h1>Certificate of Excellence — Figma</h1>
  <issuer>Unstop</issuer>
  <recipient>Sudharsan</recipient>
  <distinction>National Design Competition</distinction>
  <rank>High Excellence Honor</rank>
  <status>Verified Certificate</status>
</certificate>`,
    codeMeta: `<!-- credential: verified -->
<!-- format: application/pdf -->
<!-- issuer: Unstop Awards -->
<!-- recipient: Sudharsan -->`
  },
  {
    id: 'html5',
    number: '09',
    title: 'HTML5 Web Architecture',
    issuer: 'Web Standards Org',
    category: 'Web Tech',
    pill: 'HTML5',
    tag: 'Semantic DOM, A11y & Web Architecture',
    isImage: false,
    file: html5Pdf,
    themeColor: '#F97316',
    bgGradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)',
    codeHtml: `<certificate id="html5">
  <h1>HTML5 Web Architecture</h1>
  <issuer>Web Standards Institute</issuer>
  <recipient>Sudharsan</recipient>
  <topics>Semantic Tags, Canvas, A11y, Audio/Video</topics>
  <mastery>100% Comprehensive</mastery>
  <status>Certified Developer</status>
</certificate>`,
    codeMeta: `<!-- credential: verified -->
<!-- format: application/pdf -->
<!-- issuer: Web Standards -->
<!-- recipient: Sudharsan -->`
  },
  {
    id: 'css',
    number: '10',
    title: 'CSS3 Modern Styling & Grid',
    issuer: 'Web Standards Org',
    category: 'Frontend Styling',
    pill: 'CSS3',
    tag: 'Flexbox, CSS Grid Systems & Animations',
    isImage: false,
    file: cssPdf,
    themeColor: '#3B82F6',
    bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)',
    codeHtml: `<certificate id="css3">
  <h1>CSS3 Modern Styling & Grid</h1>
  <issuer>Web Standards Institute</issuer>
  <recipient>Sudharsan</recipient>
  <capabilities>Responsive Media, Keyframes, Flex/Grid</capabilities>
  <performance>Optimized Render Engine</performance>
  <status>Certified Specialist</status>
</certificate>`,
    codeMeta: `<!-- credential: verified -->
<!-- format: application/pdf -->
<!-- issuer: Web Standards -->
<!-- recipient: Sudharsan -->`
  },
  {
    id: 'javascript',
    number: '11',
    title: 'JavaScript ES6+ Engineering',
    issuer: 'Software Engineering Org',
    category: 'Programming',
    pill: 'JAVASCRIPT',
    tag: 'Async/Await, Functional Paradigms & DOM',
    isImage: false,
    file: jsPdf,
    themeColor: '#FACC15',
    bgGradient: 'linear-gradient(135deg, rgba(250, 204, 21, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)',
    codeHtml: `<certificate id="javascript">
  <h1>JavaScript ES6+ Engineering</h1>
  <issuer>Software Engineering Academy</issuer>
  <recipient>Sudharsan</recipient>
  <curriculum>ESNext, Event Loop, Closures, APIs</curriculum>
  <grade>Distinction</grade>
  <status>Certified Engineer</status>
</certificate>`,
    codeMeta: `<!-- credential: verified -->
<!-- format: application/pdf -->
<!-- issuer: Software Engineering -->
<!-- recipient: Sudharsan -->`
  },
  {
    id: 'rbi',
    number: '12',
    title: 'RBI 90 National Quiz',
    issuer: 'Reserve Bank of India',
    category: 'National Competition',
    pill: 'RBI',
    tag: 'Financial Systems & National Economy',
    isImage: false,
    file: rbiPdf,
    themeColor: '#10B981',
    bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)',
    codeHtml: `<certificate id="rbi-quiz">
  <h1>RBI 90 National Quiz</h1>
  <issuer>Reserve Bank of India</issuer>
  <recipient>Sudharsan</recipient>
  <category>National Financial & Economic Awareness</category>
  <credential>Certificate of Participation</credential>
  <status>National Recognition</status>
</certificate>`,
    codeMeta: `<!-- credential: verified -->
<!-- format: application/pdf -->
<!-- issuer: Reserve Bank of India -->
<!-- recipient: Sudharsan -->`
  },
  {
    id: 'sudhan',
    number: '13',
    title: 'Technical Certification: Sudharsan',
    issuer: 'Academic & Tech Programs',
    category: 'Full-Stack Excellence',
    pill: 'TECHNICAL',
    tag: 'Full-Stack Development & Academic Distinction',
    isImage: false,
    file: sudhanPdf,
    themeColor: '#6366F1',
    bgGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)',
    codeHtml: `<certificate id="sudharsan-distinction">
  <h1>Technical Certification: Sudharsan</h1>
  <issuer>Academic & Technical Institutions</issuer>
  <recipient>Sudharsan</recipient>
  <rollNumber>24104070</rollNumber>
  <field>Computer Science & Engineering</field>
  <status>Verified Academic Distinction</status>
</certificate>`,
    codeMeta: `<!-- credential: verified -->
<!-- format: application/pdf -->
<!-- candidate: Sudharsan -->
<!-- id: 24104070 -->`
  }
];

const palette = ['#2244C8', '#3D5EE1', '#5575F0', '#7491F7', '#A0B5FA', '#D4E0FD', '#F0F5FF'];

// 32-bit Integer Hash for particle dissolve
function hash(a, b, c) {
  let h = (Math.imul(a, 374761393) + Math.imul(b, 668265263) + Math.imul(c, 2147483647)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) | 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

const CertificatesScanner = ({ isEntered: propIsEntered, isExiting: propIsExiting }) => {
  const stageRef = useRef(null);
  const beltRef = useRef(null);
  const fxCanvasRef = useRef(null);
  const badgeNumRef = useRef(null);
  const badgePctRef = useRef(null);

  const cardRefs = useRef([]);
  const codeRefs = useRef([]);

  const [internalEntered, setInternalEntered] = useState(false);
  const isEntered = propIsEntered !== undefined ? propIsEntered : internalEntered;
  const isExiting = Boolean(propIsExiting);

  useEffect(() => {
    if (!stageRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInternalEntered(true);
      }
    }, { threshold: 0.15 });

    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stageEl = stageRef.current;
    const beltEl = beltRef.current;
    const fxCanvas = fxCanvasRef.current;
    const badgeNum = badgeNumRef.current;
    const badgePct = badgePctRef.current;

    if (!stageEl || !beltEl || !fxCanvas || !badgeNum || !badgePct) {
      return;
    }

    const ctx = fxCanvas.getContext('2d');
    if (!ctx) return;

    let cw = 0;
    let ch = 0;
    let gap = 0;
    let span = 0;
    let period = 0;
    let Lx = 0;
    let beltWidth = 0;
    let beltHeight = 0;
    let winW = window.innerWidth;
    let off = 0;
    let vel = 0;
    let autoSpeed = 0;
    let hover = 0;
    let isHovered = false;
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerTime = 0;
    let dragVel = 0;

    let currentCrossingCardIndex = -1;
    const sparks = [];
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      const stageRect = stageEl.getBoundingClientRect();
      winW = stageRect.width || window.innerWidth;

      const isMobile = winW < 768;

      if (cardRefs.current[0]) {
        const rect = cardRefs.current[0].getBoundingClientRect();
        if (rect.width > 20) cw = rect.width;
        if (rect.height > 20) ch = rect.height;
      }

      if (!cw || cw <= 20) {
        cw = winW * (isMobile ? 0.84 : 0.46);
      }
      if (!ch || ch <= 20) {
        ch = window.innerHeight * (isMobile ? 0.54 : 0.52);
      }

      // Compute gap in px from --gap with responsive fallback
      const testDiv = document.createElement('div');
      testDiv.style.width = 'var(--gap)';
      testDiv.style.position = 'absolute';
      testDiv.style.visibility = 'hidden';
      stageEl.appendChild(testDiv);
      let measuredGap = testDiv.getBoundingClientRect().width;
      stageEl.removeChild(testDiv);

      if (!measuredGap || measuredGap <= 10) {
        const computedStyle = getComputedStyle(stageEl);
        const gapValStr = computedStyle.getPropertyValue('--gap').trim();
        if (gapValStr.endsWith('vw')) {
          measuredGap = (parseFloat(gapValStr) / 100) * winW;
        } else if (gapValStr.endsWith('px')) {
          measuredGap = parseFloat(gapValStr);
        }
      }

      gap = measuredGap || (winW * (isMobile ? 0.45 : 0.34));

      span = cw + gap;
      period = span * CERTIFICATES_DATA.length;
      beltWidth = beltEl.clientWidth || winW;
      beltHeight = beltEl.clientHeight || (isMobile ? winW * 0.54 : window.innerHeight * 0.52);
      Lx = beltWidth / 2;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // Belt FX canvas
      fxCanvas.width = Math.round(beltWidth * dpr);
      fxCanvas.height = Math.round(beltHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      autoSpeed = isReducedMotion ? 0 : -0.075 * winW;
    }

    resize();
    window.addEventListener('resize', resize);

    // Initial belt offset
    off = Lx - 0.62 * (cw || 300);
    vel = autoSpeed;

    const onMouseEnter = () => { isHovered = true; };
    const onMouseLeave = () => { isHovered = false; };

    const onPointerDown = (e) => {
      if (e.target.closest('.card-cert-cta')) return;
      isDragging = true;
      beltEl.setPointerCapture(e.pointerId);
      beltEl.classList.add('grabbing');
      lastPointerX = e.clientX;
      lastPointerTime = performance.now();
      dragVel = 0;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const now = performance.now();
      const dtPointer = Math.max(0.008, (now - lastPointerTime) / 1000);
      const dx = e.clientX - lastPointerX;
      off += dx;
      const instVel = dx / dtPointer;
      dragVel = instVel * 0.8 + dragVel * 0.2;
      lastPointerX = e.clientX;
      lastPointerTime = now;
    };

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      beltEl.classList.remove('grabbing');
      vel = dragVel;
      try {
        beltEl.releasePointerCapture(e.pointerId);
      } catch {
        // pointer capture release ignored
      }
    };

    const onWheel = (e) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;
      // Scroll the cards horizontally along the conveyor belt and prevent the page from jumping
      vel -= delta * 3.5;
      e.preventDefault();
    };

    beltEl.addEventListener('mouseenter', onMouseEnter);
    beltEl.addEventListener('mouseleave', onMouseLeave);
    beltEl.addEventListener('pointerdown', onPointerDown);
    beltEl.addEventListener('pointermove', onPointerMove);
    beltEl.addEventListener('pointerup', endDrag);
    beltEl.addEventListener('pointercancel', endDrag);
    beltEl.addEventListener('wheel', onWheel, { passive: false });

    // Draw Haze & Dithered Particles
    function drawCardDissolve(x, cut, cardIndex, nowSec) {
      const cardTop = 70;
      const rightEdge = x + cw;

      // 1. Haze
      const hazeW = Math.min(150, rightEdge - Lx);
      if (hazeW > 0) {
        const grad = ctx.createLinearGradient(Lx, 0, Lx + 150, 0);
        grad.addColorStop(0, 'rgba(61, 94, 225, 0.45)');
        grad.addColorStop(1, 'rgba(61, 94, 225, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(Lx, cardTop, hazeW, ch);
      }

      // 2. Dithered particles
      const R = 0.3 * cw;
      const minGx = Math.max(0, Math.floor(cut / 3));
      const maxGx = Math.min(Math.floor(cw / 3), Math.ceil((cut + R) / 3));
      const rowsCount = Math.floor(ch / 3);

      for (let gx = minGx; gx <= maxGx; gx++) {
        const sx = x + gx * 3;
        const d = sx - Lx;
        if (d < 0 || d > R) continue;

        const p = Math.pow(1 - d / R, 1.7);

        for (let row = -5; row <= rowsCount + 5; row++) {
          let threshold;
          if (row >= 0 && row <= rowsCount) {
            threshold = p * 0.92;
          } else {
            const dist = row < 0 ? -row : (row - rowsCount);
            threshold = p * 0.16 * Math.max(0, 1 - dist / 5);
          }

          if (threshold <= 0) continue;

          const h = hash(gx, row, cardIndex);
          if (h >= threshold) continue;

          if (!isReducedMotion) {
            const tw = hash(gx, row, (Math.floor(nowSec * 9) + 97) | 0);
            if (tw < 0.22) continue;
          }

          const h2 = hash(row, gx, cardIndex + 31);
          let color;
          if (d <= 10) {
            color = palette[4 + Math.floor(h2 * 3)];
          } else {
            color = palette[Math.floor(h2 * h2 * 7)];
          }

          const size = 1.1 + h2 * 1.7;
          let jx = 0;
          let jy = 0;
          if (!isReducedMotion) {
            jx = (hash(gx * 7, row, 13) - 0.5) * 1.6;
            jy = (hash(row * 7, gx, 17) - 0.5) * 1.6;
          }

          ctx.fillStyle = color;
          ctx.fillRect(sx + jx, cardTop + row * 3 + jy, size, size);
        }
      }

      // 3. Free sparks
      if (!isReducedMotion) {
        for (let s = 0; s < 3; s++) {
          if (Math.random() < 0.7) {
            sparks.push({
              x: Lx + Math.random() * 30,
              y: cardTop - 10 + Math.random() * (ch + 20),
              vx: (-30 + Math.random() * 70) + vel * 0.6,
              vy: -25 + Math.random() * 50,
              size: 0.8 + Math.random() * 1.8,
              color: palette[Math.floor(Math.random() * palette.length)],
              totalLife: 0.3 + Math.random() * 0.8,
              age: 0
            });
          }
        }
      }
    }

    function drawSparks(dt) {
      for (let k = sparks.length - 1; k >= 0; k--) {
        const sp = sparks[k];
        sp.age += dt;
        if (sp.age >= sp.totalLife) {
          sparks.splice(k, 1);
          continue;
        }

        sp.x += sp.vx * dt;
        sp.y += sp.vy * dt;

        const alpha = Math.min(1, (1 - sp.age / sp.totalLife) * 2.2);
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = sp.color;
        ctx.fillRect(sp.x, sp.y, sp.size, sp.size);
      }
      ctx.globalAlpha = 1;
    }

    // Main rAF Physics Loop
    let animId;
    let lastTime = performance.now();

    function frame(now) {
      animId = requestAnimationFrame(frame);
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const nowSec = now / 1000;

      if (!beltWidth || beltWidth <= 10) {
        resize();
      }
      if (isNaN(off)) {
        off = Lx - 0.62 * (cw || 300);
      }

      // Hover easing
      if (isHovered && !isDragging) {
        hover = Math.min(1, hover + 4 * dt);
      } else {
        hover = Math.max(0, hover - 4 * dt);
      }

      const targetSpeed = autoSpeed * (1 - 0.65 * hover);

      if (!isDragging) {
        vel += (targetSpeed - vel) * (1 - Math.exp(-2.2 * dt));
        off += vel * dt;
      }

      // Clear canvas fx
      ctx.clearRect(0, 0, beltWidth, beltHeight);

      // Track card positions and crossing card for badge
      let activeCrossingCard = null;
      let activeCardIndex = -1;

      for (let i = 0; i < CERTIFICATES_DATA.length; i++) {
        const x = mod(off + i * span + span, period) - span;
        const cut = Math.min(Math.max(Lx - x, 0), cw);

        const card = cardRefs.current[i];
        const code = codeRefs.current[i];

        if (card) {
          card.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;

          if (cut <= 0) {
            card.style.clipPath = 'none';
            card.style.maskImage = 'none';
            card.style.webkitMaskImage = 'none';
            card.style.visibility = 'visible';
          } else if (cut >= cw) {
            card.style.visibility = 'hidden';
            card.style.clipPath = 'inset(0 0 0 100%)';
          } else {
            card.style.visibility = 'visible';
            card.style.clipPath = `inset(0 0 0 ${cut.toFixed(2)}px round 0 1.6vw 1.6vw 0)`;
            const maskVal = `linear-gradient(90deg, transparent ${cut.toFixed(2)}px, #000 ${(cut + 26).toFixed(2)}px)`;
            card.style.webkitMaskImage = maskVal;
            card.style.maskImage = maskVal;
          }
        }

        if (code) {
          code.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
          if (cut <= 0) {
            code.style.visibility = 'hidden';
          } else {
            code.style.visibility = 'visible';
            const rightCut = Math.max(0, cw - cut);
            code.style.clipPath = `inset(0 ${rightCut.toFixed(2)}px 0 0)`;
          }
        }

        if (cut > 0 && cut < cw) {
          activeCrossingCard = CERTIFICATES_DATA[i];
          activeCardIndex = i;
        }

        if (cut > 0 && (x + cw) > Lx) {
          drawCardDissolve(x, cut, i, nowSec);
        }
      }

      // Update Free Sparks
      drawSparks(dt);

      // Update Counter Badge
      if (activeCrossingCard && activeCardIndex !== currentCrossingCardIndex) {
        currentCrossingCardIndex = activeCardIndex;
        badgeNum.textContent = `#${activeCrossingCard.number} ${activeCrossingCard.title}`;
        badgePct.textContent = activeCrossingCard.issuer;
      }
    }

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      beltEl.removeEventListener('mouseenter', onMouseEnter);
      beltEl.removeEventListener('mouseleave', onMouseLeave);
      beltEl.removeEventListener('pointerdown', onPointerDown);
      beltEl.removeEventListener('pointermove', onPointerMove);
      beltEl.removeEventListener('pointerup', endDrag);
      beltEl.removeEventListener('pointercancel', endDrag);
      beltEl.removeEventListener('wheel', onWheel);
    };
  }, []);

  useEffect(() => {
    if (isEntered) {
      window.dispatchEvent(new Event('resize'));
    }
  }, [isEntered]);

  return (
    <section
      id="certificates-scanner-section"
      className={`certificates-scanner-section ${isEntered ? 'is-entered' : ''} ${isExiting ? 'is-exiting' : ''}`}
      aria-label="Certifications & Learnings"
    >
      <div className="stage" ref={stageRef}>
        {/* Exit Vanish Stardust Particles Overlay */}
        {isExiting && (
          <div className="cert-vanish-dots-overlay" aria-hidden="true">
            {Array.from({ length: 36 }).map((_, dotI) => (
              <div
                key={dotI}
                className="vanish-dot-particle"
                style={{
                  left: `${(dotI * 27.3) % 100}%`,
                  top: `${(dotI * 31.7) % 100}%`,
                  '--dot-delay': `${(dotI % 8) * 0.05}s`,
                  '--dot-tx': `${((dotI % 2 === 0 ? 1 : -1) * (40 + (dotI % 5) * 16))}px`,
                  '--dot-ty': `${-50 - (dotI % 6) * 15}px`,
                  '--dot-scale': `${0.9 + (dotI % 4) * 0.35}`,
                }}
              />
            ))}
          </div>
        )}

        {/* The Scanner Line & Badge */}
        <div className="badge">
          <span className="badge-label">Verified Certifications &amp; Learnings</span>
          <div className="badge-pill">
            <div className="badge-num" ref={badgeNumRef}>#01 Figma UI/UX Design</div>
            <div className="badge-pct" ref={badgePctRef}>Figma</div>
          </div>
        </div>

        <div className="scan">
          <i className="scan-core" />
          <b className="scan-halo" />
        </div>

        {/* The Conveyor Belt */}
        <div className="belt" ref={beltRef}>
          {/* Layer 1: Code Twins */}
          <div className="codes">
            {CERTIFICATES_DATA.map((cert, idx) => (
              <div
                key={`code-${cert.id}`}
                className="code"
                ref={el => { codeRefs.current[idx] = el; }}
              >
                <div className="code-html">{cert.codeHtml}</div>
                <div className="code-meta">{cert.codeMeta}</div>
              </div>
            ))}
          </div>

          {/* Layer 2: Visual Certificate Cards */}
          <div className="cards">
            {CERTIFICATES_DATA.map((cert, idx) => (
              <div
                key={`card-${cert.id}`}
                className={`card card-cert ${cert.isImage ? 'card-cert-image' : 'card-cert-pdf'}`}
                ref={el => { cardRefs.current[idx] = el; }}
                style={{
                  backgroundImage: cert.isImage ? `url('${cert.file}')` : 'none',
                  background: !cert.isImage ? cert.bgGradient : undefined,
                }}
              >
                {/* Visual Overlay Vignette */}
                <div className="card-cert-veil" />

                {/* Top Certificate Header */}
                <header className="k-nav">
                  <div className="k-logo-group">
                    <img src={logoImg} alt="Sudhan Logo" className="k-logo-img" />
                    <span className="k-logo-text">Sudhan</span>
                  </div>
                  <ul className="k-menu">
                    <li className="k-pill">{cert.pill}</li>
                    <li>{cert.category}</li>
                  </ul>
                </header>

                {/* Bottom Metadata & Interactive Link */}
                <div className="card-cert-bottom">
                  <div className="card-cert-info">
                    <span className="card-cert-num">CERT #{cert.number} &middot; {cert.issuer}</span>
                    <h3 className="card-cert-title">{cert.title}</h3>
                    <p className="card-cert-desc">{cert.tag}</p>
                  </div>

                  <a
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-cert-cta"
                    title={`Open ${cert.title} certificate`}
                    onPointerDown={(e) => {
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (cert.file) {
                        window.open(cert.file, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    <span>View Certificate</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Layer 3: Canvas for Particle Dissolve, Haze, and Sparks */}
          <canvas className="fx" ref={fxCanvasRef} />
        </div>
      </div>
    </section>
  );
};

export default CertificatesScanner;
