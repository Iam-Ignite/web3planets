import React, {useState, useEffect, useRef} from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
//import { OrbitControls } from "./OrbitControls";
import * as THREE from 'three';
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

// @ts-ignore
/*
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: Partial<OrbitControls> & {
        ref?: React.Ref<OrbitControls>;
        args: [THREE.Camera, HTMLElement?];
      };
    }
  }
}
*/

export const Controls = () => {
  const { camera, gl } = useThree();
  const [cameraPosition, setCameraPosition] = useState([0, 0, 10]);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  console.log(gl,"gl variable");
  const ref = useRef(null); 
  useFrame(() => {
    ref?.current?.update();
    //camera.update();
  });






  useEffect(() => {
    

    window.addEventListener('resize', function(){
      var width = window.innerWidth;
      var height = window.innerHeight;
      gl.setSize(width, height);
      camera.aspect=width/height;
      camera.updateProjectionMatrix();
    });


    var controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.minDistance = 500;
    controls.maxDistance = 1000;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minZoom = 0;
    controls.maxZoom = Infinity;
    
    console.log(this, "working on")

  




    window.addEventListener("wheel", event => {
      console.log("calling me");
      var factor = 15;
      var mX = (event.clientX / window.innerWidth) * 2 - 1;
      var mY = -(event.clientY / window.innerHeight) * 2 + 1;
      var vector = new THREE.Vector3(mX, mY, 0.1);
      vector.unproject(camera);
      vector.sub(camera.position);
      if (event.deltaY < 0) {
         camera.position.addVectors(camera.position, vector.setLength(factor));
         controls.target.addVectors(controls.target, vector.setLength(factor));
      } else {
         camera.position.subVectors(camera.position, vector.setLength(factor));
         controls.target.subVectors(controls.target, vector.setLength(factor));
      }
      
  });



      controls.update();

    return () => {
      controls.dispose();
    };

  }, [camera, gl]);

  return null;
};