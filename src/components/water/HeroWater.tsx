"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { heroPointer } from "./heroPointer";

/**
 * The hero thesis: a surface of water you can actually disturb, with the
 * process happening on it — drops fall out of the air and land, and every
 * landing leaves a real ring in the surface.
 *
 * Light-mode water is the hard part. This is milky teal lit from above, not a
 * dark ocean, and the camera sits low so the surface keeps to the bottom of
 * the frame and the headline keeps the sky.
 */

const RIPPLE_SLOTS = 8;

/** Ring buffer of live disturbances, shared between the drops and the shader. */
class RippleBuffer {
  slots: THREE.Vector4[];
  private cursor = 0;

  constructor() {
    // xy = origin in plane space, z = start time, w = strength
    this.slots = Array.from(
      { length: RIPPLE_SLOTS },
      () => new THREE.Vector4(0, 0, -1000, 0)
    );
  }

  push(x: number, y: number, time: number, strength: number) {
    this.slots[this.cursor].set(x, y, time, strength);
    this.cursor = (this.cursor + 1) % RIPPLE_SLOTS;
  }
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uPointer;
  uniform float uPointerActive;
  uniform vec4  uRipples[${RIPPLE_SLOTS}];

  varying float vElevation;
  varying vec2  vUv;
  varying vec3  vPos;
  varying float vPointerGlow;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float t = uTime;

    // Ambient swell — four crossing sines, no two in phase
    float h  = sin(pos.x * 0.34 + t * 0.72) * 0.108;
    h += sin(pos.y * 0.95 - t * 0.61) * 0.072;
    h += sin((pos.x * 0.5 + pos.y) * 1.15 + t * 1.35) * 0.036;
    h += sin((pos.x * 0.22 - pos.y * 0.7) * 2.4 - t * 1.9) * 0.017;

    // Cursor wake
    float d = distance(pos.xy, uPointer);
    h += uPointerActive * 0.20 * sin(d * 3.8 - t * 4.0) * exp(-d * 0.85);
    vPointerGlow = uPointerActive * exp(-d * 1.5);

    // Every landed drop and every click, still ringing out
    for (int i = 0; i < ${RIPPLE_SLOTS}; i++) {
      vec4 r = uRipples[i];
      float age = t - r.z;
      if (age > 0.0 && age < 4.0) {
        float dc = distance(pos.xy, r.xy);
        float ring = sin(dc * 5.2 - age * 5.6) * exp(-dc * 0.7) * exp(-age * 1.35);
        h += ring * r.w;
      }
    }

    pos.z += h;
    vElevation = h;
    vPos = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;

  varying float vElevation;
  varying vec2  vUv;
  varying vec3  vPos;
  varying float vPointerGlow;

  const vec3 SHALLOW = vec3(0.960, 0.982, 0.986);
  const vec3 MID     = vec3(0.639, 0.851, 0.882);
  const vec3 DEEP    = vec3(0.153, 0.647, 0.714);

