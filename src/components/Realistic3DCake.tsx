import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Realistic3DCakeProps {
  areCandlesBlown: boolean;
  knifeCutting: boolean;
  isSliced: boolean;
  recipientName: string;
}

export const Realistic3DCake: React.FC<Realistic3DCakeProps> = ({
  areCandlesBlown,
  knifeCutting,
  isSliced,
  recipientName
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const cakeGroupRef = useRef<THREE.Group | null>(null);
  const candleLightsRef = useRef<THREE.PointLight[]>([]);
  const flameMeshesRef = useRef<THREE.Mesh[]>([]);
  const sliceGroupRef = useRef<THREE.Group | null>(null);
  const knifeMeshRef = useRef<THREE.Group | null>(null);
  const smokeParticlesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 5.2);
    camera.lookAt(0, 0.7, 0);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // LIGHTING RIG
    const ambientLight = new THREE.AmbientLight(0xfff1f2, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffedd5, 2.0);
    dirLight1.position.set(3, 5, 4);
    scene.add(dirLight1);

    const rimLight = new THREE.DirectionalLight(0xf43f5e, 1.5);
    rimLight.position.set(-3.5, 3, -3);
    scene.add(rimLight);

    const bottomGlow = new THREE.DirectionalLight(0xfb7185, 0.8);
    bottomGlow.position.set(0, -2, 2);
    scene.add(bottomGlow);

    // MAIN CAKE GROUP
    const cakeGroup = new THREE.Group();
    cakeGroup.position.set(0, 0, 0);
    scene.add(cakeGroup);
    cakeGroupRef.current = cakeGroup;

    // GOLD PEDESTAL STAND
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.85,
      roughness: 0.22,
    });

    const standBaseGeo = new THREE.CylinderGeometry(1.5, 1.7, 0.12, 48);
    const standBase = new THREE.Mesh(standBaseGeo, goldMaterial);
    standBase.position.y = 0.06;
    cakeGroup.add(standBase);

    const standPlateGeo = new THREE.CylinderGeometry(1.9, 1.9, 0.08, 48);
    const standPlate = new THREE.Mesh(standPlateGeo, goldMaterial);
    standPlate.position.y = 0.18;
    cakeGroup.add(standPlate);

    const standRimGeo = new THREE.TorusGeometry(1.88, 0.04, 16, 48);
    const standRim = new THREE.Mesh(standRimGeo, goldMaterial);
    standRim.rotation.x = Math.PI / 2;
    standRim.position.y = 0.22;
    cakeGroup.add(standRim);

    // MATERIALS FOR CAKE TIERS & PIPING
    const velvetTier1Mat = new THREE.MeshStandardMaterial({
      color: 0x831843, // Rich velvet crimson
      roughness: 0.42,
      metalness: 0.05,
    });

    const berryTier2Mat = new THREE.MeshStandardMaterial({
      color: 0xbe185d, // Warm ruby rose
      roughness: 0.38,
      metalness: 0.05,
    });

    const creamTier3Mat = new THREE.MeshStandardMaterial({
      color: 0xfff1f2, // Delicate pearl vanilla cream
      roughness: 0.28,
      metalness: 0.02,
    });

    const pearlMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.2,
      metalness: 0.6,
    });

    const strawberryMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      roughness: 0.25,
      metalness: 0.1,
    });

    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      roughness: 0.5,
    });

    // CAKE SLICE SLICE GROUP (Contains the wedge that cuts away)
    const cakeMainGroup = new THREE.Group();
    const cakeSliceGroup = new THREE.Group();
    cakeGroup.add(cakeMainGroup);
    cakeGroup.add(cakeSliceGroup);
    sliceGroupRef.current = cakeSliceGroup;

    // TIER 1 (BOTTOM)
    const tier1Geo = new THREE.CylinderGeometry(1.6, 1.6, 0.6, 48);
    const tier1Mesh = new THREE.Mesh(tier1Geo, velvetTier1Mat);
    tier1Mesh.position.y = 0.52;
    cakeMainGroup.add(tier1Mesh);

    // Bottom tier pearl border
    const pearlGeo = new THREE.SphereGeometry(0.045, 12, 12);
    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * Math.PI * 2;
      const pearl = new THREE.Mesh(pearlGeo, pearlMat);
      pearl.position.set(Math.cos(angle) * 1.62, 0.24, Math.sin(angle) * 1.62);
      cakeMainGroup.add(pearl);

      const pearlTop = new THREE.Mesh(pearlGeo, pearlMat);
      pearlTop.position.set(Math.cos(angle) * 1.6, 0.82, Math.sin(angle) * 1.6);
      cakeMainGroup.add(pearlTop);
    }

    // TIER 2 (MIDDLE)
    const tier2Geo = new THREE.CylinderGeometry(1.15, 1.15, 0.55, 48);
    const tier2Mesh = new THREE.Mesh(tier2Geo, berryTier2Mat);
    tier2Mesh.position.y = 1.08;
    cakeMainGroup.add(tier2Mesh);

    for (let i = 0; i < 26; i++) {
      const angle = (i / 26) * Math.PI * 2;
      const pearl = new THREE.Mesh(pearlGeo, pearlMat);
      pearl.position.set(Math.cos(angle) * 1.16, 1.35, Math.sin(angle) * 1.16);
      cakeMainGroup.add(pearl);
    }

    // TIER 3 (TOP)
    const tier3Geo = new THREE.CylinderGeometry(0.72, 0.72, 0.5, 48);
    const tier3Mesh = new THREE.Mesh(tier3Geo, creamTier3Mat);
    tier3Mesh.position.y = 1.58;
    cakeMainGroup.add(tier3Mesh);

    // Decorative rosette piping on top rim
    const rosetteGeo = new THREE.TorusGeometry(0.06, 0.03, 8, 16);
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const rosette = new THREE.Mesh(rosetteGeo, creamTier3Mat);
      rosette.rotation.x = Math.PI / 2;
      rosette.position.set(Math.cos(angle) * 0.7, 1.83, Math.sin(angle) * 0.7);
      cakeMainGroup.add(rosette);
    }

    // TOP STRAWBERRIES & ROSES
    const strawberryGeo = new THREE.ConeGeometry(0.1, 0.16, 16);
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const strawberry = new THREE.Mesh(strawberryGeo, strawberryMat);
      strawberry.rotation.x = Math.PI;
      strawberry.position.set(Math.cos(angle) * 0.42, 1.88, Math.sin(angle) * 0.42);
      cakeMainGroup.add(strawberry);

      // Tiny green leaf hat
      const leafGeo = new THREE.CylinderGeometry(0.06, 0.02, 0.02, 5);
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(Math.cos(angle) * 0.42, 1.95, Math.sin(angle) * 0.42);
      cakeMainGroup.add(leaf);
    }

    // 3 BIRTHDAY CANDLES & FLAMES
    const candlePositions = [
      new THREE.Vector3(-0.25, 1.83, 0),
      new THREE.Vector3(0.25, 1.83, 0),
      new THREE.Vector3(0, 1.83, 0.22),
    ];

    const candleLights: THREE.PointLight[] = [];
    const flameMeshes: THREE.Mesh[] = [];

    const candleGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.45, 16);
    const candleMat = new THREE.MeshStandardMaterial({
      color: 0xfda4af,
      roughness: 0.3,
    });

    const wickGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.08, 8);
    const wickMat = new THREE.MeshBasicMaterial({ color: 0x1f2937 });

    const flameGeo = new THREE.ConeGeometry(0.05, 0.14, 16);
    const flameMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xf59e0b,
      emissiveIntensity: 3.5,
      roughness: 0.1,
    });

    candlePositions.forEach((pos, idx) => {
      // Candle Body
      const candle = new THREE.Mesh(candleGeo, candleMat);
      candle.position.set(pos.x, pos.y + 0.22, pos.z);
      cakeMainGroup.add(candle);

      // Wick
      const wick = new THREE.Mesh(wickGeo, wickMat);
      wick.position.set(pos.x, pos.y + 0.46, pos.z);
      cakeMainGroup.add(wick);

      // Flame
      const flame = new THREE.Mesh(flameGeo, flameMat);
      flame.position.set(pos.x, pos.y + 0.55, pos.z);
      cakeMainGroup.add(flame);
      flameMeshes.push(flame);

      // Point Light at Flame
      const pLight = new THREE.PointLight(0xfbbf24, 2.2, 3.2, 2);
      pLight.position.set(pos.x, pos.y + 0.56, pos.z);
      cakeMainGroup.add(pLight);
      candleLights.push(pLight);
    });

    candleLightsRef.current = candleLights;
    flameMeshesRef.current = flameMeshes;

    // SMOKE PARTICLES (Shown when blown)
    const smokeParticles: THREE.Mesh[] = [];
    const smokeGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const smokeMat = new THREE.MeshBasicMaterial({
      color: 0x9ca3af,
      transparent: true,
      opacity: 0.6,
    });

    for (let i = 0; i < 9; i++) {
      const smoke = new THREE.Mesh(smokeGeo, smokeMat.clone());
      smoke.visible = false;
      cakeMainGroup.add(smoke);
      smokeParticles.push(smoke);
    }
    smokeParticlesRef.current = smokeParticles;

    // 3D SILVER CUTTING KNIFE
    const knifeGroup = new THREE.Group();
    const bladeGeo = new THREE.BoxGeometry(0.02, 0.45, 1.2);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.95,
      roughness: 0.1,
    });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.set(0, 0.2, 0.4);
    knifeGroup.add(blade);

    const handleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.4, 12);
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.7,
      roughness: 0.3,
    });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.rotation.x = Math.PI / 2;
    handle.position.set(0, 0.25, 1.15);
    knifeGroup.add(handle);

    knifeGroup.position.set(0, 3.0, 0.8);
    knifeGroup.rotation.x = 0.3;
    knifeGroup.visible = false;
    scene.add(knifeGroup);
    knifeMeshRef.current = knifeGroup;

    // FLOATING 3D HEARTS & SPARKLES
    const sparklesGroup = new THREE.Group();
    scene.add(sparklesGroup);

    const sparkleGeo = new THREE.OctahedronGeometry(0.04, 0);
    const sparkleMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.5,
      roughness: 0.2,
    });

    for (let i = 0; i < 18; i++) {
      const sp = new THREE.Mesh(sparkleGeo, sparkleMat);
      const angle = (i / 18) * Math.PI * 2;
      const radius = 1.8 + (i % 3) * 0.4;
      sp.position.set(
        Math.cos(angle) * radius,
        0.5 + Math.sin(i * 1.5) * 1.2,
        Math.sin(angle) * radius
      );
      sparklesGroup.add(sp);
    }

    // TOUCH & MOUSE ROTATION CONTROLS
    const onMouseDown = (e: MouseEvent) => {
      isInteracting.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isInteracting.current || !cakeGroupRef.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      cakeGroupRef.current.rotation.y += deltaX * 0.01;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isInteracting.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isInteracting.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isInteracting.current || !cakeGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      cakeGroupRef.current.rotation.y += deltaX * 0.012;
      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isInteracting.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow automatic rotation when user is not manually dragging
      if (!isInteracting.current && cakeGroupRef.current) {
        cakeGroupRef.current.rotation.y += 0.005;
      }

      // Sparkles floating movement
      sparklesGroup.rotation.y = elapsedTime * 0.15;
      sparklesGroup.children.forEach((sp, idx) => {
        sp.position.y += Math.sin(elapsedTime * 2 + idx) * 0.003;
        sp.rotation.x += 0.02;
        sp.rotation.y += 0.03;
      });

      // Candles Flickering Animation
      flameMeshesRef.current.forEach((flame, idx) => {
        if (!areCandlesBlown) {
          const flicker = Math.sin(elapsedTime * 15 + idx * 3) * 0.08 + 1;
          flame.scale.set(flicker, flicker * 1.1, flicker);
          flame.rotation.z = Math.sin(elapsedTime * 8 + idx) * 0.06;
          flame.visible = true;
        } else {
          flame.scale.multiplyScalar(0.9);
          if (flame.scale.x < 0.01) flame.visible = false;
        }
      });

      // Dynamic Candle Point Light Flickering
      candleLightsRef.current.forEach((light, idx) => {
        if (!areCandlesBlown) {
          light.intensity = 2.2 + Math.sin(elapsedTime * 18 + idx * 4) * 0.5;
        } else {
          light.intensity = THREE.MathUtils.lerp(light.intensity, 0, 0.08);
        }
      });

      // Smoke rising when blown
      if (areCandlesBlown) {
        smokeParticlesRef.current.forEach((smoke, idx) => {
          smoke.visible = true;
          smoke.position.y += 0.012;
          smoke.position.x += Math.sin(elapsedTime * 3 + idx) * 0.004;
          const mat = smoke.material as THREE.MeshBasicMaterial;
          mat.opacity = Math.max(0, mat.opacity - 0.006);
        });
      }

      // Slice displacement
      if (sliceGroupRef.current) {
        if (isSliced) {
          sliceGroupRef.current.position.x = THREE.MathUtils.lerp(
            sliceGroupRef.current.position.x,
            0.35,
            0.05
          );
          sliceGroupRef.current.position.z = THREE.MathUtils.lerp(
            sliceGroupRef.current.position.z,
            0.35,
            0.05
          );
        }
      }

      // Knife cutting animation
      if (knifeMeshRef.current) {
        if (knifeCutting) {
          knifeMeshRef.current.visible = true;
          knifeMeshRef.current.position.y = THREE.MathUtils.lerp(
            knifeMeshRef.current.position.y,
            1.1,
            0.12
          );
          knifeMeshRef.current.rotation.x = THREE.MathUtils.lerp(
            knifeMeshRef.current.rotation.x,
            0.0,
            0.1
          );
        } else {
          knifeMeshRef.current.visible = false;
          knifeMeshRef.current.position.set(0, 3.0, 0.8);
          knifeMeshRef.current.rotation.x = 0.3;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE OBSERVER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }

      // Dispose of geometries and materials
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [areCandlesBlown, knifeCutting, isSliced]);

  return (
    <div className="relative w-full h-80 sm:h-96 flex items-center justify-center">
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
      />

      {/* Floating 3D Depth Hint Pill */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-rose-500/20 text-[10px] font-mono text-rose-300/80 tracking-wider">
          ✦ Drag to rotate cake in 3D ✦
        </span>
      </div>
    </div>
  );
};
