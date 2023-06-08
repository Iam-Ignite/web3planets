import React,{useState, useEffect, Suspense, useRef} from "react";
import { OrbitControls, Sphere, Stars, Torus, useTexture } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from 'three';
import PlanetOverlay from "./PlanetOverlay";


const DetailsCanvas = ({ details, planetsMap }) => {

  //const texture = useLoader(TextureLoader, planetsMap[details.PlanetAttach].image);
  //const ringTexture = useLoader(TextureLoader, planetsMap[details.PlanetAttach].rings);
  const texture = new THREE.TextureLoader().load(details.PlanetAttach.image);
  const ringTexture = new THREE.TextureLoader().load(details.PlanetAttach.rings);
 
 console.log(details, "called");


    return (
     <Suspense fallback={null} >
       <PlanetOverlay details={details} />
        <Canvas  >
            <Stars
                radius={50}
                depth={0}
                count={250}
                factor={3}
                saturation={0}
                fade
                speed={1}
            />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            {/*<ambientLight intensity={details.name === "Sun" ? 1 : 0.1} />*/}
            <spotLight position={[5, 5, 10]} intensity={1} />
            <mesh>
            {/*
                <Sphere args={[2, 100, 100]} scale={1.4}>
                <meshLambertMaterial attach="material" map={texture} />
                </Sphere>
                */}
                        <sphereGeometry args={[3, 50, 50]} />
                        <meshStandardMaterial map={texture} />
            </mesh>
            { details.PlanetAttach === "saturn" && (
                <mesh>
                <torusGeometry args={[4, 0.5, 2, 10000]} rotation={[1.8, 0, 0]} />
                    <meshLambertMaterial
                    opacity={2}
                    transparent
                    map={ringTexture}
                    />
                </mesh>
            )}
        </Canvas>
      </Suspense>
    )
};

export default DetailsCanvas;