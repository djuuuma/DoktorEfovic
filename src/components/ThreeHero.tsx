import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const MOBILE_HERO_VIDEO_ID = 'a2ZKy88DM-o';
const MOBILE_EMBED_PARAMS =
  'autoplay=1&mute=1&loop=1&playlist=' +
  MOBILE_HERO_VIDEO_ID +
  '&playsinline=1&controls=0&modestbranding=1&rel=0';

export default function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [showHero, setShowHero] = useState(() =>
    typeof window !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const [isMobileLayout, setIsMobileLayout] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setShowHero(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobileLayout(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!showHero || isMobileLayout || !canvasRef.current || !containerRef.current) return;

    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const subdiv = coarsePointer ? 2 : 5;
    const maxPixelRatio = coarsePointer ? 1 : Math.min(window.devicePixelRatio, 1.75);
    const useVertexNoise = !coarsePointer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false,
      powerPreference: coarsePointer ? 'default' : 'high-performance',
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(maxPixelRatio);

    const geometry = new THREE.IcosahedronGeometry(1, subdiv);
    const material = new THREE.MeshStandardMaterial({
      color: 0xf8f6f0,
      metalness: 0.12,
      roughness: 0.38,
      envMapIntensity: 0.85,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, coarsePointer ? 0.72 : 0.5);
    scene.add(ambientLight);

    if (!coarsePointer) {
      const pointLight = new THREE.PointLight(0xd4af37, 2);
      pointLight.position.set(2, 3, 4);
      scene.add(pointLight);

      const pointLight2 = new THREE.PointLight(0xe6c25d, 1);
      pointLight2.position.set(-2, -3, -4);
      scene.add(pointLight2);
    }

    camera.position.z = 3;

    const originalPositions = geometry.attributes.position.array.slice();
    const normalScratch = new THREE.Vector3();

    let raf = 0;
    const animate = (time: number) => {
      if (useVertexNoise) {
        const positions = geometry.attributes.position.array as Float32Array;
        const orig = originalPositions as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          const ox = orig[i];
          const oy = orig[i + 1];
          const oz = orig[i + 2];

          const noise =
            Math.sin(ox * 2 + time * 0.001) * Math.cos(oy * 2 + time * 0.001) * 0.15;

          normalScratch.set(ox, oy, oz).normalize();
          positions[i] = ox + normalScratch.x * noise;
          positions[i + 1] = oy + normalScratch.y * noise;
          positions[i + 2] = oz + normalScratch.z * noise;
        }
        geometry.attributes.position.needsUpdate = true;
      }

      mesh.rotation.y += coarsePointer ? 0.0012 : 0.002;
      mesh.rotation.z += coarsePointer ? 0.0006 : 0.001;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [showHero, isMobileLayout]);

  if (!showHero) return null;

  if (isMobileLayout) {
    return (
      <div className="pointer-events-none fixed left-0 top-0 -z-10 h-[100dvh] min-h-svh w-full overflow-hidden">
        <iframe
          title="Video pozadine"
          src={`https://www.youtube.com/embed/${MOBILE_HERO_VIDEO_ID}?${MOBILE_EMBED_PARAMS}`}
          className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.15] border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={false}
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="pointer-events-none fixed left-0 top-0 -z-10 h-[100dvh] min-h-svh w-full md:h-screen md:min-h-0">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
