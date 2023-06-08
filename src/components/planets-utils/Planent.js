import React, { useRef, useMemo, Suspense } from 'react';
import { useTexture, PerspectiveCamera, OrbitControls, Ring, RenderTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from '@react-three/drei';



export default function Planets({ distance, speed, index, texture, moreInfo, data }) {

  /*
      const random = (a, b) => a + Math.random() * b;
  
  
  
      const xRadius = props.planetrad;
      const zRadius = props.planetrad;
      const speed = random(0.1, 0.1);
      const offset = random(0, Math.PI * 2);
      const rotationSpeed = random(0.001, 0.0001);
  
  
      const planetRef = React.useRef();
  
      useFrame(({ clock }) => {
          const t = clock.getElapsedTime() * speed + offset;
          const x = xRadius * Math.sin(t);
          const z = zRadius * Math.cos(t);
  
              planetRef.current.position.x = x;
              planetRef.current.position.z = z;
              planetRef.current.rotation.y += rotationSpeed;
  
      });
   */

  const terrainTexture = useTexture(texture);
  const planetRef = useRef();
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);


  const handleImageClick = (event) => {
    console.log("working check")
    event.stopPropagation(); // Prevent event propagation
    //planetRef.current.dispatchEvent(new Event('click')); // Forward click event to the group
  };

  // Use useMemo to create the position of the planet based on its distance from the sun
  const initialPosition = useMemo(() => {
    const angle = initialAngle + index * speed;
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;
    return [x, 0, z];
  }, [distance, initialAngle, index, speed]);


  //console.log(position, index, "positioning");


  // Use useFrame to update the rotation of the planet based on its speed
  useFrame(({ clock }) => {
    if (planetRef.current) {
      const elapsedTime = clock.getElapsedTime();
      const adjustedTime = elapsedTime - index * 2;
      const direction = index % 2 === 0 ? 1 : -1;
      const angle = initialAngle + adjustedTime * speed * direction;
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      planetRef.current.position.set(x, 0, z);
    }
  });

  return (
    <mesh
        ref={planetRef}
        scale={2}
        position={initialPosition}
        onClick={() => moreInfo(data)}

    >

      <mesh>
        {/* 
                 <mesh rotation={[10, 0, 0]}  >
                    <planeGeometry args={[3.5, 3.5]} />
                    <meshStandardMaterial map={terrainTexture} />
                    <pointLight position={[0, 0, 0]} />
                </mesh> 
                */}
        <sphereGeometry args={[3, 50, 50]} />
        <meshStandardMaterial map={terrainTexture} />
      </mesh>
      {/* HTML content ≈ */}
      <Html scale={100} rotation={[Math.PI / 2, 0, 0]}
        onClick={() => moreInfo(data)}
        >
          {/*<h3>{data.tokenName}</h3>*/}
          <div className="w-[35px] h-auto flex justify-center items-center rounded-[100px]">
            <img src={data.img_url} alt={data.tokenName} className='w-full h-full rounded-[100px]' />
          </div>
          
      </Html>
    </mesh>


  )
}