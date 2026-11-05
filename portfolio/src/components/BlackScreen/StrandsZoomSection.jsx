import { useEffect, useRef, useCallback } from 'react';
import './StrandsZoomSection.css';
import Strands from '../ui/Strands';
import GetInTouchSection from './GetInTouchSection';

/**
 * StrandsZoomSection
 * 
 * 1. Under Certification section, clean minimal presentation (no header texts).
 * 2. Camera set at top angle (rotateX ~56deg) looking down at the luminous Strands orb.
 * 3. On scroll, camera tilts down to 0deg and zooms deep into the core (scale up to 33x).
 * 4. Expands to full-screen white/paper screen with the Driftbar Meadow Footer (Get in touch section).
 * 5. Strictly Zero Borders Rule (border: none !important).
 */
export default function StrandsZoomSection({ scrollContainerRef, onScrollToTop }) {
  const sectionRef = useRef(null);
  const orbWrapRef = useRef(null);
  const whiteBgRef = useRef(null);
  const contentRef = useRef(null);
  const hintRef = useRef(null);

  const updateCameraScroll = useCallback(() => {
    const section = sectionRef.current;
    const container = scrollContainerRef?.current;
    if (!section || !container) return;

    const sectionRect = section.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const relativeTop = sectionRect.top - containerRect.top;
    const scrollDistance = section.offsetHeight - container.clientHeight;

    if (scrollDistance <= 0) return;

    const p = relativeTop <= 0
      ? Math.min(1, Math.max(0, -relativeTop / scrollDistance))
      : 0;

    // 1. Initial Top Angle Camera Rig (56deg pitch, -35px offset)
    const initialAngle = 56;
    const initialY = -35;
    const initialScale = 0.95;

    // Pitch down to 0deg over first ~60% of scroll
    const angleP = Math.min(1, p / 0.60);
    const currentAngle = (initialAngle * (1 - angleP)).toFixed(2);
    const currentY = (initialY * (1 - angleP)).toFixed(2);

    // Zoom deep into core filaments (accelerated power curve)
    const zoomProgress = Math.pow(p, 1.85);
    const currentScale = (initialScale + zoomProgress * 32).toFixed(3);

    if (orbWrapRef.current) {
      orbWrapRef.current.style.transform = `perspective(1000px) rotateX(${currentAngle}deg) translateY(${currentY}px) scale(${currentScale})`;
    }

    // 2. Full-Screen Pure White Background Bloom (p >= 0.48 -> 100% at p >= 0.75)
    if (whiteBgRef.current) {
      const whiteProgress = p < 0.48 ? 0 : Math.min(1, (p - 0.48) / 0.27);
      whiteBgRef.current.style.opacity = whiteProgress.toFixed(3);
    }

    // Hide black-theme capsule navbar as white section blooms
    if (container) {
      if (p >= 0.45) {
        container.classList.add('hide-black-capsule');
      } else {
        container.classList.remove('hide-black-capsule');
      }
    }

    // 3. Finale Driftbar Meadow Footer inside White Screen (p >= 0.72)
    if (contentRef.current) {
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      if (p > 0.72) {
        const contentP = Math.min(1, (p - 0.72) / 0.24);
        const translateY = isMobile ? '0' : ((1 - contentP) * 24).toFixed(1);
        contentRef.current.style.opacity = contentP.toFixed(3);
        contentRef.current.style.transform = `translateY(${translateY}px)`;
        contentRef.current.style.pointerEvents = contentP > 0.85 ? 'auto' : 'none';
      } else {
        contentRef.current.style.opacity = '0';
        contentRef.current.style.transform = isMobile ? 'translateY(0)' : 'translateY(24px)';
        contentRef.current.style.pointerEvents = 'none';
      }
    }

    // 4. Scroll prompt hint fades out on initial scroll
    if (hintRef.current) {
      const hintOpacity = Math.max(0, 1 - p * 6.0);
      hintRef.current.style.opacity = hintOpacity.toFixed(3);
    }
  }, [scrollContainerRef]);

  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    container.addEventListener('scroll', updateCameraScroll, { passive: true });
    window.addEventListener('resize', updateCameraScroll, { passive: true });

    updateCameraScroll();

    return () => {
      container.classList.remove('hide-black-capsule');
      container.removeEventListener('scroll', updateCameraScroll);
      window.removeEventListener('resize', updateCameraScroll);
    };
  }, [scrollContainerRef, updateCameraScroll]);

  const handleBackToTop = (e) => {
    e?.preventDefault?.();
    if (onScrollToTop) {
      onScrollToTop();
    } else if (scrollContainerRef?.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="strands-zoom-section" className="strands-zoom-section">
      <div className="strands-zoom-stage">

        {/* 3D Camera Rig with Initial Top Angle View */}
        <div className="strands-camera-rig">
          <div ref={orbWrapRef} className="strands-orb-3d-wrap">
            <Strands
              interactive
              clickPulse
              energy={0.7}
              glass={true}
              amplitude={1.1}
              speed={1.0}
            />
          </div>
        </div>

        {/* Full-Screen Pure White / Pale Paper Background Layer */}
        <div ref={whiteBgRef} className="strands-white-fullscreen-bg" />

        {/* Scroll down prompt hint (fades away on scroll) */}
        <div ref={hintRef} className="strands-scroll-hint">
          <span className="strands-scroll-hint-dot" />
          <span>Scroll to enter</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Portfolio Finale Get In Touch Section inside Full-Screen White Screen */}
        <div ref={contentRef} className="strands-finale-content">
          <GetInTouchSection onScrollToTop={handleBackToTop} />
        </div>

      </div>
    </section>
  );
}
