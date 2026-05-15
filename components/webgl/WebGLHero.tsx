"use client";

import { Mesh, Program, Renderer, Texture, Triangle } from "ogl";
import { useEffect, useRef } from "react";

export type RolodexSlide = {
  src: string;
  alt: string;
};

type Props = {
  /** Ordered set of plate images to cycle through. */
  slides: RolodexSlide[];
  /** Seconds between slide advances. The last 1.5s is the crossfade. */
  intervalSec?: number;
  /** Called when the visible "active" slide changes. */
  onSlideChange?: (index: number) => void;
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

  uniform sampler2D uTex0;
  uniform sampler2D uTex1;
  uniform vec2 uTex0Res;
  uniform vec2 uTex1Res;

  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uResolution;
  uniform float uMix;

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  vec2 coverUV(vec2 uv, vec2 imgRes) {
    vec2 ratio = vec2(
      min((uResolution.x / uResolution.y) / (imgRes.x / imgRes.y), 1.0),
      min((uResolution.y / uResolution.x) / (imgRes.y / imgRes.x), 1.0)
    );
    return vec2(
      uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
  }

  void main() {
    vec2 uv = vUv;

    // Mouse swell, eases the texture toward the cursor. Geometry is
    // otherwise static at rest so the portrait reads as a print, not a
    // moving surface. The dither nudge below still adds print grain.
    vec2 toMouse = uMouse - uv;
    float dist = length(toMouse * vec2(uResolution.x / uResolution.y, 1.0));
    float swell = exp(-dist * dist * 9.0) * 0.022 * uHover;
    uv += toMouse * swell;

    vec2 uv0 = coverUV(uv, uTex0Res);
    vec2 uv1 = coverUV(uv, uTex1Res);
    vec3 col0 = texture2D(uTex0, uv0).rgb;
    vec3 col1 = texture2D(uTex1, uv1).rgb;

    // Dither-sweep transition: a left-to-right wave-shaped mask carries
    // texture B in over texture A. The mask edge is fuzzed with a hash so
    // the cross-fade reads as a print transfer, not a CSS opacity dip.
    float ditherEdge = hash12(gl_FragCoord.xy) * 0.06;
    float sweepLine = uMix * 1.4 - 0.2; // sweeps -0.2 .. 1.2 as uMix 0..1
    float sweepMask = smoothstep(
      sweepLine - 0.18,
      sweepLine + 0.18,
      vUv.x + ditherEdge - 0.03
    );

    // Swept fragments (to the right of the line) keep the current
    // texture (col0); fragments left of the line show the incoming one
    // (col1). As uMix goes 0 -> 1, the line walks left-to-right, so the
    // new texture appears on the left first and finishes by overwriting
    // the whole frame, like a printed page sliding underneath.
    vec3 col = mix(col1, col0, sweepMask);

    // Vignette toward the corners.
    vec2 cv = vUv - 0.5;
    col *= 1.0 - dot(cv, cv) * 0.55;

    // Print-quality dither nudge on luminance.
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    float d = hash12(gl_FragCoord.xy);
    float quantised = floor(lum * 32.0 + d) / 32.0;
    col = mix(col, col * (quantised / max(lum, 0.001)), 0.16);

    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * WebGLHero rolodex. Loads N base-art textures and cross-fades between
 * adjacent pairs every `intervalSec` via a left-to-right dither-sweep
 * mask. Mouse cursor drives a Gaussian swell on whichever texture is
 * currently sampled.
 *
 * Reduced-motion is handled upstream (HeroSignature returns the static
 * <img> path and never mounts this component).
 *
 * Parent gets an `onSlideChange(index)` callback each time the visible
 * "active" slide changes so it can swap the caption.
 */
export default function WebGLHero({
  slides,
  intervalSec = 5,
  onSlideChange,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onSlideChangeRef = useRef(onSlideChange);
  useEffect(() => {
    onSlideChangeRef.current = onSlideChange;
  }, [onSlideChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || slides.length === 0) return;
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
      return;
    }
    const gl = renderer.gl;
    gl.clearColor(7 / 255, 7 / 255, 7 / 255, 1);

    const textures: { tex: Texture; res: [number, number]; ready: boolean }[] =
      slides.map(() => ({
        tex: new Texture(gl, {
          generateMipmaps: false,
          minFilter: gl.LINEAR,
          magFilter: gl.LINEAR,
        }),
        res: [1, 1],
        ready: false,
      }));

    slides.forEach((slide, idx) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        textures[idx].tex.image = img;
        textures[idx].res = [img.naturalWidth, img.naturalHeight];
        textures[idx].ready = true;
        if (idx === 0) canvas.dataset.glReady = "true";
      };
      img.src = slide.src;
    });

    const mouse = { x: 0.5, y: 0.5 };
    const mouseTarget = { x: 0.5, y: 0.5 };
    let hover = 0;
    let hoverTarget = 0;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTex0: { value: textures[0].tex },
        uTex1: { value: textures[Math.min(1, slides.length - 1)].tex },
        uTex0Res: { value: textures[0].res },
        uTex1Res: { value: textures[Math.min(1, slides.length - 1)].res },
        uMouse: { value: [mouse.x, mouse.y] },
        uTime: { value: 0 },
        uHover: { value: 0 },
        uResolution: { value: [1, 1] },
        uMix: { value: 0 },
      },
    });

    const geometry = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry, program });

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

    let rafId = 0;
    let visible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(wrap);

    const start = performance.now();
    const transitionWindow = 1.5; // seconds at the end of each slot
    let lastReportedSlot = -1;

    function frame() {
      if (visible) {
        const tSec = (performance.now() - start) / 1000;
        const slot = Math.floor(tSec / intervalSec);
        const localTime = tSec - slot * intervalSec;

        const fromIdx = slot % slides.length;
        const toIdx = (slot + 1) % slides.length;

        // Mix lives only inside the final transitionWindow seconds.
        const mixRaw =
          localTime > intervalSec - transitionWindow
            ? (localTime - (intervalSec - transitionWindow)) / transitionWindow
            : 0;
        const mix = Math.max(0, Math.min(1, mixRaw));

        // Active slide for caption: stays on `fromIdx` until the sweep is
        // 50% through, then flips to `toIdx`. This keeps the caption from
        // racing ahead of the visible image.
        const activeSlide = mix > 0.5 ? toIdx : fromIdx;
        if (activeSlide !== lastReportedSlot) {
          lastReportedSlot = activeSlide;
          onSlideChangeRef.current?.(activeSlide);
        }

        const t0 = textures[fromIdx];
        const t1 = textures[toIdx];
        if (t0.ready) {
          program.uniforms.uTex0.value = t0.tex;
          program.uniforms.uTex0Res.value = t0.res;
        }
        if (t1.ready) {
          program.uniforms.uTex1.value = t1.tex;
          program.uniforms.uTex1Res.value = t1.res;
        }
        program.uniforms.uMix.value = mix;

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
  }, [slides, intervalSec]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={slides[0]?.alt ?? ""}
      data-gl-ready="false"
      className={
        className ??
        "absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500 data-[gl-ready=true]:opacity-100"
      }
    />
  );
}
