import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Suspense } from 'react';
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { AmbientLight, Material, MeshBasicMaterial, PlaneGeometry, SphereGeometry } from "three";
//import { useTexture, PerspectiveCamera, OrbitControls, RenderTexture  } from "@react-three/drei";
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
import { Controls as PointerControls } from "../components/planets-utils/Control";
//import { EffectComposer, SSAO } from '@react-three/postprocessing'
//import { BaseControl, Controls, useControl } from "react-three-gui";
//import { useGLTF, PresentationControls, Environment, ContactShadows, Html } from '@react-three/drei';
import {Maincanvas} from '../components/planets-utils/maincanvas'
import Planets from '../components/planets-utils/Planent';
import Background from '../components/planets-utils/Background';
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import ZoomCursorControls from "../components/planets-utils/ZoomCursorControls"
import { useTexture,  RenderTexture  } from "@react-three/drei";
import Modal from '../components/planets-utils/Modal';
import { animated, Globals, useSpring } from "@react-spring/three";



export default function PlanetsPage() {


  //const rotationX = useControl("Rotation X", { type: "number", spring: true });
  //const ssao = useControl("ssao", { type: "boolean" });
  Globals.assign({
	frameLoop: "always",
});
 
 /*

 const planetsMap = [
   {
    name: "mecury",
    image: "/mercurymap.jpg"
   },
   {
    name: "venus",
    image: "/venusmap.jpg",
    atmosphere: "/venusAtmosphere.jpeg"
   },
   {
    name: "earth",
    image: "/earthmap.jpg"
   },
   {
    name: "mars",
    image: "/marsmap.jpg"
   },
   {
    name: "jupiter",
    image: "/jupitermap.jpg"
   },
   {
    name: "saturn",
    image: "/saturnmap.jpg",
    rings: "/saturnrings.png"
   },
   {
    name: "uranus",
    image: "/uranusmap.jpg"
   },
   {
    name: "naptune",
    image: "/neptunemap.jpg"
   },
 ]



  const TokensDetails = [
    {
      id: 1,
      tokenName: "token1",
      tokenDescription: ` What is Lorem Ipsum? Lorem Ipsum
                          is simply dummy text of the printing
                          and typesetting industry. Lorem 
                          Ipsum has been the industry's standard 
                          dummy text ever since the 1500s, 
                          when an unknown printer took a galley
                          of type and scrambled it to make a 
                          type specimen book. It has survived 
                          not only five centuries, but also the
                          leap into electronic typesetting`,
      chain: "BNB",
      img_url: "/Anon.jpg",
      size: "",
      votes: 30,
      MC: 2500,
      PlanetAttach: 0,
    },
    {
      id: 2,
      tokenName: "token2",
      tokenDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, quam.",
      chain: "BNB",
      img_url: "/burning.jpg",
      votes: 300,
      MC: 2000,
      PlanetAttach: 5,
    },
    {
      id: 3,
      tokenName: "token3",
      tokenDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, quam.",
      chain: "BNB",
      img_url: "/horris.jpg",
      votes: 20,
      MC: 3000,
      PlanetAttach: 7,
    },
    {
      id: 4,
      tokenName: "token4",
      tokenDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, quam.",
      chain: "BNB",
      img_url: "/rabbit.jpg",
      votes: 15,
      MC: 7000,
      PlanetAttach: 4,
    },
    {
      id: 5,
      tokenName: "token5",
      tokenDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, quam.",
      chain: "BNB",
      img_url: "/roundbanana.jpg",
      votes: 70,
      MC: 500,
      PlanetAttach: 2,
    },
    {
      id: 6,
      tokenName: "token6",
      tokenDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, quam.",
      chain: "BNB",
      img_url: "/umbrella.jpg",
      votes: 200,
      MC: 1100,
      PlanetAttach: 1,
    },
    {
      id: 7,
      tokenName: "token7",
      tokenDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, quam.",
      chain: "BNB",
      img_url: "/bunnies.jpg",
      votes: 206,
      MC: 8000,
      PlanetAttach: 0,
    },
    {
      id: 8,
      tokenName: "token8",
      tokenDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, quam.",
      chain: "BNB",
      img_url: "img7",
      votes: 206,
      MC: 8000,
      PlanetAttach: 6,
    },
    {
      id: 9,
      tokenName: "token9",
      tokenDescription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, quam.",
      chain: "BNB",
      img_url: "img7",
      votes: 206,
      MC: 8000,
      PlanetAttach: 4,
    },
  ]
 */









  const[holdCam, setCam] = useState();
  const[getscene, setGetScene] = useState();
  const [currentDetails, setCurrentDetails] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [TokensDetails, SetTokensDetails] = useState();


  const controlsRef = useRef();


  const getProjects = async () => {
      const getp = await fetch('http://192.168.8.101:8000/projects', {
      method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
          });
      const valueGotten = await getp.json()

          console.log(valueGotten, "checking");

        SetTokensDetails(valueGotten);
  }


  const moreInfo = async (data) => {
    console.log(data);
    const updateClick = await fetch('http://192.168.8.101:8000/clicks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          id: data._id
        }),
    });
    console.log(updateClick);
    setCurrentDetails(data);
    setOpenModal(true);
  }


  useEffect(() => {

  console.log("Use effect called")
  getProjects();

  }, [])

  return (
    <div className='h-screen relative overflow-hidden'
    >
      <div className="relative h-screen z-20">
       <Maincanvas 
        TokensDetails={TokensDetails}
        holdCam={holdCam}
        setCam={setCam}
        controlsRef={controlsRef}
        moreInfo={moreInfo}
        setGetScene={setGetScene}
       />
      </div>
        {/* Render the modal when showModal is true */}
        {openModal && <Modal currentDetails={currentDetails} setOpenModal={setOpenModal} />}

    </div>
  )
}








function Ecliptic({ xRadius = 1, zRadius = 1, orbits }) {
  const points = [];

  for (let index = 0; index < 64; index++) {
    const angle = (index / 64) * 2 * Math.PI;
    const x = xRadius * Math.cos(angle);
    const z = zRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }

  points.push(points[0]);

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color="#4e433f" linewidth={10} />
    </line>
  );
}