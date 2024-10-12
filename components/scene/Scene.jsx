"use client";

import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Model(props) {
  const { nodes, materials } = useGLTF("/scene.gltf");
  return (
    <group {...props} dispose={null}>
      <RigidBody type="fixed" colliders="trimesh">
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Object_2.geometry}
            material={materials.Material}
          />
          <mesh
            geometry={nodes.Object_3.geometry}
            material={materials.Material}
          />
          <mesh
            geometry={nodes.Object_4.geometry}
            material={materials.Material}
          />
          <mesh
            geometry={nodes.Object_5.geometry}
            material={materials.Material}
          />
        </group>
      </RigidBody>
    </group>
  );
}

useGLTF.preload("/scene.gltf");
