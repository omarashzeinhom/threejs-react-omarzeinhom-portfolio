import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  useScroll,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../config";
import { Avatar } from "./Avatar";
import { Background } from "./Background";
import { Office } from "./Office";
import { Projects } from "./Projects";

export const Experience = (props) => {
  const { menuOpened } = props;
  const { viewport } = useThree();
  const data = useScroll();

  const isMobile = window.innerWidth < 768;
  const responsiveRatio = viewport.width / 12;
  const officeScaleRatio = Math.max(0.5, Math.min(0.9 * responsiveRatio, 0.9));

  const [section, setSection] = useState(0);

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  const characterContainerAboutRef = useRef();

  const [characterAnimation, setCharacterAnimation] = useState("Typing");
  useEffect(() => {
    setCharacterAnimation("Falling");
    setTimeout(() => {
      setCharacterAnimation(
        section  === 0 ? "Typing" : "Standing" || "Falling",

      );
    }, 500);
  }, [section]);

  const characterGroup = useRef();

  useFrame((state) => {
    let curSection = Math.floor(data.scroll.current * data.pages);

    if (curSection > 4) {
      curSection = 4;
    }

    if (curSection !== section) {
      setSection(curSection);
    }

    state.camera.position.x = cameraPositionX.get();
    state?.camera?.lookAt(cameraLookAtX.get(), 0, 0);

    if (section === 0) {
      characterContainerAboutRef.current.getWorldPosition(
        characterGroup.current.position
      );
    }
  });

  return (
    <>
      <Background />
      <motion.group
        ref={characterGroup}
        rotation={[-3, 1.2, 3.2]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        animate={ "" + section}
        transition={{
          duration: 0.4,
        }}
        variants={{
          0: {
            scaleX: officeScaleRatio,
            scaleY: officeScaleRatio,
            scaleZ: officeScaleRatio,
          },
          1: {
            y: isMobile ? -viewport.height - 5 : -viewport.height + 0.2,
            x: isMobile ? 3 : 0,
            z: isMobile ? -15 : 5,
            rotateX: 0,
            rotateY: isMobile ? -Math.PI / 7 : 0,
            rotateZ: 0,
            scaleX: isMobile ? 2.5 : 1.5,
            scaleY: isMobile ? 3.5 : 1.5,
            scaleZ: isMobile ? 2.5 : 1.5,
          },
          2: {
            x: isMobile ? -0.7 : -1.5,
            y: -viewport.height * 2 + 0.2,
            z: 0,
            rotateX: 0,
            rotateY: Math.PI / 2,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          },
          3: {
            y: isMobile
              ? -viewport.height * 3 - 0.1
              : -viewport.height * 3 + 0.2,
            x: isMobile ? -1 : 1,
            z: isMobile ? 2 : 3,
            rotateX: isMobile ? 0 : 1,
            rotateY: isMobile ? Math.PI / 4 : 4.7,
            rotateZ: isMobile ? 0 : 1,
            scaleX: isMobile ? 0.9 : 1.2,
            scaleY: isMobile ? 0.8 : 1.2,
            scaleZ: isMobile ? 0.8 : 1.2,
          },
          4: {
            y: isMobile ? -viewport.height - 5 : -viewport.height + 0.2,
            x: isMobile ? 3 : 0,
            z: isMobile ? -15 : 5,
            rotateX: 0,
            rotateY: isMobile ? -Math.PI / 7 : 0,
            rotateZ: 0,
            scaleX: isMobile ? 2.5 : 1.5,
            scaleY: isMobile ? 3.5 : 1.5,
            scaleZ: isMobile ? 2.5 : 1.5,
          },
          5: {
            y: isMobile ? -viewport.height - 5 : -viewport.height + 0.2,
            x: isMobile ? 3 : 0,
            z: isMobile ? -15 : 5,
            rotateX: 0,
            rotateY: isMobile ? -Math.PI / 7 : 0,
            rotateZ: 0,
            scaleX: isMobile ? 2.5 : 1.5,
            scaleY: isMobile ? 3.5 : 1.5,
            scaleZ: isMobile ? 2.5 : 1.5,
          },
        }}
      >
        <Avatar animation={characterAnimation} wireframe={section === 2} />
      </motion.group>

      <ambientLight intensity={0.9} />

      <motion.group
        position={[
          isMobile ? 0 : 1.5 * officeScaleRatio,
          isMobile ? -viewport.height / 6 : 2,
          2,
        ]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        rotation-y={-Math.PI / 4}
        animate={{
          y: isMobile ? -viewport.height / 6 : 0,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <Office section={section} />
        <group
          ref={characterContainerAboutRef}
          name="CharacterSpot"
          position={[0.05, 0.1, -0.57]}
          rotation={[-Math.PI, 0.42, -Math.PI]}
        ></group>
      </motion.group>

      {/* SKILLS */}

      <motion.group
        position={[
          0,
          isMobile ? -viewport.height : -1.5 * officeScaleRatio,
          -15,
        ]}
        animate={{
          z: section === 1 ? 0 : -10,
          y:
            section === 1
              ? -viewport.height
              : isMobile
              ? -viewport.height
              : -1.5 * officeScaleRatio,
        }}
      >
        <directionalLight position={[-1, 5, 7]} intensity={0.1} />
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 1.4, 2]}>
            <sphereGeometry radius={5} />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"yellow"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[2.7, 2.8, 2.7]} position={[3, 1, -18]}>
            <torusKnotGeometry tube={10} radius={5} />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.9}
              speed={3}
              color="red"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1, 1, 1]} position={[-3, -1, -11]}>
            <torusKnotGeometry tube={10} radius={5} />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"green"}
            />
          </mesh>
          <mesh scale={[1, 1, 1]} position={[-2, -0.5, -9]}>
            <ringGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={3}
              speed={4}
              color={"blue"}
            />
          </mesh>
          <mesh scale={[1, 1, 1]} position={[4, -3.5, -5]}>
            <capsuleGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={3}
              speed={4}
              color={"orange"}
            />
          </mesh>
        </Float>
      </motion.group>
      <spotLight intensity={1} scale={[4, 3, 4]} position={[3, 3, 3]} />

      <Projects />


    </>
  );
};
