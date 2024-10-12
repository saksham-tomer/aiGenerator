import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { MathUtils, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { Character } from "./AmyNew";

/**
 *
 * @error Amy model is loading before the world is loaded and the physics engine runs and she falls down
 *
 */

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

export const CharacterController = () => {
  const { WALK_SPEED, RUN_SPEED, ROTATION_SPEED, JUMP_FORCE } = useControls(
    "Character Control",
    {
      WALK_SPEED: { value: 1.3, min: 0.1, max: 4, step: 0.1 },
      RUN_SPEED: { value: 2.8, min: 0.2, max: 12, step: 0.1 },
      ROTATION_SPEED: {
        value: degToRad(0.5),
        min: degToRad(0.1),
        max: degToRad(5),
        step: degToRad(0.1),
      },
      JUMP_FORCE: { value: 5, min: 1, max: 10, step: 0.1 },
    }
  );

  const rb = useRef();
  const container = useRef();
  const character = useRef();

  const [animation, setAnimation] = useState("idle");
  const [isLoaded, setIsLoaded] = useState(false);

  const characterRotationTarget = useRef(0);
  const rotationTarget = useRef(0);
  const cameraTarget = useRef();
  const cameraPosition = useRef();
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const [, get] = useKeyboardControls();
  const isClicking = useRef(false);
  const { rapier, world } = useRapier();

  const [isGrounded, setIsGrounded] = useState(true);

  useEffect(() => {
    const onMouseDown = (e) => {
      isClicking.current = true;
    };
    const onMouseUp = (e) => {
      isClicking.current = false;
    };
    // document.addEventListener('mousedown', onMouseDown);
    // document.addEventListener('mouseup', onMouseUp);
    // document.addEventListener('touchstart', onMouseDown);
    // document.addEventListener('touchend', onMouseUp);

    // Add a delay before setting isLoaded to true
    const loadingTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000); // 1 second delay, adjust as needed

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("touchend", onMouseUp);
      clearTimeout(loadingTimer);
    };
  }, []);

  useFrame(({ camera, mouse }) => {
    if (!isLoaded || !rb.current) return;
    if (rb.current) {
      const vel = rb.current.linvel();

      const movement = {
        x: 0,
        z: 0,
      };
      if (!isGrounded) {
        vel.y -= 9.81 * 0.016; // Apply gravity only when not grounded
      } else {
        vel.y = 0; // Ensure velocity is zero when grounded
      }

      if (get().forward) {
        movement.z = 1;
      }
      if (get().backward) {
        movement.z = -1;
      }

      let speed = get().run ? RUN_SPEED : WALK_SPEED;

      if (isClicking.current) {
        if (Math.abs(mouse.x) > 0.1) {
          movement.x = -mouse.x;
        }
        movement.z = mouse.y + 0.4;
        if (Math.abs(movement.x) > 0.5 || Math.abs(movement.z) > 0.5) {
          speed = RUN_SPEED;
        }
      }

      if (get().left) {
        movement.x = 1;
      }
      if (get().right) {
        movement.x = -1;
      }

      if (movement.x !== 0) {
        rotationTarget.current += ROTATION_SPEED * movement.x;
      }

      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(movement.x, movement.z);
        vel.x =
          Math.sin(rotationTarget.current + characterRotationTarget.current) *
          speed;
        vel.z =
          Math.cos(rotationTarget.current + characterRotationTarget.current) *
          speed;
        if (speed === RUN_SPEED) {
          setAnimation("run");
        } else {
          setAnimation("walk");
        }
      } else {
        vel.x = 0;
        vel.z = 0;
        setAnimation("idle");
      }
      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        0.1
      );

      // Apply gravity
      vel.y -= 9.81 * 0.016; // Assuming 60 FPS

      // Check if grounded
      const origin = rb.current.translation();
      origin.y -= 0.5; // Increase the ray length
      const direction = { x: 0, y: -1, z: 0 };
      const ray = new rapier.Ray(origin, direction);
      const hit = world.castRay(ray, 0.6, true);

      if (hit) {
        setIsGrounded(true);
      } else {
        setIsGrounded(false);
      }

      // Jump
      if (get().jump && isGrounded) {
        vel.y = JUMP_FORCE;
        setAnimation("jump");
      }

      rb.current.setLinvel(vel, true);
    }

    // CAMERA
    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.1
    );

    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.1);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);

      camera.lookAt(cameraLookAt.current);
    }
  });

  return (
    <RigidBody
      colliders={false}
      mass={1}
      type="dynamic"
      ref={rb}
      lockRotations
      position={[9.5, 5, -12]} // Start the character higher up
    >
      <group ref={container}>
        <group ref={cameraTarget} position-z={1.5} />
        <group
          ref={cameraPosition}
          position-y={2.2}
          position-x={0}
          position-z={-3.6}
        />
        <group ref={character}>
          <Character scale={0.18} position-y={0.2} animation={animation} />
        </group>
      </group>
      <CapsuleCollider args={[0.3, 0.3]} position={[0, 0.8, 0]} />
    </RigidBody>
  );
};
