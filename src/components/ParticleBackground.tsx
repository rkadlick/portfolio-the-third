"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

const vertexShader = `
  attribute vec3 color;
  attribute float alpha;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vColor = color;
    vAlpha = alpha;
    gl_Position =
      projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(vColor, vAlpha);
  }
`;

const ParticleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const animRef = useRef<any>(null);
  const { theme } = useTheme(); // we'll read theme inside animate()

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Cleanup any old scene
    if (animRef.current) {
      cancelAnimationFrame(animRef.current.raf);
      animRef.current.renderer.dispose();
      container.innerHTML = "";
      animRef.current = null;
    }

    // Basic sizes
    const width = window.innerWidth;
    const height = window.innerHeight;

    // THREE scene + ortho camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      1,
      1000
    );
    camera.position.z = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = true;
    container.appendChild(renderer.domElement);

    // Theme color fetcher
    const getColor = () => {
      const c = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
      return new THREE.Color(c);
    };

    // PARTICLES
    const particleCount = 90;
    const maxDistance = 150;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = 3 * i;
      positions[i3]     = (Math.random() - 0.5) * width;
      positions[i3 + 1] = (Math.random() - 0.5) * height;
      velocities[i3]    = (Math.random() - 0.5) * 3;
      velocities[i3 + 1]= (Math.random() - 0.5) * 3;
    }

    // Color attribute per-vertex
    const pointColors = new Float32Array(particleCount * 3);
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color",    new THREE.BufferAttribute(pointColors, 3));

    const pMat = new THREE.PointsMaterial({
      vertexColors: true,
      size: 4,
      sizeAttenuation: false,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthTest: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // MAIN LINES buffers (worst case ~n(n-1)/2 segments)
    const maxPairs = (particleCount * (particleCount - 1)) / 2;
    const linePos = new Float32Array(maxPairs * 2 * 3);
    const lineCol = new Float32Array(maxPairs * 2 * 3);
    const lineA   = new Float32Array(maxPairs * 2);
    const lGeo    = new THREE.BufferGeometry();

    lGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePos, 3).setUsage(THREE.DynamicDrawUsage)
    );
    lGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(lineCol, 3).setUsage(THREE.DynamicDrawUsage)
    );
    lGeo.setAttribute(
      "alpha",
      new THREE.BufferAttribute(lineA,   1).setUsage(THREE.DynamicDrawUsage)
    );

    const lineMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lGeo, lineMat);
    scene.add(lines);

    // CURSOR LINES buffers
    const cPos = new Float32Array(particleCount * 2 * 3);
    const cCol = new Float32Array(particleCount * 2 * 3);
    const cA   = new Float32Array(particleCount * 2);
    const cGeo = new THREE.BufferGeometry();
    cGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(cPos, 3).setUsage(THREE.DynamicDrawUsage)
    );
    cGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(cCol, 3).setUsage(THREE.DynamicDrawUsage)
    );
    cGeo.setAttribute(
      "alpha",
      new THREE.BufferAttribute(cA,   1).setUsage(THREE.DynamicDrawUsage)
    );
    const cMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    const cursorLines = new THREE.LineSegments(cGeo, cMat);
    scene.add(cursorLines);

    // TRACK connections per particle
    const connectionCounts = new Uint16Array(particleCount);

    // Mouse handlers
    const move = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      const newPos = {
        x: e.clientX - r.left  - r.width  / 2,
        y: -(e.clientY - r.top - r.height / 2),
      };
      console.log('Mouse moved:', { raw: { x: e.clientX, y: e.clientY }, adjusted: newPos });
      mousePosRef.current = newPos;
    };
    const leave = () => {
      mousePosRef.current = null;
    };
    container.addEventListener("mousemove", move);
    container.addEventListener("mouseleave", leave);

    // Store for animate + cleanup
    animRef.current = {
      renderer,
      scene,
      camera,
      positions,
      velocities,
      particles,
      pointColors,
      linePos,
      lineCol,
      lineA,
      lines,
      cPos,
      cCol,
      cA,
      cursorLines,
      connectionCounts,
      maxDistance,
      start: performance.now(),
      raf: 0,
    };

    // MAIN LOOP
    function animate() {
      const a = animRef.current;
      if (!a) return;

      const {
        positions,
        velocities,
        camera,
        renderer,
        particles,
        pointColors,
        linePos,
        lineCol,
        lineA,
        lines,
        cPos,
        cCol,
        cA,
        cursorLines,
        connectionCounts,
        maxDistance,
        start,
      } = a;

      // update theme color & mode
      const base = getColor();
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";

      // MOVE particles & reset connectionCounts
      connectionCounts.fill(0);
      for (let i = 0; i < particleCount; i++) {
        const i3 = 3 * i;
        positions[i3]     += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        if (
          positions[i3] >  width / 2 || positions[i3] < -width / 2
        ) velocities[i3] *= -1;
        if (
          positions[i3+1] >  height / 2 || positions[i3+1] < -height / 2
        ) velocities[i3+1] *= -1;
      }
      (particles.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      // REBUILD MAIN LINES
      let lpI = 0, lcI = 0, laI = 0;
      for (let i = 0; i < particleCount; i++) {
        const i3 = 3 * i;
        for (let j = i + 1; j < particleCount; j++) {
          const j3 = 3 * j;
          const dx = positions[i3]     - positions[j3];
          const dy = positions[i3 + 1] - positions[j3 + 1];
          const d  = Math.hypot(dx, dy);
          if (d > maxDistance) continue;
          const r = d / maxDistance;

          // boost brightness & alpha
          const bf    = 2 * (1 - r) + 0.2;             // up to ×2.2
          const alpha = 0.8 * (1 - r) + 0.2;           // 0.2 → 1.0

          // record a connection for each endpoint
          connectionCounts[i]++;
          connectionCounts[j]++;

          // positions
          linePos[lpI++] = positions[i3];
          linePos[lpI++] = positions[i3 + 1];
          linePos[lpI++] = 0;
          linePos[lpI++] = positions[j3];
          linePos[lpI++] = positions[j3 + 1];
          linePos[lpI++] = 0;

          // colors
          const rC = base.r * bf;
          const gC = base.g * bf;
          const bC = base.b * bf;
          lineCol[lcI++] = rC;
          lineCol[lcI++] = gC;
          lineCol[lcI++] = bC;
          lineCol[lcI++] = rC;
          lineCol[lcI++] = gC;
          lineCol[lcI++] = bC;

          // alphas
          lineA[laI++] = alpha;
          lineA[laI++] = alpha;
        }
      }
      const segs = lpI / 3;
      lines.geometry.setDrawRange(0, segs);
      (lines.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (lines.geometry.attributes.color    as THREE.BufferAttribute).needsUpdate = true;
      (lines.geometry.attributes.alpha    as THREE.BufferAttribute).needsUpdate = true;

      // UPDATE PARTICLE COLORS by connection count
      const maxCon = Math.max(...connectionCounts, 1);
      for (let i = 0; i < particleCount; i++) {
        const i3 = 3 * i;
        // each extra line adds +0.2 brightness
        const f = 1 + (connectionCounts[i] / maxCon) * (isDark ? 1.5 : 1.0);
        pointColors[i3]     = base.r * f;
        pointColors[i3 + 1] = base.g * f;
        pointColors[i3 + 2] = base.b * f;
      }
      (particles.geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      // REBUILD CURSOR LINES
      const mp = mousePosRef.current;
      if (mp) {
        let cpI = 0, ccI = 0, caI = 0;
        const maxC = 200;
        for (let i = 0; i < particleCount; i++) {
          const i3 = 3 * i;
          const dx = positions[i3]     - mp.x;
          const dy = positions[i3 + 1] - mp.y;
          const d  = Math.hypot(dx, dy);
          if (d > maxC) continue;
          const r      = d / maxC;
          const bfC    = 3 * (1 - r) + 0.5;            // up to ×3.5
          const alphaC = Math.min(1, 1.2 * (1 - r) + 0.1);

          // positions
          cPos[cpI++] = mp.x;
          cPos[cpI++] = mp.y;
          cPos[cpI++] = 0;
          cPos[cpI++] = positions[i3];
          cPos[cpI++] = positions[i3 + 1];
          cPos[cpI++] = 0;

          // colors
          const rC = base.r * bfC;
          const gC = base.g * bfC;
          const bC = base.b * bfC;
          cCol[ccI++] = rC;
          cCol[ccI++] = gC;
          cCol[ccI++] = bC;
          cCol[ccI++] = rC;
          cCol[ccI++] = gC;
          cCol[ccI++] = bC;

          // alphas
          cA[caI++] = alphaC;
          cA[caI++] = alphaC;
        }
        const cSegs = cpI / 3;
        cursorLines.geometry.setDrawRange(0, cSegs);
        (cursorLines.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
        (cursorLines.geometry.attributes.color    as THREE.BufferAttribute).needsUpdate = true;
        (cursorLines.geometry.attributes.alpha    as THREE.BufferAttribute).needsUpdate = true;
      } else {
        cursorLines.geometry.setDrawRange(0, 0);
      }

      renderer.render(scene, camera);
      animRef.current.raf = requestAnimationFrame(animate);
    }

    animate();

    // RESIZE
    const onResize = () => {
      if (!animRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const { camera, renderer } = animRef.current;
      camera.left   = -w / 2;
      camera.right  =  w / 2;
      camera.top    =  h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // CLEANUP
    return () => {
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", move);
      container.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(animRef.current.raf);
      animRef.current.renderer.dispose();
      container.innerHTML = "";
      animRef.current = null;
    };
  }, []); // <- only once

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "var(--background)",
      }}
    />
  );
};

export default ParticleBackground;
