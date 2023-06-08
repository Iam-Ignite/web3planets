import React, { useRef } from "react";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { extend, useThree } from "@react-three/fiber";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { useGesture } from "react-use-gesture";
import * as THREE from 'three';
import { OrbitControls } from "@react-three/drei";



//extend({ OrbitControls });


const ZoomCursorControls = ({controlsRef, orbitControlsRef, }) => {

  const { camera, gl } = useThree();


  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      mouseButtons={{
        RIGHT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        LEFT: THREE.MOUSE.ROTATE,
      }}
      args={[camera, gl.domElement]}

    />
  );
};
export default ZoomCursorControls;
