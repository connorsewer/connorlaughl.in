"use client";

import { Mesh, Program, Renderer, Texture, Triangle } from "ogl";
import { useEffect, useRef } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const vertex = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;

  // Hash-based dither, WebGL1 friendly. Stable per fragment, no array constants.
  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  // CSS object-cover behaviour: zooms-in to fill the canvas without stretching.
  vec2 coverUV(vec2 uv) {
    vec2 ratio = vec2(
      min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
      min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
    );
    return vec2(
      uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
  }

  void main() {
    vec2 uv = vUv;

    // Mouse swell — Gaussian falloff displaces UV toward the cursor.
    vec2 toMouse = uMouse - uv;
    float dist = length(toMouse * vec2(uResolution.x / uResolution.y, 1.0));
    float swell = exp(-dist * dist * 9.0) * 0.022 * uHover;
    uv += toMouse * swell;

    // Subtle ambient wave so the plate breathes even with no cursor.
    float wave = sin(uv.y * 80.0 + uTime * 0.6) * 0.0012;
    uv.x += wave;

    vec2 sampleUV = coverUV(uv);
    vec3 col = texture2D(uTexture, sampleUV).rgb;

    // Vignette toward the corners.
    vec2 cv = vUv - 0.5;
    float v = 1.0 - dot(cv, cv) * 0.55;
    col *= v;

    // Print-quality dither nudge on luminance.
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    float dither = hash12(gl_FragCoord.xy);
    float quantised = floor(lum * 32.0 + dither) / 32.0;
    col = mix(col, col * (quantised / max(lum, 0.001)), 0.16);

    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * Mouse-driven displacement plate. Renders only a <canvas>. Lives inside a
 * parent that supplies the frame, caption, and static <img> fallback. The
 * canvas fades in once the texture has loaded (data-gl-ready="true").
 */
export default function WebGLHero({ src, alt, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const wrap = canvas.parentElement;
    if (!wrap) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        canvas,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
        alpha: false,
        antialias: false,
      });
    } catch {
      // WebGL not available. Static fallback img stays visible underneath.
      return;
    }
    const gl = renderer.gl;
    gl.clearColor(7 / 255, 7 / 255, 7 / 255, 1);

    const texture = new Texture(gl, {
      generateMipmaps: false,
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
    });

    const mouse = { x: 0.5, y: 0.5 };
    const mouseTarget = { x: 0.5, y: 0.5 };
    let hover = 0;
    let hoverTarget = 0;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTexture: { value: texture },
        uMouse: { value: [mouse.x, mouse.y] },
        uTime: { value: 0 },
        uHover: { value: 0 },
        uResolution: { value: [1, 1] },
        uImageResolution: { value: [1, 1] },
      },
    });

    const geometry = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry, program });

    const imageEl = new Image();
    imageEl.crossOrigin = "anonymous";
    imageEl.onload = () => {
      texture.image = imageEl;
      program.uniforms.uImageResolution.value = [
        imageEl.naturalWidth,
        imageEl.naturalHeight,
      ];
      canvas.dataset.glReady = "true";
    };
    imageEl.src = src;

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      renderer.setSize(rect.width, rect.height);
      program.uniforms.uResolution.value = [rect.width, rect.height];
    }

    function onPointerMove(e: PointerEvent) {
      const rect = wrap!.getBoundingClientRect();
      mouseTarget.x = (e.clientX - rect.left) / rect.width;
      mouseTarget.y = 1 - (e.clientY - rect.top) / rect.height;
      hoverTarget = 1;
    }

    function onPointerLeave() {
      hoverTarget = 0;
      mouseTarget.x = 0.5;
      mouseTarget.y = 0.5;
    }

    const start = performance.now();
    let rafId = 0;
    let visible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(wrap);

    function frame() {
      if (visible) {
        mouse.x += (mouseTarget.x - mouse.x) * 0.08;
        mouse.y += (mouseTarget.y - mouse.y) * 0.08;
        hover += (hoverTarget - hover) * 0.06;
        program.uniforms.uMouse.value = [mouse.x, mouse.y];
        program.uniforms.uHover.value = hover;
        program.uniforms.uTime.value = (performance.now() - start) * 0.001;
        renderer.render({ scene: mesh });
      }
      rafId = requestAnimationFrame(frame);
    }

    resize();
    rafId = requestAnimationFrame(frame);

    window.addEventListener("resize", resize);
    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      data-gl-ready="false"
      className={
        className ??
        "absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500 data-[gl-ready=true]:opacity-100"
      }
    />
  );
}
