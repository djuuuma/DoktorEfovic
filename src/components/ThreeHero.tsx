import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    // Low subdiv detail + CPU deformation: detail 64 is hundreds of thousands of verts per frame in JS — unusable.
    const geometry = new THREE.IcosahedronGeometry(1, 5);
    const material = new THREE.MeshStandardMaterial({
      color: 0xf8f6f0,
      metalness: 0.12,
      roughness: 0.38,
      envMapIntensity: 0.85,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xD4AF37, 2);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xE6C25D, 1);
    pointLight2.position.set(-2, -3, -4);
    scene.add(pointLight2);

    camera.position.z = 3;

    // Displacement animation
    const originalPositions = geometry.attributes.position.array.slice();
    const normalScratch = new THREE.Vector3();

    let raf = 0;
    const animate = (time: number) => {
      const positions = geometry.attributes.position.array as Float32Array;
      const orig = originalPositions as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = orig[i];
        const y = orig[i + 1];
        const z = orig[i + 2];

        const noise =
          Math.sin(x * 2 + time * 0.001) *
          Math.cos(y * 2 + time * 0.001) *
          0.15;

        normalScratch.set(x, y, z).normalize();
        positions[i] = x + normalScratch.x * noise;
        positions[i + 1] = y + normalScratch.y * noise;
        positions[i + 2] = z + normalScratch.z * noise;
      }
      geometry.attributes.position.needsUpdate = true;

      mesh.rotation.y += 0.002;
      mesh.rotation.z += 0.001;

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
  }, []);

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-screen pointer-events-none -z-10">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
