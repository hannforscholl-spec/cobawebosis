import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import defaultLogoImg from '../assets/images/osis_logo_emblem_1789526795308.jpg';

interface ThreeBackgroundProps {
  logoUrl?: string;
}

export default function ThreeBackground({ logoUrl }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 942;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch (err) {
      console.warn('WebGL not supported or disabled, skipping 3D canvas:', err);
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // Clear previous children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Studio Lighting for metallic gold and navy reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffdf78, 2.5); // Warm Gold Key Light
    dirLight1.position.set(5, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x60a5fa, 1.8); // Royal Blue Rim Light
    dirLight2.position.set(-5, -3, 3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 2.0, 25);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Group to hold the central 3D OSIS emblem & orbital elements
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    // Metallic Gold Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf6cf65,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x2e1e03,
    });

    const deepNavyMaterial = new THREE.MeshStandardMaterial({
      color: 0x0e1c2f,
      metalness: 0.75,
      roughness: 0.35,
    });

    // Texture Loader for OSIS Logo
    const textureLoader = new THREE.TextureLoader();
    const activeLogo = logoUrl || defaultLogoImg;

    textureLoader.load(activeLogo, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;

      const logoFaceMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.15,
        roughness: 0.35,
      });

      // 3D Medallion disc with logo on front & back faces, gold rim on side
      // CylinderGeometry: [sides, top/front, bottom/back]
      const medallionRadius = 1.65;
      const medallionThickness = 0.24;
      const medallionGeo = new THREE.CylinderGeometry(medallionRadius, medallionRadius, medallionThickness, 64);
      const medallionMaterials = [goldMaterial, logoFaceMaterial, logoFaceMaterial];
      const medallion = new THREE.Mesh(medallionGeo, medallionMaterials);
      medallion.rotation.x = Math.PI / 2; // Face forward
      emblemGroup.add(medallion);

      // Ornate outer metallic gold bezel ring
      const rimGeo = new THREE.TorusGeometry(medallionRadius + 0.04, 0.08, 16, 64);
      const rimMesh = new THREE.Mesh(rimGeo, goldMaterial);
      emblemGroup.add(rimMesh);

      // Inner decorative gold ring
      const innerRimGeo = new THREE.TorusGeometry(medallionRadius - 0.08, 0.035, 16, 64);
      const innerRimMesh = new THREE.Mesh(innerRimGeo, goldMaterial);
      emblemGroup.add(innerRimMesh);
    });

    // Dual concentric orbital leadership rings around the logo
    const ringGeo1 = new THREE.TorusGeometry(2.55, 0.045, 16, 100);
    const ring1 = new THREE.Mesh(ringGeo1, goldMaterial);
    ring1.rotation.x = Math.PI / 3.2;
    ring1.rotation.y = Math.PI / 6;
    emblemGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.88, 0.035, 16, 100);
    const ring2 = new THREE.Mesh(ringGeo2, deepNavyMaterial);
    ring2.rotation.x = -Math.PI / 3.8;
    ring2.rotation.z = Math.PI / 4.2;
    emblemGroup.add(ring2);

    // Floating satellite division nodes
    const satelliteGroup = new THREE.Group();
    const nodeGeo = new THREE.BoxGeometry(0.24, 0.24, 0.24);
    const nodeCount = 8;
    const satelliteNodes: { mesh: THREE.Mesh; angle: number; speed: number; radius: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.65;
      const node = new THREE.Mesh(nodeGeo, i % 2 === 0 ? goldMaterial : deepNavyMaterial);
      node.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.4, Math.sin(angle) * 1.5);
      node.rotation.x = Math.random() * Math.PI;
      node.rotation.y = Math.random() * Math.PI;
      satelliteGroup.add(node);
      satelliteNodes.push({ mesh: node, angle, speed: 0.007 + (i % 3) * 0.002, radius });
    }
    emblemGroup.add(satelliteGroup);

    // Ambient floating gold dust particles
    const particleCount = 85;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 14;
      particlePos[i + 1] = (Math.random() - 0.5) * 9;
      particlePos[i + 2] = (Math.random() - 0.5) * 9;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffe088,
      size: 0.05,
      transparent: true,
      opacity: 0.75,
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

      // Natural floating + mouse tilt response
      emblemGroup.position.y = Math.sin(elapsedTime * 0.9) * 0.15 + targetY * -0.6;
      emblemGroup.position.x = targetX * 0.6;

      // Gentle interactive 3D rotation
      emblemGroup.rotation.y = targetX * 1.2 + Math.sin(elapsedTime * 0.4) * 0.12;
      emblemGroup.rotation.x = targetY * 1.0 + Math.cos(elapsedTime * 0.4) * 0.08;

      ring1.rotation.z = elapsedTime * 0.18;
      ring2.rotation.y = -elapsedTime * 0.22;

      // Orbit satellite nodes
      satelliteNodes.forEach((sat) => {
        sat.angle += sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.y = Math.sin(sat.angle) * sat.radius * 0.45;
        sat.mesh.position.z = Math.sin(sat.angle) * 1.5;
        sat.mesh.rotation.x += 0.01;
        sat.mesh.rotation.y += 0.015;
      });

      // Particle subtle drifting
      particleSystem.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [logoUrl]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}
