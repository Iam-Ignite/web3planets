import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Suspense } from 'react';
import { Canvas, useThree, useFrame } from "@react-three/fiber";
//import sun from "../../img/logo.jpg";
//import secondSun from "../../img/Secondsun.jpg";
//import thirdSun from "../../img/thirdSun.png";
//import mecury from "../../img/burning.jpg";
//import venus from "../../img/whale.jpg";
//import earth from "../../img/bunnies.jpg";
//import mars from "../../img/horris.jpg";
//import jupiter from "../../img/Anon.jpg";
//import saturn from "../../img/rabbit.jpg";
//import uranus from "../../img/bigA.jpg";
//import neptune from "../../img/roundbanana.jpg";
//import pluto from "../../img/umbrella.jpg";
//import { angleToradians } from "../utils/angles";
import * as THREE from "three";
import Planets from './Planent';
import { OrbitControls } from "@react-three/drei";
import ZoomCursorControls from "./ZoomCursorControls"
import { useTexture } from "@react-three/drei";


        //TokensDetails={TokensDetails}
        //planetsMap={planetsMap}
        //holdCam={holdCam}
        //setCam={setCam}
        //controlsRef={controlsRef}
        //moreInfo={moreInfo}

export function Maincanvas({setCam, setGetScene, TokensDetails, holdCam, controlsRef, moreInfo}) {
  return (
    <Suspense fallback={null}>
        <Canvas
          {...{
            camera: { position: [50, 200, 50] },
          }}
          className="canvas-contain"
          id='canvasHold'
           //onClick={ handleClick }
           //onWheel={handleWheel}
        >
          <MyCameraReactsToStateChanges setCam={setCam} setGetScene={setGetScene} />
          <ambientLight />
          <Stars />
          <spotLight
            intensity={0.6}
            position={[30, 30, 50]}
            angle={0.2}
            penumbra={1}
            castShadow
          />
         {TokensDetails?.map((data, index) => {

          const x = index + 1.5
         
          const space = [x * 7, 0, 20];
          console.log(space, "space") 
          return(
            <Planets
              index={index}
              key={index}
              //eachPlanet={eachPlanet} 
              //planetPosition={space}
              //planetSize={[2, 70, 70]}
              //planetrad={20 * x}
            //getindex={getindex}
            //rotation-x={rotationX}
            distance={27 * x}
            speed={0.05}
            texture={data.planet_url}
            moreInfo={moreInfo}
            data={data}
            />
          )
         })}

          {/*<OrbitControls ref={controlsRef}  />*/}
          <ZoomCursorControls ref={controlsRef} />


          <TextureSun />



        </Canvas>

      </Suspense>

  )
}






export const Stars = () => {
  let group = useRef();
  let theta = 0;
  const [colorSet, setColorSet] = useState("lightpink");
  useFrame(() => {
    if (group.current) {
      // Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
      const r = 5 * Math.sin(THREE.MathUtils.degToRad((theta += 0.01)));
      const s = Math.cos(THREE.MathUtils.degToRad(theta * 2));
      group.current.rotation.set(r, r, r);
      //group.current.scale.set(s, s, s);
    }
  });

  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(0.35, 24, 24);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(`${colorSet}`)
    });
    const coords = new Array(1000)
      .fill()
      .map(i => [
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
        Math.random() * 800 - 400
      ]);
    if (colorSet === "lightpink") {
      setColorSet("#ffffff")
    } else {
      setColorSet("lightpink")
    }
    return [geo, mat, coords];
  }, []);

  return (
    <mesh ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </mesh>
  );
}


const TextureSun = (props) => {
  const terrainTexture = useTexture("/sunmap.png");
  //positions of orbit color

  let orbitColor = {
    0: "#ffffff",
    1: "#b3b3b5",
    2: "#e8a968",
    3: "#25adda",
    4: "#ed6042",
    5: "#ef952f",
    6: "#f5ae37",
    7: "#6fd2dc",
    8: "#7575d7",
  }





  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[10, 80, 80]} />
      <meshStandardMaterial  map={terrainTexture}/>
      {/*<Ecliptic xRadius={14} zRadius={14} orbits={`#b3b3b5`} />*/}
      <ambientLight intensity={0.5} />
    </mesh>
  );

}


function MyCameraReactsToStateChanges({setCam, setGetScene}) {

  const { camera, gl, scene } = useThree();
  setCam(camera);
  setGetScene(scene);
}
