import React, { useState } from "react";
import { AmbientLight, Material, MeshBasicMaterial, PlaneGeometry, SphereGeometry } from "three";
import * as THREE from 'three';


export default function Background() {



    return (
        <mesh>
            {
                Array(200).fill().forEach((data, index) => {
                    const randomCoordinates = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
                    let x;
                    let y;
                    let z;
                    x = randomCoordinates[0];
                    y = randomCoordinates[1];
                    z = randomCoordinates[2];

                    return (
                        <mesh position={[x, y, z]}>
                            <sphereGeometry attach="geometry" args={[0.25, 24, 24]} />
                            <meshStandardMaterial attach="material" color={0Xffffff} />
                        </mesh>
                    )

                })
            }
        </mesh>
    );
}