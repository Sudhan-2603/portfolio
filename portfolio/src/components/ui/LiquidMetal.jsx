import { memo, forwardRef, useEffect, useRef } from 'react';
import './LiquidMetal.css';
import { cn } from '../../lib/utils';

/**
 * LiquidMetalShader
 * Self-contained WebGL2 / WebGL liquid metal ripple shader.
 * Delivers the liquid chrome wave reflection effect without requiring external heavy dependencies.
 */
function LiquidMetalShaderCanvas({
  colorBack = '#aaaaac',
  colorTint = '#ffffff',
  speed = 0.5,
  repetition = 4,
  distortion = 0.1,
  scale = 1,
  shiftRed = 0.3,
  shiftBlue = -0.3,
  style,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    // Helper to parse hex to rgb [0..1]
    const hexToRgb = (hex) => {
      let h = hex.replace('#', '');
      if (h.length === 3) h = h.split('').map((c) => c + c).join('');
      const num = parseInt(h, 16);
      return [(num >> 16) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
    };

    const backRgb = hexToRgb(colorBack);
    const tintRgb = hexToRgb(colorTint);

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_colorBack;
      uniform vec3 u_colorTint;
      uniform float u_speed;
      uniform float u_repetition;
      uniform float u_distortion;
      uniform float u_scale;
      uniform float u_shiftRed;
      uniform float u_shiftBlue;

      void main() {
        vec2 uv = gl_FragCoord.xy / max(u_resolution.xy, vec2(1.0));
        vec2 p = (uv - 0.5) * u_scale;
        p.x *= u_resolution.x / max(u_resolution.y, 1.0);

        // 45 degree rotation
        float rad = 0.785398;
        mat2 rot = mat2(cos(rad), -sin(rad), sin(rad), cos(rad));
        p = rot * p;

        float t = u_time * u_speed;

        // Flowing chrome wave distortion
        vec2 q = p;
        for (int i = 1; i <= 3; i++) {
          float fi = float(i);
          q.x += u_distortion * sin(fi * q.y + t + fi * 0.85);
          q.y += u_distortion * cos(fi * q.x - t * 0.95 + fi * 0.55);
        }

        float waves = sin(q.x * u_repetition * 3.14159 + t) * cos(q.y * u_repetition * 3.14159 - t);
        float spec = pow(clamp(waves * 0.5 + 0.5, 0.0, 1.0), 3.5);
        float chrome = sin(waves * 6.28318 + t * 0.5) * 0.5 + 0.5;
        chrome = pow(chrome, 1.7);

        vec3 col = mix(u_colorBack, u_colorTint, clamp(chrome * 0.85 + spec * 0.65, 0.0, 1.0));
        col.r += u_shiftRed * sin(q.x * 4.5 + t) * 0.12;
        col.b += u_shiftBlue * cos(q.y * 4.5 - t) * 0.12;

        gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
      }
    `;

    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    // Full quad buffer
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uBack = gl.getUniformLocation(program, 'u_colorBack');
    const uTint = gl.getUniformLocation(program, 'u_colorTint');
    const uSpd = gl.getUniformLocation(program, 'u_speed');
    const uRep = gl.getUniformLocation(program, 'u_repetition');
    const uDist = gl.getUniformLocation(program, 'u_distortion');
    const uScale = gl.getUniformLocation(program, 'u_scale');
    const uRed = gl.getUniformLocation(program, 'u_shiftRed');
    const uBlue = gl.getUniformLocation(program, 'u_shiftBlue');

    gl.uniform3fv(uBack, backRgb);
    gl.uniform3fv(uTint, tintRgb);
    gl.uniform1f(uSpd, speed);
    gl.uniform1f(uRep, repetition);
    gl.uniform1f(uDist, distortion);
    gl.uniform1f(uScale, scale);
    gl.uniform1f(uRed, shiftRed);
    gl.uniform1f(uBlue, shiftBlue);

    let animationFrameId;
    let startTime = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const render = (now) => {
      resize();
      const elapsed = (now - startTime) * 0.001;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
    };
  }, [colorBack, colorTint, speed, repetition, distortion, scale, shiftRed, shiftBlue]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        border: 'none',
        ...style,
      }}
    />
  );
}

// ============================================================================
// LiquidMetal - Base shader wrapper component
// ============================================================================

export const LiquidMetal = memo(function LiquidMetal({
  colorBack = '#aaaaac',
  colorTint = '#ffffff',
  speed = 0.5,
  repetition = 4,
  distortion = 0.1,
  scale = 1,
  className,
  style,
}) {
  return (
    <div
      className={cn('liquid-metal-canvas-container absolute inset-0 z-0 overflow-hidden', className)}
      style={style}
    >
      <LiquidMetalShaderCanvas
        colorBack={colorBack}
        colorTint={colorTint}
        speed={speed}
        repetition={repetition}
        distortion={distortion}
        scale={scale}
      />
    </div>
  );
});

LiquidMetal.displayName = 'LiquidMetal';

// ============================================================================
// LiquidMetalButton - Premium button with liquid metal border effect
// ============================================================================

export const LiquidMetalButton = forwardRef(
  (
    {
      children,
      icon,
      borderWidth = 4,
      metalConfig,
      size = 'md',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn('liquid-metal-btn-wrap group', className)}
        {...props}
      >
        <div
          className="liquid-metal-border-box"
          style={{ padding: borderWidth }}
        >
          {/* Liquid Metal Border Layer */}
          <LiquidMetal
            colorBack={metalConfig?.colorBack ?? '#888888'}
            colorTint={metalConfig?.colorTint ?? '#ffffff'}
            speed={metalConfig?.speed ?? 0.4}
            repetition={metalConfig?.repetition ?? 4}
            distortion={metalConfig?.distortion ?? 0.15}
            scale={metalConfig?.scale ?? 1}
            className="liquid-metal-bg-layer"
          />

          {/* Inner Button Body */}
          <div className={cn('liquid-metal-inner-body', `size-${size}`)}>
            {icon && (
              <div className={cn('liquid-metal-icon-wrap', `icon-size-${size}`)}>
                <span className="liquid-metal-icon">{icon}</span>
              </div>
            )}
            <span className="liquid-metal-label">{children}</span>
          </div>
        </div>
      </button>
    );
  }
);

LiquidMetalButton.displayName = 'LiquidMetalButton';

export default LiquidMetalButton;

