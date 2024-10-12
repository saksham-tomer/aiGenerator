import React from "react";
import { PositionalAudio, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Market(props) {
  const { nodes, materials } = useGLTF("/Market.glb");
  return (
    <group {...props} dispose={null}>
      <PositionalAudio
        url="/medieval.mp3"
        volume={0.5}
        // distanceFactor={100}

        loop={true}
        autoplay={true}
      />
      <RigidBody type="fixed" colliders="hull">
        <group scale={0.01}>
          <mesh
            geometry={nodes.Cylinder054_Medieval_0.geometry}
            material={materials.Medieval}
            rotation={[-1.556, 0.028, -1.219]}
            scale={9.165}
          />
          <mesh
            geometry={nodes.Cube062_COLLIDER_0.geometry}
            material={materials.COLLIDER}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            scale={100}
          />
        </group>
      </RigidBody>
    </group>
  );
}

useGLTF.preload("/Market.glb");
