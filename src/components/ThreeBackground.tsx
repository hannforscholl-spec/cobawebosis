import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// Import logo OSIS Anda di sini:
import defaultLogoImg from '../assets/images/LOGO.png';

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
      console.warn('WebGL tidak aktif, melewati canvas 3D:', err);
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Pencahayaan Emas & Biru Almamater
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffdf78, 2.5);
    dirLight1.position.set(5, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x60a5fa, 1.8);
    dirLight2.position.set(-5, -3, 3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 2.0, 25);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Group Objek 3D Medali Logo & Cincin Orbit
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    // Material Emas Metalik
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

    // Memuat Tekstur Logo OSIS ke Permukaan Medali
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

      // Medali Koin 3D dengan Logo di Depan & Belakang
      const medallionRadius = 1.65;
      const medallionThickness = 0.24;
      const medallionGeo = new THREE.CylinderGeometry(medallionRadius, medallionRadius, medallionThickness, 64);
      const medallionMaterials = [goldMaterial, logoFaceMaterial, logoFaceMaterial];
      const medallion = new THREE.Mesh(medallionGeo, medallionMaterials);
      medallion.rotation.x = Math.PI / 2;
      emblemGroup.add(medallion);

      // Cincin Bezel Luar Emas
      const rimGeo = new THREE.TorusGeometry(medallionRadius + 0.04, 0.08, 16, 64);
      const rimMesh = new THREE.Mesh(rimGeo, goldMaterial);
      emblemGroup.add(rimMesh);

      // Cincin Bezel Dalam Emas
      const innerRimGeo = new THREE.TorusGeometry(medallionRadius - 0.08, 0.035, 16, 64);
      const innerRimMesh = new THREE.Mesh(innerRimGeo, goldMaterial);
      emblemGroup.add(innerRimMesh);
    });

    // Cincin Orbit Berputar di Sekeliling Logo
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

    // Partikel Debu Emas Melayang
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

    // Interaksi Gerak Mouse (Parallax)
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

    // Loop Animasi
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      emblemGroup.position.y = Math.sin(elapsedTime * 0.9) * 0.15 + targetY * -0.6;
      emblemGroup.position.x = targetX * 0.6;

      emblemGroup.rotation.y = targetX * 1.2 + Math.sin(elapsedTime * 0.4) * 0.12;
      emblemGroup.rotation.x = targetY * 1.0 + Math.cos(elapsedTime * 0.4) * 0.08;

      ring1.rotation.z = elapsedTime * 0.18;
      ring2.rotation.y = -elapsedTime * 0.22;
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