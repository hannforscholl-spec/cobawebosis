import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Logo OSIS
import defaultLogoImg from '../assets/images/LOGO.png';

interface ThreeBackgroundProps {
  logoUrl?: string;
}

export default function ThreeBackground({
  logoUrl,
}: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // =========================================================
    // BASIC SETUP
    // =========================================================

    const width =
      container.clientWidth || window.innerWidth;

    const height =
      container.clientHeight || 942;

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
    } catch (error) {
      console.warn(
        'WebGL tidak aktif, melewati canvas 3D:',
        error
      );

      return;
    }

    renderer.setSize(width, height);

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 2)
    );

    renderer.toneMapping =
      THREE.ACESFilmicToneMapping;

    renderer.toneMappingExposure = 1.25;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(renderer.domElement);

    // =========================================================
    // LIGHTING
    // =========================================================

    const ambientLight =
      new THREE.AmbientLight(
        0xffffff,
        1.35
      );

    scene.add(ambientLight);

    // Gold light
    const goldLight =
      new THREE.DirectionalLight(
        0xffd76a,
        3.0
      );

    goldLight.position.set(
      5,
      5,
      6
    );

    scene.add(goldLight);

    // White / silver light
    const silverLight =
      new THREE.DirectionalLight(
        0xffffff,
        2.2
      );

    silverLight.position.set(
      -5,
      3,
      5
    );

    scene.add(silverLight);

    // Blue subtle light
    const blueLight =
      new THREE.DirectionalLight(
        0x5b8cff,
        0.7
      );

    blueLight.position.set(
      -4,
      -4,
      3
    );

    scene.add(blueLight);

    // Front point light
    const pointLight =
      new THREE.PointLight(
        0xffffff,
        2.5,
        25
      );

    pointLight.position.set(
      0,
      0,
      5
    );

    scene.add(pointLight);

    // =========================================================
    // MAIN GROUPS
    // =========================================================

    const emblemGroup =
      new THREE.Group();

    scene.add(emblemGroup);

    /*
     * Logo dan ring dibuat dalam group yang berbeda.
     *
     * logoGroup:
     * - tetap tegak
     * - tidak ikut rotasi ring
     *
     * ringGroup:
     * - boleh miring
     * - boleh berputar
     */

    const logoGroup =
      new THREE.Group();

    const ringGroup =
      new THREE.Group();

    emblemGroup.add(logoGroup);
    emblemGroup.add(ringGroup);

    // =========================================================
    // MATERIALS
    // =========================================================

    const goldMaterial =
      new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.95,
        roughness: 0.18,
        emissive: 0x3b2600,
        emissiveIntensity: 0.35,
      });

    const silverMaterial =
      new THREE.MeshStandardMaterial({
        color: 0xe7e9ee,
        metalness: 0.95,
        roughness: 0.15,
        emissive: 0x1f232b,
        emissiveIntensity: 0.12,
      });

    const shieldMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x090d16,
        metalness: 0.88,
        roughness: 0.28,
        emissive: 0x03050a,
        emissiveIntensity: 0.12,
      });

    // =========================================================
    // LOAD LOGO
    // =========================================================

    const textureLoader =
      new THREE.TextureLoader();

    const activeLogo =
      logoUrl || defaultLogoImg;

    textureLoader.load(
      activeLogo,
      (texture) => {
        texture.colorSpace =
          THREE.SRGBColorSpace;

        texture.generateMipmaps = true;

        texture.anisotropy =
          renderer.capabilities.getMaxAnisotropy();

        // =====================================================
        // GET ORIGINAL IMAGE RATIO
        // =====================================================

        const image =
          texture.image;

        const imageWidth =
          image?.width || 1;

        const imageHeight =
          image?.height || 1;

        const aspectRatio =
          imageWidth / imageHeight;

        /*
         * Ukuran logo.
         *
         * Tinggi ditentukan,
         * lebar mengikuti ukuran asli gambar.
         */

        const logoHeight = 3.15;

        const logoWidth =
          logoHeight * aspectRatio;

        // =====================================================
        // LOGO FRONT
        // =====================================================

        const logoMaterial =
          new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true,
            metalness: 0.25,
            roughness: 0.3,
            side: THREE.DoubleSide,
            depthWrite: true,
          });

        const logoGeometry =
          new THREE.PlaneGeometry(
            logoWidth,
            logoHeight
          );

        const logoMesh =
          new THREE.Mesh(
            logoGeometry,
            logoMaterial
          );

        /*
         * LOGO TETAP TEGAK
         *
         * Tidak ada rotation X/Y di sini.
         */

        logoMesh.position.set(
          0,
          0,
          0.18
        );

        logoGroup.add(logoMesh);

        // =====================================================
        // SHIELD 3D BACKING
        // =====================================================

        /*
         * Membuat bentuk shield/perisai.
         *
         * Tidak menggunakan:
         * - BoxGeometry
         * - CircleGeometry
         * - CylinderGeometry
         *
         * Jadi bentuk dasarnya benar-benar perisai.
         */

        const shieldWidth =
          logoWidth + 0.22;

        const shieldHeight =
          logoHeight + 0.22;

        const shieldShape =
          new THREE.Shape();

        // Titik kiri atas
        shieldShape.moveTo(
          -shieldWidth / 2,
          shieldHeight * 0.36
        );

        // Lengkungan atas kiri -> tengah
        shieldShape.quadraticCurveTo(
          -shieldWidth * 0.22,
          shieldHeight * 0.50,
          0,
          shieldHeight * 0.48
        );

        // Lengkungan atas tengah -> kanan
        shieldShape.quadraticCurveTo(
          shieldWidth * 0.22,
          shieldHeight * 0.50,
          shieldWidth / 2,
          shieldHeight * 0.36
        );

        // Sisi kanan turun
        shieldShape.lineTo(
          shieldWidth * 0.43,
          shieldHeight * 0.02
        );

        // Lengkungan bawah kanan
        shieldShape.quadraticCurveTo(
          shieldWidth * 0.38,
          -shieldHeight * 0.25,
          0,
          -shieldHeight / 2
        );

        // Lengkungan bawah kiri
        shieldShape.quadraticCurveTo(
          -shieldWidth * 0.38,
          -shieldHeight * 0.25,
          -shieldWidth * 0.43,
          shieldHeight * 0.02
        );

        // Kembali ke kiri atas
        shieldShape.closePath();

        // =====================================================
        // EXTRUDE SHIELD
        // =====================================================

        const shieldGeometry =
          new THREE.ExtrudeGeometry(
            shieldShape,
            {
              depth: 0.16,

              bevelEnabled: true,

              bevelThickness: 0.035,

              bevelSize: 0.035,

              bevelSegments: 5,

              curveSegments: 32,
            }
          );

        shieldGeometry.center();

        const shieldMesh =
          new THREE.Mesh(
            shieldGeometry,
            shieldMaterial
          );

        shieldMesh.position.set(
          0,
          0,
          0.02
        );

        logoGroup.add(shieldMesh);

        // =====================================================
        // SHIELD GOLD BORDER
        // =====================================================

        /*
         * Border mengikuti siluet shield.
         */

        const borderPoints =
          [
            new THREE.Vector3(
              -shieldWidth / 2,
              shieldHeight * 0.36,
              0.17
            ),

            new THREE.Vector3(
              -shieldWidth * 0.43,
              shieldHeight * 0.02,
              0.17
            ),

            new THREE.Vector3(
              -shieldWidth * 0.38,
              -shieldHeight * 0.25,
              0.17
            ),

            new THREE.Vector3(
              0,
              -shieldHeight / 2,
              0.17
            ),

            new THREE.Vector3(
              shieldWidth * 0.38,
              -shieldHeight * 0.25,
              0.17
            ),

            new THREE.Vector3(
              shieldWidth * 0.43,
              shieldHeight * 0.02,
              0.17
            ),

            new THREE.Vector3(
              shieldWidth / 2,
              shieldHeight * 0.36,
              0.17
            ),

            new THREE.Vector3(
              0,
              shieldHeight * 0.48,
              0.17
            ),

            new THREE.Vector3(
              -shieldWidth / 2,
              shieldHeight * 0.36,
              0.17
            ),
          ];

        const shieldCurve =
          new THREE.CatmullRomCurve3(
            borderPoints,
            false,
            'catmullrom',
            0.08
          );

        const borderGeometry =
          new THREE.TubeGeometry(
            shieldCurve,
            96,
            0.026,
            10,
            false
          );

        const borderMesh =
          new THREE.Mesh(
            borderGeometry,
            goldMaterial
          );

        logoGroup.add(borderMesh);

        // =====================================================
        // INNER SHIELD BORDER
        // =====================================================

        const innerScale =
          0.92;

        const innerWidth =
          shieldWidth * innerScale;

        const innerHeight =
          shieldHeight * innerScale;

        const innerPoints =
          [
            new THREE.Vector3(
              -innerWidth / 2,
              innerHeight * 0.36,
              0.175
            ),

            new THREE.Vector3(
              -innerWidth * 0.43,
              innerHeight * 0.02,
              0.175
            ),

            new THREE.Vector3(
              -innerWidth * 0.38,
              -innerHeight * 0.25,
              0.175
            ),

            new THREE.Vector3(
              0,
              -innerHeight / 2,
              0.175
            ),

            new THREE.Vector3(
              innerWidth * 0.38,
              -innerHeight * 0.25,
              0.175
            ),

            new THREE.Vector3(
              innerWidth * 0.43,
              innerHeight * 0.02,
              0.175
            ),

            new THREE.Vector3(
              innerWidth / 2,
              innerHeight * 0.36,
              0.175
            ),

            new THREE.Vector3(
              0,
              innerHeight * 0.48,
              0.175
            ),

            new THREE.Vector3(
              -innerWidth / 2,
              innerHeight * 0.36,
              0.175
            ),
          ];

        const innerCurve =
          new THREE.CatmullRomCurve3(
            innerPoints,
            false,
            'catmullrom',
            0.08
          );

        const innerBorderGeometry =
          new THREE.TubeGeometry(
            innerCurve,
            96,
            0.012,
            8,
            false
          );

        const innerBorderMesh =
          new THREE.Mesh(
            innerBorderGeometry,
            silverMaterial
          );

        logoGroup.add(
          innerBorderMesh
        );

        // =====================================================
        // BACK GLOW
        // =====================================================

        const glowGeometry =
          new THREE.PlaneGeometry(
            logoWidth + 0.75,
            logoHeight + 0.75
          );

        const glowMaterial =
          new THREE.MeshBasicMaterial({
            color: 0xd4af37,
            transparent: true,
            opacity: 0.05,
            blending:
              THREE.AdditiveBlending,
            depthWrite: false,
          });

        const glowMesh =
          new THREE.Mesh(
            glowGeometry,
            glowMaterial
          );

        glowMesh.position.set(
          0,
          0,
          -0.10
        );

        logoGroup.add(glowMesh);
      }
    );

    // =========================================================
    // OUTER ORBIT RING — GOLD
    // =========================================================

    const ringGeo1 =
      new THREE.TorusGeometry(
        2.55,
        0.055,
        18,
        128
      );

    const ring1 =
      new THREE.Mesh(
        ringGeo1,
        goldMaterial
      );

    /*
     * Ring dimiringkan.
     * Logo tidak ikut dimiringkan.
     */

    ring1.rotation.x =
      Math.PI / 3.1;

    ring1.rotation.y =
      Math.PI / 7;

    ringGroup.add(ring1);

    // =========================================================
    // OUTER ORBIT RING — SILVER
    // =========================================================

    const ringGeo2 =
      new THREE.TorusGeometry(
        2.82,
        0.042,
        18,
        128
      );

    const ring2 =
      new THREE.Mesh(
        ringGeo2,
        silverMaterial
      );

    ring2.rotation.x =
      -Math.PI / 3.7;

    ring2.rotation.z =
      Math.PI / 4.5;

    ringGroup.add(ring2);

    // =========================================================
    // THIN DARK ORBIT
    // =========================================================

    const ringGeo3 =
      new THREE.TorusGeometry(
        3.03,
        0.018,
        12,
        128
      );

    const ring3 =
      new THREE.Mesh(
        ringGeo3,
        shieldMaterial
      );

    ring3.rotation.x =
      Math.PI / 2.8;

    ring3.rotation.z =
      -Math.PI / 5;

    ringGroup.add(ring3);

    // =========================================================
    // SMALL GOLD ORBIT
    // =========================================================

    const ringGeo4 =
      new THREE.TorusGeometry(
        2.38,
        0.018,
        12,
        96
      );

    const ring4 =
      new THREE.Mesh(
        ringGeo4,
        goldMaterial
      );

    ring4.rotation.x =
      Math.PI / 3.6;

    ring4.rotation.z =
      -Math.PI / 8;

    ringGroup.add(ring4);

    // =========================================================
    // GOLD FLOATING PARTICLES
    // =========================================================

    const particleCount = 100;

    const particleGeometry =
      new THREE.BufferGeometry();

    const particlePositions =
      new Float32Array(
        particleCount * 3
      );

    for (
      let i = 0;
      i < particleCount * 3;
      i += 3
    ) {
      particlePositions[i] =
        (Math.random() - 0.5) * 15;

      particlePositions[i + 1] =
        (Math.random() - 0.5) * 10;

      particlePositions[i + 2] =
        (Math.random() - 0.5) * 8;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(
        particlePositions,
        3
      )
    );

    const particleMaterial =
      new THREE.PointsMaterial({
        color: 0xffe088,
        size: 0.045,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
      });

    const particleSystem =
      new THREE.Points(
        particleGeometry,
        particleMaterial
      );

    scene.add(
      particleSystem
    );

    // =========================================================
    // MOUSE PARALLAX
    // =========================================================

    let mouseX = 0;
    let mouseY = 0;

    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (
      event: MouseEvent
    ) => {
      mouseX =
        (event.clientX -
          window.innerWidth / 2) *
        0.001;

      mouseY =
        (event.clientY -
          window.innerHeight / 2) *
        0.001;
    };

    window.addEventListener(
      'mousemove',
      onMouseMove,
      { passive: true }
    );

    // =========================================================
    // RESIZE
    // =========================================================

    const handleResize =
      () => {
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

    // =========================================================
    // ANIMATION
    // =========================================================

    const clock =
      new THREE.Clock();

    let animationFrameId = 0;

    const animate =
      () => {
        animationFrameId =
          requestAnimationFrame(
            animate
          );

        const elapsedTime =
          clock.getElapsedTime();

        // Smooth mouse
        targetX +=
          (mouseX - targetX) *
          0.05;

        targetY +=
          (mouseY - targetY) *
          0.05;

        // =====================================================
        // LOGO MOVEMENT
        // =====================================================

        /*
         * Logo sedikit floating.
         * TIDAK dirotasi.
         */

        logoGroup.position.x =
          targetX * 0.42;

        logoGroup.position.y =
          Math.sin(
            elapsedTime * 0.8
          ) *
            0.08 -
          targetY * 0.22;

        // =====================================================
        // RING MOVEMENT
        // =====================================================

        ringGroup.position.x =
          targetX * 0.26;

        ringGroup.position.y =
          -targetY * 0.18;

        // =====================================================
        // RING ROTATION
        // =====================================================

        ring1.rotation.z =
          elapsedTime * 0.15;

        ring2.rotation.y =
          -elapsedTime * 0.18;

        ring3.rotation.z =
          elapsedTime * 0.08;

        ring4.rotation.y =
          elapsedTime * 0.12;

        // =====================================================
        // PARTICLES
        // =====================================================

        particleSystem.rotation.y =
          elapsedTime * 0.018;

        particleSystem.rotation.x =
          Math.sin(
            elapsedTime * 0.1
          ) * 0.03;

        // =====================================================
        // RENDER
        // =====================================================

        renderer.render(
          scene,
          camera
        );
      };

    animate();

    // =========================================================
    // CLEANUP
    // =========================================================

    return () => {
      cancelAnimationFrame(
        animationFrameId
      );

      window.removeEventListener(
        'mousemove',
        onMouseMove
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
      className="
        absolute
        inset-0
        w-full
        h-full
        pointer-events-none
        z-0
      "
    />
  );
}