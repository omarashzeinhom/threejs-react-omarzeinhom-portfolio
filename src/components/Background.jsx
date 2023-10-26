import { Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";


export const Background = () => {
  const data = useScroll();
  const tl = useRef();
  const material = useRef();
  const color = useRef({
    color: "#d4b797",
  });


  useFrame(() => {
    tl?.current?.progress(data?.scroll?.current);
    material.current.color = new THREE.Color(color.current.color);
  });

  useEffect(() => {
    tl.current = gsap?.timeline();
    
    tl?.current?.to(color.current, {
      color: "#0066CC",
    });
    tl?.current?.to(color.current, {
      color: "#39a78e",
    });
    tl?.current?.to(color.current, {
      color: "#000000",
    });
  }, []);

  return (
    <group>
      <Sphere scale={[35, 35, 35]}>
        <meshBasicMaterial
          ref={material}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>
    </group>
  );
};
