import React from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Portal({ animation, ...props }) {
  const group = React.useRef();
  const { nodes, materials, animations } = useGLTF("/portal.glb");
  const { actions } = useAnimations(animations, group);
  React.useEffect(() => {
    actions[animation]?.reset().fadeIn(0.24).play();
    return () => actions?.[animation]?.fadeOut(0.24);
  }, [animation]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="Day_05_-_Magic_Gate_optim2fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="ring001"
                  position={[-11.828, 417.807, 3.719]}
                  rotation={[-1.367, 1.436, 2.897]}
                  scale={100}
                >
                  <mesh
                    name="ring001_glow_0"
                    geometry={nodes.ring001_glow_0.geometry}
                    material={materials.glow}
                  />
                </group>
                <group
                  name="Mball002"
                  position={[-57.765, 100.03, 0.734]}
                  rotation={[-Math.PI / 2, 0, 2.374]}
                  scale={[8.24, 8.234, 8.151]}
                >
                  <mesh
                    name="Mball002_glow_0"
                    geometry={nodes.Mball002_glow_0.geometry}
                    material={materials.glow}
                  />
                </group>
                <group
                  name="ring002"
                  position={[-11.828, 417.807, 3.719]}
                  rotation={[-1.905, 1.566, -3.068]}
                  scale={100}
                >
                  <mesh
                    name="ring002_glow_0"
                    geometry={nodes.ring002_glow_0.geometry}
                    material={materials.glow}
                  />
                </group>
                <group
                  name="ring003"
                  position={[-11.828, 417.807, 3.719]}
                  rotation={[2.447, 0.56, -0.705]}
                  scale={100}
                >
                  <mesh
                    name="ring003_glow_0"
                    geometry={nodes.ring003_glow_0.geometry}
                    material={materials.glow}
                  />
                </group>
                <group
                  name="gate"
                  position={[0, 0, 0.664]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="gate_rock_0"
                    geometry={nodes.gate_rock_0.geometry}
                    material={materials.rock}
                  />
                </group>
                <group
                  name="Mball076"
                  position={[138.46, 14.604, -2.318]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={14.362}
                >
                  <mesh
                    name="Mball076_glow_0"
                    geometry={nodes.Mball076_glow_0.geometry}
                    material={materials.glow}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/portal.glb");
