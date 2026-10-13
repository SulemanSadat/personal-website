import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader, SRGBColorSpace, MathUtils } from 'three';
import { projects } from '../data/projects';

function Screens({ light }) {
  const screens = useRef([]);
  const textures = useLoader(TextureLoader, projects.map(project => project.image));
  useEffect(() => { textures.forEach(texture => { texture.colorSpace = SRGBColorSpace; }); }, [textures]);
  useFrame(({ camera }) => {
    screens.current.forEach(group => {
      if (!group) return;
      const distance = camera.position.z - group.position.z;
      group.visible = distance > .5;
      group.children.forEach(mesh => { mesh.material.opacity = MathUtils.clamp((distance - .5) / 4, 0, 1) * (mesh.userData.reflection ? .05 : 1); });
    });
  });
  return projects.map((project, i) => <group ref={node => { screens.current[i] = node; }} key={project.id} position={[i % 2 ? 3.4 : -3.4, .25, -8 - i * 12]} rotation={[0, i % 2 ? -.22 : .22, 0]}>
    <mesh position={[0, 0, -.09]}><boxGeometry args={[5.65, 3.6, .16]} /><meshStandardMaterial color={light ? '#d5dfeb' : '#101925'} metalness={.7} roughness={.3} transparent /></mesh>
    <mesh><planeGeometry args={[5.4, 3.3]} /><meshBasicMaterial map={textures[i]} toneMapped={false} transparent /></mesh>
    <mesh position={[0, -1.84, 0]}><boxGeometry args={[5.6, .018, .06]} /><meshBasicMaterial color={light ? '#1769c2' : '#6baeff'} transparent /></mesh>
    <mesh userData={{ reflection: true }} position={[0, -2.7, -.1]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[5.5, 2]} /><meshBasicMaterial color={light ? '#6d9fd8' : '#366dcc'} transparent opacity={.05} /></mesh>
  </group>);
}

function CameraRig({ progress, mobile = false }) {
  const { camera, invalidate, gl } = useThree();
  useEffect(() => {
    const sharedProgress = progress;
    Object.assign(sharedProgress.current, { invalidate });
    const lost = event => { event.preventDefault(); progress.current.onFailure?.(); };
    gl.domElement.addEventListener('webglcontextlost', lost);
    return () => { Object.assign(sharedProgress.current, { invalidate: undefined }); gl.domElement.removeEventListener('webglcontextlost', lost); };
  }, [progress, invalidate, gl]);
  useFrame(() => {
    const p = progress.current.value;
    const start = mobile ? .34 : .2;
    const travelRange = mobile ? .62 : .76;
    if (p < start) {
      camera.position.set(0, .3, MathUtils.lerp(3, 11, p / start));
      camera.lookAt(0, .1, -12);
    } else {
      const travel = MathUtils.clamp((p - start) / travelRange, 0, 1) * projects.length;
      const index = Math.min(projects.length - 1, Math.floor(travel));
      const side = index % 2 ? 1 : -1;
      const focus = Math.sin((travel % 1) * Math.PI);
      camera.position.set(side * .55 * focus, .3 + .12 * Math.sin(travel * Math.PI), 11 - travel * 12);
      camera.lookAt(side * 1.7 * focus, .1, camera.position.z - 13);
    }
  });
  return null;
}

export default function CinematicWorld({ progress, theme = 'dark', mobile = false }) {
  const light = theme === 'light';
  const palette = light ? {
    background: '#ffffff', ambient: 1.15, sky: '#ffffff', ground: '#d8d8d8',
    floor: '#c9d4e2', frame: '#91a1b6', rail: '#3977bd', strip: '#1769c2',
  } : {
    background: '#050505', ambient: .7, sky: '#8ebfff', ground: '#080808',
    floor: '#0c1018', frame: '#202a39', rail: '#234570', strip: '#74b5ff',
  };
  const frameCount = mobile ? 14 : 23;
  const frames = Array.from({ length: frameCount }, (_, i) => 8 - i * (mobile ? 8 : 5));
  return <Canvas className="cinema-canvas" frameloop="demand" dpr={mobile ? 1 : [1, 1.5]} camera={{ fov: mobile ? 64 : 56, near: .1, far: 140, position: [0, .3, 3] }} gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance', stencil: false }} aria-hidden="true">
    <color attach="background" args={[palette.background]} />
    <ambientLight intensity={palette.ambient} />
    <hemisphereLight args={[palette.sky, palette.ground, 1.6]} />
    <CameraRig progress={progress} mobile={mobile} />
    <mesh position={[0, -2.6, -48]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[30, 150]} /><meshStandardMaterial color={palette.floor} metalness={.65} roughness={.3} /></mesh>
    {frames.map((z, i) => <group key={z} position={[0, 0, z]}>
      {[-1, 1].map(side => <group key={side}>
        <mesh position={[side * 7, .5, 0]}><boxGeometry args={[.12, 6.2, .18]} /><meshStandardMaterial color={palette.frame} metalness={.6} roughness={.45} /></mesh>
        <mesh position={[side * 6.93, .5, .12]}><boxGeometry args={[.018, 6, .018]} /><meshBasicMaterial color={i % 3 ? palette.rail : palette.strip} /></mesh>
        <mesh position={[side * 4, -2.57, 0]}><boxGeometry args={[.025, .015, 4.9]} /><meshBasicMaterial color={palette.rail} /></mesh>
      </group>)}
      <mesh position={[0, 3.6, 0]}><boxGeometry args={[14, .06, .12]} /><meshStandardMaterial color={palette.frame} /></mesh>
    </group>)}
    <Suspense fallback={null}><Screens light={light} /></Suspense>
  </Canvas>;
}


