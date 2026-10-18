"use client";
import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { BufferGeometry, Float32BufferAttribute, DoubleSide, MathUtils, Group } from "three";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";

function PaperFallback() {
  return <svg className="paper-fallback" viewBox="0 0 600 500" aria-hidden="true"><g transform="translate(290 265) rotate(-18)"><path d="M0 0L-180-145-48 25 95 4 150-40 76-22Z" fill="var(--paper-front)" /><path d="M0 0L-15-185 68-37 95 4Z" fill="var(--paper-fold)" /><path d="M-48 25L-135 100-86 22 0 0Z" fill="var(--paper-edge)" /><path d="M0 0L-180-145-48 25Z" fill="var(--paper-fold)" opacity=".45" /></g><g transform="translate(430 100) scale(.35) rotate(-8)"><path d="M0 0L-180-145-48 25 95 4 150-40 76-22 0-170Z" fill="var(--paper-fold)" /></g></svg>;
}
interface ArtBoundaryProps { children: ReactNode }
interface ArtBoundaryState { failed: boolean }
class ArtBoundary extends Component<ArtBoundaryProps, ArtBoundaryState> {
  state: ArtBoundaryState = { failed: false };
  static getDerivedStateFromError(): ArtBoundaryState { return { failed: true }; }
  render() { return this.state.failed ? <PaperFallback /> : this.props.children; }
}

