import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 942;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Clear previous children if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Lighting setup for rich metallic gold and navy hues
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xf5d061, 2.2); // Warm Gold Key Light
    dirLight1.position.set(5, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.8); // Royal Sky Blue Rim Light
    dirLight2.position.set(-5, -3, 3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 20);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Group to hold the central emblem
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    // Materials
    const goldMaterial = new THREE.MeshPhongMaterial({
      color: 0xe5ba42,
      emissive: 0x3d2b05,
      specular: 0xffffff,
      shininess: 90,
      flatShading: false,
    });

    const deepNavyMaterial = new THREE.MeshPhongMaterial({
      color: 0x1e3e62,
      emissive: 0x07111c,
      specular: 0x93c5fd,
      shininess: 70,
      flatShading: false,
    });

    const glassRingMaterial = new THREE.MeshPhongMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });

    // 1. Center faceted Star / Octahedron representing leadership & excellence
    const octahedronGeo = new THREE.OctahedronGeometry(1.4, 0);
    const coreEmblem = new THREE.Mesh(octahedronGeo, goldMaterial);
    emblemGroup.add(coreEmblem);

    // Inner nested geometric core
    const innerCoreGeo = new THREE.IcosahedronGeometry(0.75, 0);
    const innerCore = new THREE.Mesh(innerCoreGeo, deepNavyMaterial);
    emblemGroup.add(innerCore);

    // 2. Dual concentric orbital leadership rings
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.05, 16, 100);
    const ring1 = new THREE.Mesh(ringGeo1, goldMaterial);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    emblemGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.6, 0.03, 16, 100);
    const ring2 = new THREE.Mesh(ringGeo2, deepNavyMaterial);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    emblemGroup.add(ring2);

    const wireSphereGeo = new THREE.SphereGeometry(2.85, 24, 16);
    const wireRing = new THREE.Mesh(wireSphereGeo, glassRingMaterial);
    emblemGroup.add(wireRing);

    // 3. Floating satellite geometric nodes (representing divisions / sekbid)
    const satelliteGroup = new THREE.Group();
    const nodeGeo = new THREE.BoxGeometry(0.22, 0.22, 0.22);
    const nodeCount = 8;
    const satelliteNodes: { mesh: THREE.Mesh; angle: number; speed: number; radius: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.45;
      const node = new THREE.Mesh(nodeGeo, i % 2 === 0 ? goldMaterial : deepNavyMaterial);
      node.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.4, Math.sin(angle) * 1.5);
      node.rotation.x = Math.random() * Math.PI;
      node.rotation.y = Math.random() * Math.PI;
      satelliteGroup.add(node);
      satelliteNodes.push({ mesh: node, angle, speed: 0.008 + (i % 3) * 0.003, radius });
    }
    emblemGroup.add(satelliteGroup);

    // Ambient floating particles
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 12;
      particlePos[i + 1] = (Math.random() - 0.5) * 8;
      particlePos[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe5ba42,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.0012;
      mouseY = (event.clientY - windowHalfY) * 0.0012;
    };
    window.addEventListener('mousemove', onDocumentMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || 942;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Animation loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse inertia
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Subtle natural floating + mouse tilt response
      emblemGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.15 + targetY * -0.5;
      emblemGroup.position.x = targetX * 0.5;

      // Smooth rotation
      coreEmblem.rotation.y = elapsedTime * 0.35 + targetX * 0.8;
      coreEmblem.rotation.x = elapsedTime * 0.2 + targetY * 0.8;

      innerCore.rotation.y = -elapsedTime * 0.5;
      innerCore.rotation.z = elapsedTime * 0.3;

      ring1.rotation.z = elapsedTime * 0.15;
      ring2.rotation.y = -elapsedTime * 0.2;
      wireRing.rotation.y = elapsedTime * 0.08;

      // Orbit satellite nodes
      satelliteNodes.forEach((sat) => {
        sat.angle += sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.y = Math.sin(sat.angle) * sat.radius * 0.45;
        sat.mesh.position.z = Math.sin(sat.angle) * 1.6;
        sat.mesh.rotation.x += 0.02;
        sat.mesh.rotation.y += 0.03;
      });

      // Slow particle drift
      particleSystem.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      octahedronGeo.dispose();
      innerCoreGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      wireSphereGeo.dispose();
      nodeGeo.dispose();
      particleGeo.dispose();
      goldMaterial.dispose();
      deepNavyMaterial.dispose();
      glassRingMaterial.dispose();
      particleMat.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="threejs-canvas-container"
      className="w-full h-full absolute inset-0 pointer-events-auto bg-transparent z-0 opacity-80"
    />
  );
}