  void main() {
    // uv.y = 1 at the far edge; near the camera reads deeper, the distance
    // pales out into the page.
    float depth = vUv.y;

    vec3 col = mix(DEEP, MID, smoothstep(0.0, 0.50, depth));
    col = mix(col, SHALLOW, smoothstep(0.44, 0.96, depth) * 0.96);

    // Crests catch the light — the main source of surface detail
    float crest = smoothstep(0.005, 0.095, vElevation);
    col = mix(col, vec3(1.0), crest * 0.55);
    // Troughs read a shade cooler, so the swell has two sides
    float trough = smoothstep(-0.005, -0.085, vElevation);
    col = mix(col, DEEP, trough * 0.22);

    // Caustics — two drifting interference patterns
    float c1 = sin(vPos.x * 1.6 + uTime * 0.62) * sin(vPos.y * 2.3 - uTime * 0.5);
    float c2 = sin(vPos.x * 2.9 - uTime * 0.95) * sin(vPos.y * 4.1 + uTime * 0.8);
    float caustic = pow(max(c1 * 0.6 + c2 * 0.4, 0.0), 3.0);
    col += caustic * 0.17;

    // A cool highlight tracking the cursor, so the pointer reads as a light
    col = mix(col, vec3(1.0), clamp(vPointerGlow, 0.0, 1.0) * 0.32);

    // Translucent throughout, dissolving into the page at the far edge
    float alpha = (0.60 + 0.26 * (1.0 - depth)) * (1.0 - smoothstep(0.52, 0.99, depth));
    alpha *= smoothstep(0.0, 0.05, vUv.x) * (1.0 - smoothstep(0.95, 1.0, vUv.x));

    gl_FragColor = vec4(col, alpha);
  }
`;

const WATER_PLANE = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const WATER_Z = -7.4;

function WaterSurface({ ripples }: { ripples: RippleBuffer }) {
  const { camera } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const hit = useMemo(() => new THREE.Vector3(), []);
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const active = useRef(0);
  const lastClick = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPointerActive: { value: 0 },
      uRipples: { value: ripples.slots },
    }),
    [ripples]
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;

    // Project the cursor onto the water plane, wherever it is in the hero
    pointer.set(heroPointer.nx, heroPointer.ny);
    raycaster.setFromCamera(pointer, camera);
    const found = raycaster.ray.intersectPlane(WATER_PLANE, hit);

    if (found && heroPointer.active) {
      uniforms.uPointer.value.set(hit.x, -(hit.z - WATER_Z));
      if (heroPointer.clickSeq !== lastClick.current) {
        lastClick.current = heroPointer.clickSeq;
        ripples.push(hit.x, -(hit.z - WATER_Z), t, 0.34);
      }
    }

    const target = found && heroPointer.active ? 1 : 0;
    active.current += (target - active.current) * Math.min(1, delta * 3.2);
    uniforms.uPointerActive.value = active.current;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, WATER_Z]}>
      <planeGeometry args={[34, 9, 220, 96]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

type Drop = {
  x: number;
  z: number;
  y: number;
  speed: number;
  wait: number;
  scale: number;
};

function newDrop(stagger: number): Drop {
  return {
    x: (Math.random() - 0.5) * 11,
    z: WATER_Z + (Math.random() - 0.35) * 5.5,
    y: 3.4 + Math.random() * 1.6,
    speed: 2.4 + Math.random() * 1.5,
    wait: stagger,
    // Small. A drop that reads as a shape rather than a glint stops being a
    // drop and starts being a blob on the headline.
    scale: 0.022 + Math.random() * 0.016,
  };
}

/**
 * Air becoming water, on a loop. Each drop falls, lands, and hands a ring to
 * the surface — the five-step process compressed into one gesture.
 */
function FallingDrops({ ripples }: { ripples: RippleBuffer }) {
  const COUNT = 5;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const drops = useRef<Drop[]>(
    Array.from({ length: COUNT }, (_, i) => newDrop(i * 1.15))
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    const step = Math.min(delta, 0.05);

    drops.current.forEach((d, i) => {
      if (d.wait > 0) {
        d.wait -= step;
        dummy.scale.setScalar(0);
        dummy.position.set(d.x, -50, d.z);
      } else {
        d.y -= d.speed * step;
        d.speed += 5.2 * step; // gravity

        if (d.y <= 0) {
          ripples.push(d.x, -(d.z - WATER_Z), t, 0.2 + d.scale * 1.6);
          drops.current[i] = newDrop(0.5 + Math.random() * 2.4);
          dummy.scale.setScalar(0);
          dummy.position.set(d.x, -50, d.z);
        } else {
          // Stretch with speed, the way a falling drop actually looks
          const stretch = 1 + Math.min(d.speed * 0.12, 0.9);
          dummy.position.set(d.x, d.y, d.z);
          dummy.scale.set(d.scale, d.scale * stretch, d.scale);
        }
      }
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 20, 16]} />
      {/* Transmission needs its own render pass and does not survive at this
          scale — at a few pixels across it just resolves to a flat disc. A
          bright, mostly-transparent surface reads as a falling glint, which is
          all a drop this size ever looks like. */}
      <meshStandardMaterial
        color="#ffffff"
        emissive="#bfe9f0"
        emissiveIntensity={0.55}
        roughness={0.12}
        metalness={0}
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

/** Pitch the camera just far enough to see the surface, no further. */
function Rig() {
  const { camera } = useThree();
  camera.position.set(0, 2.0, 0.4);
  camera.lookAt(0, 0.9, -10);
  camera.updateProjectionMatrix();
  return null;
}

/**
 * A studio built out of geometry rather than a downloaded HDR — the drops
 * refract a white key and a teal fill, so their highlights are brand colours
 * and nothing has to be fetched over the network.
 */
function BrandStudio() {
  return (
    <Environment resolution={128} frames={1}>
      <mesh scale={60}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#eef6f8" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 9, -6]} rotation={[-0.5, 0, 0]} scale={[14, 10, 1]}>
        <planeGeometry />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-10, 0, 2]} rotation={[0, 1.1, 0]} scale={[9, 9, 1]}>
        <planeGeometry />
        <meshBasicMaterial color="#0790a3" />
      </mesh>
    </Environment>
  );
}

function Scene() {
  const ripples = useMemo(() => new RippleBuffer(), []);
  return (
    <>
      <Rig />
      <BrandStudio />
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 8, 2]} intensity={1.8} />
      <WaterSurface ripples={ripples} />
      <FallingDrops ripples={ripples} />
    </>
  );
}

export default function HeroWater() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 2, 0.4], fov: 42 }}
    >
      <Scene />
    </Canvas>
  );
}