// Hand-folded planes: two lifted wings, a slender body, a beak and a forked tail.
// Each face is intentional, like a small sheet of paper folded into a swallow.
const faces = [
  [[0, 0, .12], [-1.65, 1.45, -.12], [-.65, -.12, .15]],
  [[0, 0, .12], [-1.65, 1.45, -.12], [-.4, .38, .42]],
  [[0, 0, .12], [-.18, 1.8, -.8], [.67, .25, -.12]],
  [[0, 0, .12], [-.18, 1.8, -.8], [.15, .6, -.16]],
  [[-.65, -.12, .15], [0, 0, .12], [.85, .12, .03]],
  [[0, 0, .12], [.85, .12, .03], [.57, .35, -.06]],
  [[.57, .35, -.06], [.85, .12, .03], [1.26, .44, -.03]],
  [[-.65, -.12, .15], [0, 0, .12], [-1.15, -.85, -.05]],
  [[-.65, -.12, .15], [0, 0, .12], [-.48, -.8, -.28]],
];
type BirdProps = ThreeElements["group"] & { light: boolean };
function Bird({ light, ...props }: BirdProps) {
  const geometries = useMemo(() => faces.map(points => {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(points.flat(), 3));
    geometry.computeVertexNormals();
    return geometry;
  }), []);
  useEffect(() => () => geometries.forEach(g => g.dispose()), [geometries]);
  const colors = light ? ["#e5e2db", "#faf7ef", "#345eac", "#6a8ccb", "#f9f6ed", "#e0dfda", "#eeeeea", "#a0b7d5", "#567aaf"] : ["#a6bdd9", "#faf2e1", "#7299cc", "#c4d6ed", "#f8f0e0", "#c2cfde", "#f7f0e2", "#5479ab", "#b8cce0"];
  return <group {...props}>{geometries.map((geometry, i) => <mesh geometry={geometry} key={i}><meshStandardMaterial color={colors[i]} side={DoubleSide} roughness={.85} metalness={0} /></mesh>)}</group>;
}
interface FlockProps { light: boolean; still: boolean; turn: React.MutableRefObject<number>; scroll: React.MutableRefObject<number> }
function Flock({ light, still, turn, scroll }: FlockProps) {
  const group = useRef<Group | null>(null);
  useFrame(({ clock, pointer }, delta) => {
    const t = clock.elapsedTime;
    const ease = still ? 1 : 1 - Math.exp(-Math.min(delta, .1) * 4);
    if (!group.current) return;
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, turn.current + (still ? 0 : pointer.x * .12), ease);
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, -.12 + (still ? 0 : pointer.y * .07 + scroll.current * .16), ease);
    group.current.position.y = still ? 0 : Math.sin(t * .65) * .065 + scroll.current * .2;
    group.current.rotation.z = still ? 0 : Math.sin(t * .35) * .025;
  });
  return <group ref={group}>
    <Bird light={light} position={[-.1, -.1, .2]} rotation={[.12, -.24, -.24]} scale={1.12} />
    <Bird light={light} position={[1.37, 1.85, -.6]} rotation={[.25, -.4, -.4]} scale={.38} />
    <Bird light={light} position={[-1.3, -1.6, -.8]} rotation={[.1, .2, -.1]} scale={.23} />
  </group>;
}
export default function PaperFlight() {
  const host = useRef<HTMLDivElement>(null);
  const invalidate = useRef(() => {});
  const turn = useRef(0);
  const scroll = useRef(0);
  const drag = useRef<number | null>(null);
  const [active, setActive] = useState(true);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const [light, setLight] = useState(false);
  const [reduced, setReduced] = useState(false);
  const still = reduced || paused;
  useEffect(() => {
    const theme = new MutationObserver(() => setLight(document.documentElement.dataset.theme === "light"));
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting && !document.hidden));
    if (host.current) observer.observe(host.current);
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReduced(media.matches);
    const onVisibility = () => { const rect = host.current?.getBoundingClientRect(); if (rect) setActive(!document.hidden && rect.bottom > 0 && rect.top < innerHeight); };
    const onScroll = () => { scroll.current = Math.min(scrollY / innerHeight, 1); };
    media.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { theme.disconnect(); observer.disconnect(); media.removeEventListener("change", onMotion); document.removeEventListener("visibilitychange", onVisibility); window.removeEventListener("scroll", onScroll); };
  }, []);
  useEffect(() => {
    if (!active || still || failed) return;
    const timer = setInterval(() => invalidate.current(), 1000 / 30);
    return () => clearInterval(timer);
  }, [active, still, failed]);
  const changeView = (amount: number): void => { turn.current = MathUtils.clamp(turn.current + amount, -.65, .65); invalidate.current(); };
  return <div className="paper-flight" ref={host}>
    <div className="paper-stage" role="img" aria-label="Three folded-paper swallows carrying an idea into flight">
      {failed ? <PaperFallback /> : <ArtBoundary><Canvas camera={{ position: [0, 0, 7.5], fov: 44 }} dpr={[1, 1.5]} frameloop="demand" gl={{ alpha: true, antialias: true, powerPreference: "low-power" }} fallback={<PaperFallback />} onCreated={({ gl, invalidate: redraw }) => { invalidate.current = redraw; gl.domElement.addEventListener("webglcontextlost", () => setFailed(true), { once: true }); }}>
        <ambientLight intensity={light ? 1.6 : .9} /><directionalLight position={[-3, 5, 5]} intensity={light ? 2 : 2.8} color={light ? "#fff7e8" : "#e0ebff"} /><directionalLight position={[4, -2, 2]} intensity={.5} color="#8baeff" />
        <Flock light={light} still={still} turn={turn} scroll={scroll} />
      </Canvas></ArtBoundary>}
    </div>
    <div className="flight-touch" aria-hidden="true" onPointerDown={e => { if (e.button !== 0) return; drag.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId); }} onPointerMove={e => { if (drag.current === null) return; changeView((e.clientX - drag.current) * .006); drag.current = e.clientX; }} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }} />
    {!failed && <div className="flight-controls"><button type="button" aria-label="Turn paper birds left" onClick={() => changeView(-.2)}>←</button><span>CHANGE PERSPECTIVE</span><button type="button" aria-label="Turn paper birds right" onClick={() => changeView(.2)}>→</button>{!reduced && <button type="button" aria-label={paused ? "Play artwork motion" : "Pause artwork motion"} onClick={() => setPaused(!paused)}>{paused ? <IconPlayerPlay size={13} /> : <IconPlayerPause size={13} />}</button>}</div>}
  </div>;
}

