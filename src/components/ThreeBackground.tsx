import { useEffect, useRef } from 'react';
import * as THREE from 'three';
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

    // ==========================================
    // SCENE & CAMERA
    // ==========================================
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      1000
    );

    camera.position.set(0, 0, 7.5);

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
    } catch (err) {
      console.warn('WebGL tidak aktif:', err);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(renderer.domElement);

    // ==========================================
    // LIGHTING
    // ==========================================

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // GOLD
    const goldLight = new THREE.DirectionalLight(0xffd76a, 3);
    goldLight.position.set(5, 5, 5);
    scene.add(goldLight);

    // WHITE / SILVER
    const silverLight = new THREE.DirectionalLight(0xffffff, 2);
    silverLight.position.set(-5, 2, 5);
    scene.add(silverLight);

    // BLUE SUBTLE
    const blueLight = new THREE.DirectionalLight(0x5b8cff, 0.8);
    blueLight.position.set(-4, -4, 3);
    scene.add(blueLight);

    const pointLight = new THREE.PointLight(
      0xffffff,
      2.5,
      25
    );

    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // ==========================================
    // MAIN GROUP
    // ==========================================

    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    // Separate groups:
    // logo = tetap lurus
    // rings = boleh miring / bergerak

    const logoGroup = new THREE.Group();
    const ringGroup = new THREE.Group();

    emblemGroup.add(logoGroup);
    emblemGroup.add(ringGroup);

    // ==========================================
    // MATERIALS
    // ==========================================

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.2,
      emissive: 0x3a2500,
      emissiveIntensity: 0.35,
    });

    const silverMaterial = new THREE.MeshStandardMaterial({
      color: 0xe5e7eb,
      metalness: 0.95,
      roughness: 0.18,
      emissive: 0x222222,
      emissiveIntensity: 0.15,
    });

    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x0b1020,
      metalness: 0.8,
      roughness: 0.28,
    });

    // ==========================================
    // LOAD LOGO
    // ==========================================

    const textureLoader = new THREE.TextureLoader();
    const activeLogo = logoUrl || defaultLogoImg;

    textureLoader.load(
      activeLogo,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.generateMipmaps = true;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        // Ambil ukuran asli gambar
        const image = texture.image;

        const imageWidth = image.width || 1;
        const imageHeight = image.height || 1;

        const aspectRatio = imageWidth / imageHeight;

        // ------------------------------------------
        // Ukuran logo utama
        // ------------------------------------------

        // Tinggi logo
        const logoHeight = 3.2;

        // Lebar mengikuti rasio asli gambar
        const logoWidth = logoHeight * aspectRatio;

        // ------------------------------------------
        // LOGO FACE
        // ------------------------------------------

        const logoMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          metalness: 0.2,
          roughness: 0.3,
          side: THREE.DoubleSide,
        });

        const logoGeometry = new THREE.PlaneGeometry(
          logoWidth,
          logoHeight
        );

        const logoMesh = new THREE.Mesh(
          logoGeometry,
          logoMaterial
        );

        /*
         * PENTING:
         * Logo TIDAK diberi rotation X/Y.
         * Jadi logo tetap lurus menghadap kamera.
         */

        logoMesh.position.set(0, 0, 0.15);

        logoGroup.add(logoMesh);

        // ==========================================
        // 3D BACKING / DEPTH
        // ==========================================

        /*
         * Memberikan efek ketebalan 3D
         * tanpa mengubah bentuk logo.
         */

        const depthGeometry = new THREE.BoxGeometry(
          logoWidth + 0.10,
          logoHeight + 0.10,
          0.14
        );

        const depthMesh = new THREE.Mesh(
          depthGeometry,
          darkMaterial
        );

        depthMesh.position.set(0, 0, 0);

        logoGroup.add(depthMesh);

        // ==========================================
        // GOLD EDGE / FRAME
        // ==========================================

        const frameThickness = 0.035;

        const frameMaterial = goldMaterial;

        const frameTop = new THREE.Mesh(
          new THREE.BoxGeometry(
            logoWidth + 0.16,
            frameThickness,
            0.08
          ),
          frameMaterial
        );

        const frameBottom = new THREE.Mesh(
          new THREE.BoxGeometry(
            logoWidth + 0.16,
            frameThickness,
            0.08
          ),
          frameMaterial
        );

        const frameLeft = new THREE.Mesh(
          new THREE.BoxGeometry(
            frameThickness,
            logoHeight + 0.16,
            0.08
          ),
          frameMaterial
        );

        const frameRight = new THREE.Mesh(
          new THREE.BoxGeometry(
            frameThickness,
            logoHeight + 0.16,
            0.08
          ),
          frameMaterial
        );

        frameTop.position.y = logoHeight / 2 + 0.08;
        frameBottom.position.y = -(logoHeight / 2 + 0.08);

        frameLeft.position.x = -(logoWidth / 2 + 0.08);
        frameRight.position.x = logoWidth / 2 + 0.08;

        frameTop.position.z = 0.10;
        frameBottom.position.z = 0.10;
        frameLeft.position.z = 0.10;
        frameRight.position.z = 0.10;

        logoGroup.add(frameTop);
        logoGroup.add(frameBottom);
        logoGroup.add(frameLeft);
        logoGroup.add(frameRight);

        // ==========================================
        // SMALL GOLD GLOW BEHIND LOGO
        // ==========================================

        const glowGeometry = new THREE.PlaneGeometry(
          logoWidth + 0.6,
          logoHeight + 0.6
        );

        const glowMaterial = new THREE.MeshBasicMaterial({
          color: 0xd4af37,
          transparent: true,
          opacity: 0.055,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const glowMesh = new THREE.Mesh(
          glowGeometry,
          glowMaterial
        );

        glowMesh.position.z = -0.12;

        logoGroup.add(glowMesh);
      }
    );

    // ==========================================
    // DECORATIVE GOLD RING
    // ==========================================

    const ringGeo1 = new THREE.TorusGeometry(
      2.65,
      0.055,
      18,
      128
    );

    const ring1 = new THREE.Mesh(
      ringGeo1,
      goldMaterial
    );

    ring1.rotation.x = Math.PI / 3.1;
    ring1.rotation.y = Math.PI / 7;

    ringGroup.add(ring1);

    // ==========================================
    // DECORATIVE SILVER RING
    // ==========================================

    const ringGeo2 = new THREE.TorusGeometry(
      2.88,
      0.045,
      18,
      128
    );

    const ring2 = new THREE.Mesh(
      ringGeo2,
      silverMaterial
    );

    ring2.rotation.x = -Math.PI / 3.8;
    ring2.rotation.z = Math.PI / 4.5;

    ringGroup.add(ring2);

    // ==========================================
    // THIRD DARK RING
    // ==========================================

    const ringGeo3 = new THREE.TorusGeometry(
      3.08,
      0.018,
      12,
      128
    );

    const ring3 = new THREE.Mesh(
      ringGeo3,
      darkMaterial
    );

    ring3.rotation.x = Math.PI / 2.7;
    ring3.rotation.z = -Math.PI / 5;

    ringGroup.add(ring3);

    // ==========================================
    // PARTICLES
    // ==========================================

    const particleCount = 100;

    const particleGeo = new THREE.BufferGeometry();

    const particlePos = new Float32Array(
      particleCount * 3
    );

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] =
        (Math.random() - 0.5) * 15;

      particlePos[i + 1] =
        (Math.random() - 0.5) * 10;

      particlePos[i + 2] =
        (Math.random() - 0.5) * 8;
    }

    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(
        particlePos,
        3
      )
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xffe088,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });

    const particleSystem =
      new THREE.Points(
        particleGeo,
        particleMat
      );

    scene.add(particleSystem);

    // ==========================================
    // MOUSE PARALLAX
    // ==========================================

    let mouseX = 0;
    let mouseY = 0;

    let targetX = 0;
    let targetY = 0;

    const windowHalfX =
      window.innerWidth / 2;

    const windowHalfY =
      window.innerHeight / 2;

    const onDocumentMouseMove = (
      event: MouseEvent
    ) => {
      mouseX =
        (event.clientX - windowHalfX) *
        0.001;

      mouseY =
        (event.clientY - windowHalfY) *
        0.001;
    };

    window.addEventListener(
      'mousemove',
      onDocumentMouseMove,
      { passive: true }
    );

    // ==========================================
    // RESIZE
    // ==========================================

    const handleResize = () => {
      if (!container) return;

      const newWidth =
        container.clientWidth ||
        window.innerWidth;

      const newHeight =
        container.clientHeight ||
        942;

      camera.aspect =
        newWidth / newHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        newWidth,
        newHeight
      );
    };

    window.addEventListener(
      'resize',
      handleResize,
      { passive: true }
    );

    // ==========================================
    // ANIMATION
    // ==========================================

    const clock = new THREE.Clock();

    let animationFrameId: number;

    const animate = () => {
      animationFrameId =
        requestAnimationFrame(animate);

      const elapsedTime =
        clock.getElapsedTime();

      targetX +=
        (mouseX - targetX) * 0.05;

      targetY +=
        (mouseY - targetY) * 0.05;

      // ------------------------------------------
      // LOGO POSITION
      // ------------------------------------------

      /*
       * Logo hanya bergerak sedikit.
       * Tidak diputar sehingga tetap lurus.
       */

      logoGroup.position.x =
        targetX * 0.45;

      logoGroup.position.y =
        Math.sin(
          elapsedTime * 0.8
        ) * 0.08 -
        targetY * 0.25;

      // ------------------------------------------
      // RINGS PARALLAX
      // ------------------------------------------

      ringGroup.position.x =
        targetX * 0.3;

      ringGroup.position.y =
        -targetY * 0.2;

      // ------------------------------------------
      // RING ROTATION
      // ------------------------------------------

      ring1.rotation.z =
        elapsedTime * 0.16;

      ring2.rotation.y =
        -elapsedTime * 0.20;

      ring3.rotation.z =
        elapsedTime * 0.10;

      // ------------------------------------------
      // PARTICLES
      // ------------------------------------------

      particleSystem.rotation.y =
        elapsedTime * 0.018;

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {
      cancelAnimationFrame(
        animationFrameId
      );

      window.removeEventListener(
        'mousemove',
        onDocumentMouseMove
      );

      window.removeEventListener(
        'resize',
        handleResize
      );

      renderer.dispose();

      while (container.firstChild) {
        container.removeChild(
          container.firstChild
        );
      }
    };
  }, [logoUrl]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}