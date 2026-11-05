import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import logoImg from '../assets/Logo-trans.png';

export default function LoadingScreen({ onComplete }) {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing reflection cube...');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isWhiteOut, setIsWhiteOut] = useState(false);

  // Animation state and triggers
  const animStateRef = useRef({
    phase: 'rotating', // 'rotating' | 'zooming' | 'done'
    zoomProgress: 0,
    cubeGroup: null,
    model: null,
    camera: null,
    renderer: null,
    baseScale: 1.0,
    basePosY: 0.08,
    targetMouse: { x: 0, y: 0 },
    currentMouse: { x: 0, y: 0 },
    onCompleteTriggered: false,
    modelLoaded: false,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // 2. Camera setup - Isometric perspective
    const width = container.clientWidth || window.innerWidth || 800;
    const height = container.clientHeight || window.innerHeight || 600;
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    const initialCamPos = new THREE.Vector3(0, 0.35, 4.2);
    camera.position.copy(initialCamPos);
    camera.lookAt(0, 0, 0);
    animStateRef.current.camera = camera;

    // 3. High Performance PBR WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);
    animStateRef.current.renderer = renderer;

    // 4. Photorealistic Studio Environment Map for Chrome & Glass Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envTexture = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    scene.environment = envTexture;

    // 5. Studio Lighting for Dynamic Specular Highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Key Light (cyan-tinted brilliant shine)
    const keyLight = new THREE.DirectionalLight(0xdbeafe, 3.5);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    // Rim Light (cool blue edge backlight)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    // Top Light (crisp specular bevel flare)
    const topLight = new THREE.PointLight(0xffffff, 3.0, 15);
    topLight.position.set(0, 4, 2);
    scene.add(topLight);

    // Core Fill Light (inner glowing reflection)
    const coreLight = new THREE.PointLight(0x0284c7, 3.5, 6);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // 6. Responsive Layout Helper (Calculates compact elegant scale for all viewports)
    const calculateResponsiveLayout = (w, h) => {
      const asp = w / h;
      let scale;
      let posY;

      if (w <= 420 || asp < 0.6) {
        // Very small mobile screens (iPhone SE, narrow viewports)
        scale = 0.68;
        posY = 0.32; // Elevated nicely above loading HUD
      } else if (w <= 600 || asp < 0.78) {
        // Standard mobile phones in portrait
        scale = 0.76;
        posY = 0.26;
      } else if (w <= 840 || asp < 1.0) {
        // Tablets / foldables / phablets
        scale = 0.88;
        posY = 0.16;
      } else if (h < 640) {
        // Landscape phones or short browser windows
        scale = 0.82;
        posY = 0.10;
      } else if (w >= 1600) {
        // Wide 2K / 4K displays
        scale = 1.15;
        posY = 0.08;
      } else {
        // Standard desktops
        scale = 1.02;
        posY = 0.08;
      }

      return { scale, posY };
    };

    const initialLayout = calculateResponsiveLayout(width, height);
    animStateRef.current.baseScale = initialLayout.scale;
    animStateRef.current.basePosY = initialLayout.posY;

    // 7. Reflection Cube Pivot Group
    const cubeGroup = new THREE.Group();
    // Start with small, responsive scale
    cubeGroup.scale.set(initialLayout.scale, initialLayout.scale, initialLayout.scale);
    cubeGroup.position.y = initialLayout.posY;

    // Slightly tilted isometric attitude
    const initialRotX = 0.35;
    const initialRotZ = -0.12;
    cubeGroup.rotation.x = initialRotX;
    cubeGroup.rotation.z = initialRotZ;
    scene.add(cubeGroup);
    animStateRef.current.cubeGroup = cubeGroup;

    // 8. Subtle ethereal cosmic particles orbiting around the cube
    const particleCount = 35;
    const particlePositions = [];
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.0 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      particlePositions.push(
        radius * Math.cos(phi) * Math.cos(theta),
        radius * Math.sin(phi),
        radius * Math.cos(phi) * Math.sin(theta)
      );
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.022,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 9. Load reflection_cube.glb
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/reflection_cube.glb',
      (gltf) => {
        const model = gltf.scene;

        // Auto-compute bounding box to perfectly center the model in its group
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);

        // Center model geometry at origin
        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;

        // Normalize base geometry to a clean unit cube (~1.0 unit)
        // Group scale then controls the elegant, responsive display size
        const maxDim = Math.max(size.x, size.y, size.z) || 1.0;
        const normScale = 1.05 / maxDim;
        model.scale.set(normScale, normScale, normScale);

        // Enhance materials for maximum reflection realism
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material.needsUpdate = true;
              child.material.envMapIntensity = 1.4;
              // Transmission / Glass material handling
              if (child.material.transmission && child.material.transmission > 0) {
                child.material.transparent = true;
                child.material.depthWrite = false;
                child.material.roughness = Math.min(child.material.roughness, 0.08);
                child.material.ior = 1.52;
              }
            }
          }
        });

        cubeGroup.add(model);
        animStateRef.current.model = model;
        animStateRef.current.modelLoaded = true;
      },
      undefined,
      (err) => {
        console.error('Error loading reflection_cube.glb:', err);
      }
    );

    // 10. Interactive mouse pointer parallax
    const handleMouseMove = (e) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      animStateRef.current.targetMouse.x = (e.clientX - halfW) / halfW;
      animStateRef.current.targetMouse.y = (e.clientY - halfH) / halfH;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 11. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();
    const blackColor = new THREE.Color(0x000000);
    const whiteColor = new THREE.Color(0xffffff);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();
      const state = animStateRef.current;

      // Soft mouse smoothing
      state.currentMouse.x += (state.targetMouse.x - state.currentMouse.x) * 0.05;
      state.currentMouse.y += (state.targetMouse.y - state.currentMouse.y) * 0.05;

      // Orbit ethereal dust particles
      if (particles) {
        particles.rotation.y += delta * 0.12;
        particles.rotation.x -= delta * 0.05;
      }

      if (state.phase === 'rotating') {
        // Continuous smooth cube rotation
        cubeGroup.rotation.y += delta * 0.95;

        // Subtle organic levitation breath around responsive basePosY
        const targetPosY = (state.basePosY || 0.08) + Math.sin(time * 2.2) * 0.035;
        cubeGroup.position.y = targetPosY;

        // Dynamic tilt with subtle cursor parallax
        cubeGroup.rotation.x = initialRotX + state.currentMouse.y * 0.14;
        cubeGroup.rotation.z = initialRotZ - state.currentMouse.x * 0.14;
      } else if (state.phase === 'zooming') {
        // Dramatic finale zoom into the reflection cube
        state.zoomProgress += delta * 1.45;
        const t = Math.min(state.zoomProgress, 1.0);
        const expoT = Math.pow(t, 2.3);

        // Accelerate rotation dive
        cubeGroup.rotation.y += delta * (1.2 + expoT * 5.0);

        // Camera flies straight into the cube core
        camera.position.z = THREE.MathUtils.lerp(initialCamPos.z, 0.01, expoT);
        camera.position.y = THREE.MathUtils.lerp(initialCamPos.y, state.basePosY || 0.0, expoT);

        // Cube dramatically expands from its responsive baseScale into viewport immersion
        const currentScale = THREE.MathUtils.lerp(state.baseScale || 1.0, 24.0, expoT);
        cubeGroup.scale.set(currentScale, currentScale, currentScale);

        // Smooth background fade to pure white flash
        scene.background.lerpColors(blackColor, whiteColor, expoT);

        // Trigger whiteout overlay
        if (expoT >= 0.32) {
          setIsWhiteOut(true);
        }

        // Dissolve meshes as camera punches through
        cubeGroup.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.transparent = true;
            child.material.opacity = Math.max(0, 1 - expoT * 1.25);
          }
        });

        // Handoff to main portfolio view
        if (t >= 0.95 && !state.onCompleteTriggered) {
          state.onCompleteTriggered = true;
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600);
          }, 250);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 12. Dynamic Auto-adjust Resize Handling for All Screen Sizes
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth || 800;
      const h = container.clientHeight || window.innerHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      // Auto-adjust scale and position dynamically
      const newLayout = calculateResponsiveLayout(w, h);
      animStateRef.current.baseScale = newLayout.scale;
      animStateRef.current.basePosY = newLayout.posY;

      if (animStateRef.current.phase === 'rotating' && cubeGroup) {
        cubeGroup.scale.set(newLayout.scale, newLayout.scale, newLayout.scale);
        cubeGroup.position.y = newLayout.posY;
      }
    };
    window.addEventListener('resize', handleResize);

    // 13. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }

      // Dispose Three.js resources
      pmremGenerator.dispose();
      envTexture.dispose();
      roomEnv.dispose();
      particleGeom.dispose();
      particleMat.dispose();

      cubeGroup.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });

      renderer.dispose();
    };
  }, [onComplete]);

  // Loading Progress Bar & Status Text Simulation
  useEffect(() => {
    const statuses = [
      { at: 0, text: 'Loading 3D reflection cube...' },
      { at: 28, text: 'Calibrating ray reflections & PBR...' },
      { at: 62, text: 'Refracting crystal matrix...' },
      { at: 90, text: 'Welcome to Sudharsan Portfolio...' },
    ];

    const TOTAL_DURATION_MS = 2600;
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(Math.round((elapsed / TOTAL_DURATION_MS) * 100), 100);
      setProgress(pct);

      const matching = [...statuses].reverse().find((s) => pct >= s.at);
      if (matching) {
        setStatusText(matching.text);
      }

      if (elapsed >= TOTAL_DURATION_MS) {
        clearInterval(interval);
        setStatusText('Entering Portfolio...');

        // Trigger 3D camera zoom finale into the reflection cube
        setTimeout(() => {
          if (animStateRef.current) {
            animStateRef.current.phase = 'zooming';
          }
        }, 150);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  // Quick skip handler
  const handleSkip = () => {
    if (animStateRef.current) {
      animStateRef.current.phase = 'zooming';
    }
  };

  const brandName = 'SUDHARSAN';

  return (
    <div className={`loading-screen ${isFadingOut ? 'fade-out' : ''}`}>
      {/* Pure White Flash Transition Overlay */}
      <div className={`loading-whiteout ${isWhiteOut ? 'active' : ''}`} />

      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="loading-canvas-container" />

      {/* Skip button in top right */}
      <button className="loading-skip-btn" onClick={handleSkip} title="Skip loading">
        Skip Intro &rarr;
      </button>

      {/* Loading HUD info */}
      <div className="loading-ui">
        <div className="loading-brand">
          <img src={logoImg} alt="Logo" className="loading-logo" />
          <h1 className="loader-letters">
            {brandName.split('').map((char, index) => (
              <span
                key={index}
                className="loader-letter"
                style={{ animationDelay: `${0.1 + index * 0.12}s` }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        <div className="loading-progress-bar-wrap">
          <div className="loading-progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <span className="loading-status-text">
          {statusText} &middot; {progress}%
        </span>
      </div>
    </div>
  );
}
