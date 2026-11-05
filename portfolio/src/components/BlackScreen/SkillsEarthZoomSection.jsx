import { useEffect, useRef, useState, useCallback } from 'react';
import './SkillsEarthZoomSection.css';
import SkillsEcosystem from './SkillsEcosystem';
import CertificatesScanner from './CertificatesScanner';

/**
 * SkillsEarthZoomSection
 * Scroll-Driven Camera Zoom into Center Earth:
 * 1. User arrives at the Skills Ecosystem with the central glowing Earth origin.
 * 2. As user scrolls down, camera zooms directly INTO that center Earth.
 * 3. Surrounding skill tiles disperse outward and fly past camera.
 * 4. Center Earth scales exponentially, then completely vanishes.
 * 5. ONLY AFTER the center has vanished, the Certificates Section is shown!
 */
export default function SkillsEarthZoomSection({ scrollContainerRef, zoomProgress: propZoomProgress }) {
  const sectionRef = useRef(null);
  const [internalZoomProgress, setInternalZoomProgress] = useState(0);

  // Synchronized scroll progress: driven either directly by parent container or internal listener
  const zoomProgress = propZoomProgress !== undefined ? propZoomProgress : internalZoomProgress;

  const handleScroll = useCallback(() => {
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

    setInternalZoomProgress(p);
  }, [scrollContainerRef]);

  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [scrollContainerRef, handleScroll]);

  // Animation timeline:
  // p: 0.00 -> 0.15 : Skills Ecosystem normal view
  // p: 0.15 -> 0.48 : Camera zooms into center Earth, surrounding chips fly outward
  // p: 0.42 -> 0.54 : Center Earth expands & completely fades out
  // p >= 0.54       : Center Earth & skills layer are COMPLETELY VANISHED!
  // p: 0.54 -> 0.80 : ONLY Certificate Section is shown (isolated, no previous scroll)
  // p >= 0.80       : EXIT SCROLL ANIMATION! Certificates section smoothly vanishes into stardust particles!

  const isSkillsVanished = zoomProgress >= 0.54;
  const skillsOpacity = zoomProgress <= 0.15
    ? 1
    : zoomProgress < 0.54
      ? Math.max(0, 1 - (zoomProgress - 0.15) / 0.38)
      : 0;

  // Atmospheric portal flare burst during the zoom-through transition
  const flareOpacity = (zoomProgress >= 0.40 && zoomProgress <= 0.54)
    ? Math.sin(((zoomProgress - 0.40) / 0.14) * Math.PI) * 0.95
    : 0;

  // Certificates section ONLY shown strictly after center Earth has vanished (p >= 0.54)
  const isCertVisible = zoomProgress >= 0.54 && zoomProgress < 0.98;
  const isCertExiting = zoomProgress >= 0.80;

  let certOpacity = 0;
  let certScale = '0.92';

  if (zoomProgress >= 0.54 && zoomProgress < 0.80) {
    // Normal entry & display phase
    const enterP = Math.min(1, Math.max(0, (zoomProgress - 0.54) / 0.14));
    certOpacity = enterP;
    certScale = (0.92 + enterP * 0.08).toFixed(3);
  } else if (zoomProgress >= 0.80) {
    // Exit scroll animation phase
    const exitP = Math.min(1, Math.max(0, (zoomProgress - 0.80) / 0.16));
    certOpacity = Math.max(0, 1 - exitP);
    certScale = (1 + exitP * 0.12).toFixed(3);
  }

  const isCertEntered = zoomProgress >= 0.54;

  return (
    <section
      ref={sectionRef}
      id="skills-ecosystem-section"
      className="skills-earth-zoom-section"
      aria-label="Skills Ecosystem & Verified Certificates"
    >
      {/* Anchor for navbar "Certifications" button smooth jump */}
      <div id="certificates-scanner-target" className="cert-scroll-target" />

      {/* Pinned 100vh Sticky Viewport Stage */}
      <div className="skills-earth-zoom-stage">

        {/* 1. Skills Ecosystem Layer (zooms in on scroll, then vanishes) */}
        <div
          className="skills-zoom-layer"
          style={{
            opacity: isSkillsVanished ? 0 : skillsOpacity,
            visibility: isSkillsVanished ? 'hidden' : 'visible',
            pointerEvents: isSkillsVanished || zoomProgress > 0.12 ? 'none' : 'auto',
          }}
        >
          <SkillsEcosystem zoomProgress={zoomProgress} />
        </div>

        {/* 2. Hyperspace Earth Atmosphere Portal Flare (brief bloom, then completely removed) */}
        {flareOpacity > 0.01 && (
          <div
            className="earth-zoom-portal-flare"
            aria-hidden="true"
            style={{
              opacity: flareOpacity.toFixed(3),
            }}
          >
            <div className="portal-flare-core" />
            <div className="portal-flare-ring ring-1" />
            <div className="portal-flare-ring ring-2" />
          </div>
        )}

        {/* 3. Certificates Section (ONLY shown after center Earth has vanished, with exit animation) */}
        <div
          className={`certificates-zoom-reveal-wrap ${isCertVisible ? 'is-visible' : ''}`}
          style={{
            opacity: certOpacity.toFixed(3),
            transform: `scale(${certScale})`,
            visibility: isCertVisible ? 'visible' : 'hidden',
            pointerEvents: isCertVisible && !isCertExiting ? 'auto' : 'none',
          }}
        >
          <CertificatesScanner isEntered={isCertEntered} isExiting={isCertExiting} />
        </div>

      </div>
    </section>
  );
}
