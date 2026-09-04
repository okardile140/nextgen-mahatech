"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Hero3DCanvas — interactive WebGL holographic globe.
 *
 * Performance-hardened so it can't overwhelm weak GPUs / display drivers
 * (which shows up as whole-screen flickering on some machines):
 *  - Requests the low-power (integrated) GPU instead of forcing a discrete-
 *    GPU switch — a classic source of display flicker on dual-GPU laptops.
 *  - No MSAA (`antialias: false`) and pixel ratio capped at 1.5.
 *  - Render loop throttled to ~30fps and paused whenever the hero is
 *    off-screen (IntersectionObserver) or the tab is hidden.
 *  - `prefers-reduced-motion` renders a single static frame; `?no3d=1` in the
 *    URL (or any WebGL failure / context loss) falls back to a CSS hologram.
 */
export default function Hero3DCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Emergency kill-switch: ?no3d=1 renders the lightweight CSS fallback.
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("no3d") === "1" || params.get("static") === "1") {
        setFailed(true);
        return;
      }
    } catch {
      /* URL parsing never blocks rendering */
    }

    // ---- WebGL capability check -------------------------------------------
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      setFailed(true);
      return;
    }

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // ---- Scene -------------------------------------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5.4;

    // Cap resolution: full devicePixelRatio with MSAA is what melts weak GPUs.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const group = new THREE.Group();
    scene.add(group);

    // Outer geodesic wireframe sphere
    const wireSphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.55, 3),
      new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      })
    );
    group.add(wireSphere);

    // Inner core
    const coreSphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.92, 2),
      new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      })
    );
    group.add(coreSphere);

    // Node particles distributed on a Fibonacci sphere
    const COUNT = 150;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const cA = new THREE.Color(0x818cf8);
    const cB = new THREE.Color(0x67e8f9);

    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      const r = 1.62;

      positions[i * 3] = Math.cos(theta) * radius * r;
      positions[i * 3 + 1] = y * r;
      positions[i * 3 + 2] = Math.sin(theta) * radius * r;

      const mixed = cA.clone().lerp(cB, i / COUNT);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    const pointsGeom = new THREE.BufferGeometry();
    pointsGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointsGeom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Soft round sprite for each node
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 64;
    const ctx = sprite.getContext("2d")!;
    const grad = ctx.createRadialGradient(32, 32, 1, 32, 32, 30);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.35, "rgba(125,211,252,0.9)");
    grad.addColorStop(1, "rgba(56,189,248,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const pointTex = new THREE.CanvasTexture(sprite);

    const pointCloud = new THREE.Points(
      pointsGeom,
      new THREE.PointsMaterial({
        size: 0.13,
        vertexColors: true,
        map: pointTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    group.add(pointCloud);

    // Orbiting rings
    const ring1 = new THREE.Mesh(
      new THREE.RingGeometry(2.05, 2.075, 96),
      new THREE.MeshBasicMaterial({
        color: 0x818cf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
      })
    );
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.RingGeometry(2.4, 2.42, 96),
      new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3,
      })
    );
    ring2.rotation.set(Math.PI / 6, Math.PI / 4, 0);
    group.add(ring2);

    // ---- Shared teardown ----------------------------------------------------
    const disposeScene = () => {
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose?.();
        const mat = mesh.material as THREE.Material | THREE.Material[];
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose?.();
      });
      pointTex.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) container.removeChild(canvas);
    };

    const fitToContainer = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return false;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      return true;
    };

    // ---- Reduced motion: one static frame, no animation loop ----------------
    if (reduced) {
      group.rotation.set(0.15, 0.6, 0);
      const renderStatic = () => {
        if (!fitToContainer()) return;
        try {
          renderer.render(scene, camera);
        } catch {
          setFailed(true);
        }
      };
      const roStatic = new ResizeObserver(renderStatic);
      roStatic.observe(container);
      renderStatic();
      return () => {
        roStatic.disconnect();
        disposeScene();
      };
    }

    // ---- Sizing ------------------------------------------------------------
    const ro = new ResizeObserver(() => {
      fitToContainer();
    });
    ro.observe(container);
    fitToContainer();

    // ---- Pointer interaction ----------------------------------------------
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let down = false;
    let lastX = 0;
    let lastY = 0;

    const onPointerDown = (e: PointerEvent) => {
      down = true;
      lastX = e.clientX;
      lastY = e.clientY;
      setDragging(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (down) {
        targetY += (e.clientX - lastX) * 0.007;
        targetX += (e.clientY - lastY) * 0.007;
        lastX = e.clientX;
        lastY = e.clientY;
        return;
      }
      const rect = container.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) return;
      targetY = ((e.clientX - rect.left) / rect.width - 0.5) * 0.7;
      targetX = ((e.clientY - rect.top) / rect.height - 0.5) * 0.7;
    };

    const onPointerUp = () => {
      down = false;
      setDragging(false);
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // ---- Render loop: throttled + visibility-aware --------------------------
    let raf = 0;
    let lastFrame = 0;
    let isVisible = true;
    const FRAME_MS = 1000 / 30; // ~30fps is plenty for an ambient visual
    const clock = new THREE.Clock();

    const draw = () => {
      const t = clock.getElapsedTime();

      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;

      group.rotation.x = curX + Math.sin(t * 0.35) * 0.14;
      group.rotation.y = curY + t * 0.26;

      ring1.rotation.z = t * 0.45;
      ring2.rotation.z = -t * 0.38;
      coreSphere.rotation.y = -t * 0.55;
      wireSphere.scale.setScalar(1 + Math.sin(t * 1.6) * 0.02);

      renderer.render(scene, camera);
    };

    const start = () => {
      if (raf) return;
      lastFrame = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - lastFrame < FRAME_MS) return; // throttle: skip excess frames
      lastFrame = now;
      try {
        draw();
      } catch {
        // GPU context died mid-frame — stop and show the CSS fallback.
        stop();
        setFailed(true);
      }
    };

    const syncRunning = () => {
      if (isVisible && document.visibilityState === "visible") start();
      else stop();
    };

    // Pause when the hero scrolls out of view…
    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        syncRunning();
      },
      { threshold: 0.02 }
    );
    io.observe(container);

    // …and when the tab is hidden.
    const onVisibilityChange = () => syncRunning();
    document.addEventListener("visibilitychange", onVisibilityChange);

    // If the driver kills our GL context, fall back instead of glitching.
    const onContextLost = (e: Event) => {
      e.preventDefault();
      stop();
      setFailed(true);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    start();

    // ---- Cleanup -----------------------------------------------------------
    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      disposeScene();
    };
  }, []);

  return (
    <div className="relative h-full w-full select-none">
      {/* Ambient glow sits behind the canvas */}
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-gradient-to-br from-indigo-500/25 via-blue-500/15 to-cyan-400/25 blur-3xl" />

      {/* WebGL mount point */}
      <div
        ref={mountRef}
        className={`absolute inset-0 ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ touchAction: "none" }}
      />

      {/* Fallback if WebGL is unavailable */}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-2/3 w-2/3">
            <div className="absolute inset-0 rounded-full border border-indigo-400/30 animate-[spin_18s_linear_infinite]" />
            <div className="absolute inset-6 rounded-full border border-cyan-300/25 animate-[spin_26s_linear_infinite_reverse]" />
            <div className="absolute inset-12 rounded-full bg-gradient-to-br from-indigo-500/25 to-cyan-400/25 blur-2xl" />
          </div>
        </div>
      )}

    
    </div>
  );
}
