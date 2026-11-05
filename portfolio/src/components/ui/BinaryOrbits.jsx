import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Binary Orbits - React Bits Pro
 * A tilted spiral galaxy of stars streaming through its dynamic arms.
 *
 * Supports differential rotation, tilt, roll, OKLab-style color ramp,
 * hover wake, and click ripple density waves.
 */
export const BinaryOrbits = ({
  colors = ['#7B4DFF', '#FFC2EE'],
  backgroundColor = 'transparent',
  mode = 'auto',
  stars = 55000,
  starSize = 1.7,
  sparkle = 0.5,
  arms = 3,
  twist = 3.5,
  armStrength = 0.5,
  dust = 0.5,
  core = 1.0,
  coreSize = 0.07,
  innerVoid = 0.0,
  thickness = 0.02,
  tilt = 62,
  roll = -8,
  scale = 1.0,
  centerX = 0.5,
  centerY = 0.52,
  speed = 1.0,
  hoverWake = true,
  clickRipple = true,
  className = '',
  style = {},
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      0.1,
      2000
    );
    camera.position.z = 800;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (backgroundColor && backgroundColor !== 'transparent') {
      renderer.setClearColor(new THREE.Color(backgroundColor), 1);
    } else {
      renderer.setClearColor(0x000000, 0);
    }

    container.appendChild(renderer.domElement);

    // Color parsing (Blended in shader)
    const c1 = new THREE.Color(colors[0] || '#7B4DFF');
    const c2 = new THREE.Color(colors[1] || '#FFC2EE');

    // Generate Galaxy Star Particles
    const galaxyRadius = Math.min(width, height) * 0.95 * scale;
    const count = Math.max(2000, Math.min(stars, 150000));

    const positions = new Float32Array(count * 3);
    const starData = new Float32Array(count * 4); // [rNorm, baseAngle, speedMult, sparkleSeed]
    const starAttributes = new Float32Array(count * 4); // [armIndex, dustDarkness, thicknessOffset, sizeMod]

    // Gaussian random helper
    const randn = () => {
      let u = 0, v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };

    const numArms = Math.max(1, Math.min(arms, 8));

    for (let i = 0; i < count; i++) {
      // Radial distribution: denser towards core, exponential taper
      const u = Math.random();
      // Power curve for realistic galactic mass distribution
      const rNorm = innerVoid + (1.0 - innerVoid) * Math.pow(u, 1.45);
      const r = rNorm * galaxyRadius;

      // Arm assignment
      const armIdx = i % numArms;
      const armOffset = (armIdx / numArms) * Math.PI * 2;

      // Spiral twist: logarithmic spiral angle
      const spiralAngle = twist * Math.log(1.0 + 5.0 * rNorm);

      // Concentration along arm (armStrength) vs uniform halo scatter
      const isBulge = rNorm < coreSize * 1.5;
      const armScatter = (1.0 - armStrength * 0.85) * (0.15 + 0.45 * Math.pow(rNorm, 0.7));
      const scatterAngle = isBulge ? Math.random() * Math.PI * 2 : randn() * armScatter;

      const baseAngle = isBulge ? Math.random() * Math.PI * 2 : armOffset + spiralAngle + scatterAngle;

      // Disc vertical thickness: thicker near bulge
      const zSpread = galaxyRadius * thickness * (1.2 - 0.7 * rNorm) * randn();

      positions[i * 3 + 0] = Math.cos(baseAngle) * r;
      positions[i * 3 + 1] = Math.sin(baseAngle) * r;
      positions[i * 3 + 2] = zSpread;

      // Differential orbital rotation speed (inner stars orbit faster)
      const speedMult = 0.55 / (Math.pow(rNorm + 0.08, 0.52));
      const sparkleSeed = Math.random() < sparkle ? (1.3 + Math.random() * 1.8) : (0.75 + Math.random() * 0.4);

      starData[i * 4 + 0] = rNorm;
      starData[i * 4 + 1] = baseAngle;
      starData[i * 4 + 2] = speedMult;
      starData[i * 4 + 3] = sparkleSeed;

      // Dust lane: inner edge of arm has dust lanes
      const dustVal = !isBulge && scatterAngle < 0.0 ? Math.min(1.0, Math.abs(scatterAngle) * dust * 4.0) : 0.0;
      starAttributes[i * 4 + 0] = armIdx;
      starAttributes[i * 4 + 1] = dustVal;
      starAttributes[i * 4 + 2] = zSpread;
      starAttributes[i * 4 + 3] = isBulge ? (core * 1.4) : 1.0;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aStarData', new THREE.BufferAttribute(starData, 4));
    geometry.setAttribute('aStarAttrs', new THREE.BufferAttribute(starAttributes, 4));

    // Custom High-Performance Shader Material
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: mode === 'ink' ? THREE.NormalBlending : THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: speed * 0.35 },
        uStarSize: { value: starSize },
        uGalaxyRadius: { value: galaxyRadius },
        uTilt: { value: (tilt * Math.PI) / 180 },
        uRoll: { value: (roll * Math.PI) / 180 },
        uCenter: { value: new THREE.Vector2(centerX - 0.5, 0.5 - centerY) },
        uViewSize: { value: new THREE.Vector2(width, height) },
        uColor1: { value: c1 },
        uColor2: { value: c2 },
        uCore: { value: core },
        uCoreSize: { value: coreSize },
        uDust: { value: dust },
        uPointer: { value: new THREE.Vector2(-999, -999) },
        uPointerVel: { value: new THREE.Vector2(0, 0) },
        uRipplePos: { value: new THREE.Vector2(-999, -999) },
        uRippleTime: { value: -999.0 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uSpeed;
        uniform float uStarSize;
        uniform float uGalaxyRadius;
        uniform float uTilt;
        uniform float uRoll;
        uniform vec2 uCenter;
        uniform vec2 uViewSize;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uCore;
        uniform float uCoreSize;
        uniform float uDust;
        uniform vec2 uPointer;
        uniform vec2 uPointerVel;
        uniform vec2 uRipplePos;
        uniform float uRippleTime;

        attribute vec4 aStarData;   // [rNorm, baseAngle, speedMult, sparkleSeed]
        attribute vec4 aStarAttrs;  // [armIdx, dustVal, zSpread, coreFactor]

        varying vec3 vColor;
        varying float vAlpha;
        varying float vSparkle;

        void main() {
          float rNorm = aStarData.x;
          float baseAngle = aStarData.y;
          float speedMult = aStarData.z;
          float sparkleSeed = aStarData.w;

          float dustVal = aStarAttrs.y;
          float zBase = aStarAttrs.z;
          float coreFactor = aStarAttrs.w;

          // Galactic orbital angle with differential speed
          float angle = baseAngle + uTime * uSpeed * speedMult;
          float r = rNorm * uGalaxyRadius;

          // Base disk coordinates
          vec3 p = vec3(cos(angle) * r, sin(angle) * r, zBase);

          // 1. Hover Wake Interaction:
          // Cursor creates a soft tidal wake perturbation that rotates with galaxy
          if (uPointer.x > -900.0) {
            float distToPointer = length(p.xy - uPointer);
            float wakeRadius = uGalaxyRadius * 0.22;
            if (distToPointer < wakeRadius) {
              float wakeStrength = (1.0 - distToPointer / wakeRadius);
              p.xy += uPointerVel * wakeStrength * 28.0;
            }
          }

          // 2. Click Ripple Density Wave:
          // Rings propagate outward compressing stars
          if (uRippleTime >= 0.0) {
            float dt = uTime - uRippleTime;
            if (dt >= 0.0 && dt < 4.0) {
              float rippleDist = length(p.xy - uRipplePos);
              float waveFront = dt * (uGalaxyRadius * 0.65);
              float dWave = rippleDist - waveFront;
              if (abs(dWave) < 90.0) {
                float waveFactor = sin(dWave * 0.09) * exp(-dt * 0.9) * 22.0;
                p.xy += normalize(p.xy - uRipplePos + vec2(0.001)) * waveFactor;
              }
            }
          }

          // 3. 3D Tilt and Roll Orientation
          // First roll around Z
          float cosRoll = cos(uRoll);
          float sinRoll = sin(uRoll);
          vec3 pRoll = vec3(
            p.x * cosRoll - p.y * sinRoll,
            p.x * sinRoll + p.y * cosRoll,
            p.z
          );

          // Then tilt around X
          float cosTilt = cos(uTilt);
          float sinTilt = sin(uTilt);
          vec3 pTilted = vec3(
            pRoll.x,
            pRoll.y * cosTilt - pRoll.z * sinTilt,
            pRoll.y * sinTilt + pRoll.z * cosTilt
          );

          // Apply center offset
          pTilted.x += uCenter.x * uViewSize.x;
          pTilted.y += uCenter.y * uViewSize.y;

          // Twinkle / Scintillation
          float twinkle = sin(uTime * 3.5 + sparkleSeed * 12.0) * 0.25 + 0.75;
          vSparkle = sparkleSeed * twinkle;

          // Size attenuation: stars nearer camera (higher pTilted.z) appear larger
          float zDepth = (pTilted.z / (uGalaxyRadius * 0.8));
          float depthScale = clamp(1.0 + zDepth * 0.35, 0.5, 1.8);
          gl_PointSize = uStarSize * vSparkle * depthScale;

          // Color blending: core burns white, inner disc is uColor1, outer arms blend to uColor2
          float colorRamp = smoothstep(0.05, 0.85, rNorm);
          vec3 starColor = mix(uColor1, uColor2, colorRamp);

          // Central bulge burn toward radiant white
          float coreBurn = smoothstep(uCoreSize * 2.2, 0.0, rNorm) * uCore;
          starColor = mix(starColor, vec3(1.0, 0.98, 0.95), coreBurn * 0.85);

          // Dust lane absorption
          starColor *= (1.0 - dustVal * uDust * 0.65);

          vColor = starColor;
          vAlpha = clamp(0.35 + 0.65 * (1.0 - rNorm * 0.45) * coreFactor, 0.15, 1.0);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pTilted, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        varying float vSparkle;

        void main() {
          // Circular particle with soft Gaussian falloff
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;

          // Sharp bright core + soft glowing corona
          float coreGlow = smoothstep(0.18, 0.0, dist);
          float haloGlow = smoothstep(0.5, 0.0, dist);
          float intensity = (coreGlow * 1.5 + haloGlow * 0.7) * vAlpha;

          gl_FragColor = vec4(vColor + vec3(coreGlow * 0.4), intensity);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Interactive pointer wake & click ripple handling
    let lastPointerX = 0;
    let lastPointerY = 0;
    let pointerVelX = 0;
    let pointerVelY = 0;

    const handlePointerMove = (e) => {
      if (!hoverWake) return;
      const rect = container.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      // Convert to scene centered coordinate
      const sceneX = px - width / 2 - (centerX - 0.5) * width;
      const sceneY = -(py - height / 2) - (0.5 - centerY) * height;

      pointerVelX = (sceneX - lastPointerX) * 0.35;
      pointerVelY = (sceneY - lastPointerY) * 0.35;
      lastPointerX = sceneX;
      lastPointerY = sceneY;

      material.uniforms.uPointer.value.set(sceneX, sceneY);
      material.uniforms.uPointerVel.value.set(pointerVelX, pointerVelY);
    };

    const handlePointerLeave = () => {
      material.uniforms.uPointer.value.set(-999, -999);
      material.uniforms.uPointerVel.value.set(0, 0);
    };

    const handleClick = (e) => {
      if (!clickRipple) return;
      const rect = container.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      const sceneX = px - width / 2 - (centerX - 0.5) * width;
      const sceneY = -(py - height / 2) - (0.5 - centerY) * height;

      material.uniforms.uRipplePos.value.set(sceneX, sceneY);
      material.uniforms.uRippleTime.value = clock.getElapsedTime();
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);
    container.addEventListener('click', handleClick);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      material.uniforms.uViewSize.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const clock = new THREE.Clock();
    let animId = null;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsedTime;

      // Dampen pointer velocity for smooth wake relaxation
      pointerVelX *= 0.91;
      pointerVelY *= 0.91;
      material.uniforms.uPointerVel.value.set(pointerVelX, pointerVelY);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('click', handleClick);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [
    colors,
    backgroundColor,
    mode,
    stars,
    starSize,
    sparkle,
    arms,
    twist,
    armStrength,
    dust,
    core,
    coreSize,
    innerVoid,
    thickness,
    tilt,
    roll,
    scale,
    centerX,
    centerY,
    speed,
    hoverWake,
    clickRipple,
  ]);

  return (
    <div
      ref={containerRef}
      className={`binary-orbits-container ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: hoverWake || clickRipple ? 'auto' : 'none',
        ...style,
      }}
    />
  );
};

export default BinaryOrbits;
