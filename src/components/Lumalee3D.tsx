import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Lumalee3DProps {
  size?: number;
  position?: [number, number, number];
  enableControls?: boolean;
}

const Lumalee3D: React.FC<Lumalee3DProps> = ({ 
  size = 1, 
  position = [0, 0, 0],
  enableControls = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(200, 200);
    containerRef.current.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create Lumalee body (sphere with emission)
    const bodyGeometry = new THREE.SphereGeometry(1, 32, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff80,
      emissive: 0xffff40,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.9
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    
    // Create flame effect (multiple distorted spheres)
    const flameGroup = new THREE.Group();
    
    // Create 5 flame parts with varied geometries
    for (let i = 0; i < 5; i++) {
      const flameGeometry = new THREE.SphereGeometry(1.2, 8, 8);
      
      // Distort vertices to create flame-like shape
      const positions = flameGeometry.attributes.position;
      for (let j = 0; j < positions.count; j++) {
        const vertex = new THREE.Vector3();
        vertex.fromBufferAttribute(positions, j);
        
        // Add distortion to top vertices
        if (vertex.y > 0) {
          vertex.y += 0.5 + Math.random() * 0.5;
          vertex.x += (Math.random() - 0.5) * 0.3;
          vertex.z += (Math.random() - 0.5) * 0.3;
        }
        
        // Update position
        positions.setXYZ(j, vertex.x, vertex.y, vertex.z);
      }
      
      // Create material with gradient color
      const flameMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xffffff),
        emissive: new THREE.Color(i % 2 === 0 ? 0xffffaa : 0xffddaa),
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
      });
      
      const flame = new THREE.Mesh(flameGeometry, flameMaterial);
      flame.rotation.x = Math.random() * Math.PI;
      flame.rotation.y = Math.random() * Math.PI * 2;
      flame.scale.set(0.9, 1.1, 0.9);
      flameGroup.add(flame);
    }
    
    // Create eyes
    const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.4, 0.2, 0.85);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.4, 0.2, 0.85);
    
    // Create mouth
    const smileGeometry = new THREE.TorusGeometry(0.3, 0.05, 16, 16, Math.PI);
    const smileMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const smile = new THREE.Mesh(smileGeometry, smileMaterial);
    smile.position.set(0, -0.1, 0.85);
    smile.rotation.x = Math.PI;
    
    // Combine all parts
    const lumalee = new THREE.Group();
    lumalee.add(body);
    lumalee.add(flameGroup);
    lumalee.add(leftEye);
    lumalee.add(rightEye);
    lumalee.add(smile);
    
    // Apply position and scale
    lumalee.position.set(...position);
    lumalee.scale.set(size, size, size);
    scene.add(lumalee);
    
    // Add orbit controls for testing
    let controls;
    if (enableControls) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
    }
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate flame parts
      flameGroup.children.forEach((flame, index) => {
        flame.rotation.y += 0.005 + index * 0.001;
        flame.rotation.z += 0.003 + index * 0.001;
        flame.scale.y = 1 + 0.05 * Math.sin(Date.now() * 0.001 + index);
      });
      
      if (controls) {
        controls.update();
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      
      renderer.dispose();
    };
  }, [size, position, enableControls]);
  
  return <div ref={containerRef} style={{ width: '200px', height: '200px' }} />;
};

export default Lumalee3D; 