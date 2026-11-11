// Cena 3D do notebook com o painel da CloudStudy, desenhada ao vivo conforme o scroll.
// Fica num arquivo separado para o three.js so ser baixado quando a secao chega perto da tela.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type FilmScene = { render: (progress: number) => void; resize: () => void; dispose: () => void };

const W = 3.04; // largura do notebook
const D = 2.08; // profundidade da base
const T = 0.07; // espessura da base
const LH = 2.0; // altura da tampa
const LT = 0.034; // espessura da tampa
const SW = 2.86; // tela
const SH = (SW * 900) / 1440;
const OPEN = -0.3; // tampa aberta, um pouco alem da vertical
const CLOSED = Math.PI / 2;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ss = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function roundedRect(w: number, h: number, r: number, x = -w / 2, y = -h / 2) {
  const s = new THREE.Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function canvasTexture(w: number, h: number, paint: (x: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  paint(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function rr(x: CanvasRenderingContext2D, l: number, t: number, w: number, h: number, r: number) {
  x.beginPath();
  x.moveTo(l + r, t);
  x.arcTo(l + w, t, l + w, t + h, r);
  x.arcTo(l + w, t + h, l, t + h, r);
  x.arcTo(l, t + h, l, t, r);
  x.arcTo(l, t, l + w, t, r);
  x.closePath();
}

// Teclado, trackpad e grades de som pintados numa textura: detalhe sem custo de geometria.
function deckTexture() {
  return canvasTexture(1520, 1040, (x) => {
    x.fillStyle = "#b9bcc2";
    x.fillRect(0, 0, 1520, 1040);
    x.fillStyle = "#0c0d0f";
    rr(x, 150, 70, 1220, 520, 22);
    x.fill();
    const rows = [14, 14, 13, 12, 11];
    let y = 86;
    rows.forEach((n, r) => {
      const h = r === 0 ? 62 : 88;
      const kw = (1188 - (n - 1) * 9) / n;
      for (let i = 0; i < n; i += 1) {
        const g = x.createLinearGradient(0, y, 0, y + h);
        g.addColorStop(0, "#2a2b2f");
        g.addColorStop(1, "#1f2023");
        x.fillStyle = g;
        rr(x, 166 + i * (kw + 9), y, kw, h, 9);
        x.fill();
      }
      y += h + 9;
    });
    const widths = [80, 80, 80, 100, 420, 100, 80, 80, 104];
    let kx = 166;
    widths.forEach((kw) => {
      x.fillStyle = "#232427";
      rr(x, kx, y, kw, 72, 9);
      x.fill();
      kx += kw + 9;
    });
    // grades de som
    x.fillStyle = "rgba(40,42,46,.55)";
    for (let i = 0; i < 16; i += 1) for (let j = 0; j < 74; j += 1) {
      if ((i + j) % 2) continue;
      x.fillRect(46 + i * 5, 96 + j * 6, 2.4, 2.4);
      x.fillRect(1396 + i * 5, 96 + j * 6, 2.4, 2.4);
    }
    // trackpad
    x.fillStyle = "#b1b4ba";
    rr(x, 500, 640, 520, 340, 20);
    x.fill();
    x.strokeStyle = "rgba(60,64,70,.5)";
    x.lineWidth = 2.5;
    x.stroke();
    // recorte para abrir a tampa
    x.fillStyle = "rgba(60,64,70,.45)";
    rr(x, 660, 1022, 200, 30, 14);
    x.fill();
  });
}

function shadowTexture() {
  return canvasTexture(512, 512, (x) => {
    x.clearRect(0, 0, 512, 512);
    // desenha o retangulo fora da area e deixa so a sombra borrada dentro (funciona no Safari)
    x.shadowColor = "rgba(12,24,56,.5)";
    x.shadowBlur = 46;
    x.shadowOffsetX = 600;
    x.fillStyle = "#000";
    x.fillRect(-600 + 96, 122, 320, 268);
  });
}

function cursorTexture() {
  return canvasTexture(96, 96, (x) => {
    x.translate(6, 4);
    x.beginPath();
    x.moveTo(0, 0);
    x.lineTo(0, 66);
    x.lineTo(17, 51);
    x.lineTo(29, 78);
    x.lineTo(41, 73);
    x.lineTo(29, 46);
    x.lineTo(52, 46);
    x.closePath();
    x.shadowColor = "rgba(0,0,0,.55)";
    x.shadowBlur = 6;
    x.shadowOffsetY = 2;
    x.fillStyle = "#fff";
    x.fill();
    x.shadowColor = "transparent";
    x.lineWidth = 4;
    x.lineJoin = "round";
    x.strokeStyle = "#0b0d12";
    x.stroke();
  });
}

const SCREEN_FRAGMENT = `
uniform sampler2D tA; uniform sampler2D tB; uniform float uMix; uniform float uBright;
varying vec2 vUv;
void main() {
  vec2 q = (vUv - .5) * vec2(1.6, 1.);
  vec2 dd = abs(q) - (vec2(.8, .5) - .014);
  if (length(max(dd, 0.)) - .014 > 0.) discard; // cantos arredondados da tela
  vec4 col = mix(texture2D(tA, vUv), texture2D(tB, vUv), uMix);
  gl_FragColor = vec4(col.rgb * uBright, 1.);
  #include <colorspace_fragment>
}`;
const SCREEN_VERTEX = "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }";

// Roteiro. Tudo e funcao do progresso p (0 a 1), entao rolar para tras desfaz cada passo.
// Camera: "wide" e uma posicao solta no estudio; "uv" olha de frente para um ponto da tela
// (u, v de 0 a 1) a uma distancia d.
type Key = { p: number; wide?: [number[], number[]]; uv?: [number, number, number] };
const KEYS: Key[] = [
  { p: 0, wide: [[0, 3.7, 6.2], [0, 0.3, 0.15]] },
  { p: 0.15, wide: [[0, 1.95, 6.9], [0, 0.95, -0.3]] },
  { p: 0.25, uv: [0.5, 0.5, 4.6] },
  { p: 0.3, uv: [0.44, 0.66, 2.9] }, // painel: numeros e proxima aula
  { p: 0.37, uv: [0.42, 0.6, 2.8] },
  { p: 0.41, uv: [0.5, 0.52, 3.5] }, // aula: a pergunta
  { p: 0.55, uv: [0.5, 0.46, 3.4] },
  { p: 0.6, uv: [0.5, 0.31, 3.35] }, // aula: o Nimbo explica o erro
  { p: 0.67, uv: [0.5, 0.31, 3.25] },
  { p: 0.71, uv: [0.55, 0.57, 4.15] }, // simulado
  { p: 0.86, uv: [0.56, 0.57, 4.0] },
  { p: 0.93, uv: [0.5, 0.5, 4.6] },
  { p: 1, wide: [[0, 1.95, 6.9], [0, 0.95, -0.3]] },
];
// Telas (s0..s8 em public/dashboard-scroll) e o instante em que cada uma entra.
// 0 painel, 1-4 aula (0 a 3 respostas marcadas), 5 aula corrigida, 6-8 simulado.
const SCREENS: [number, number][] = [[0, 0], [0.374, 1], [0.434, 2], [0.474, 3], [0.514, 4], [0.564, 5], [0.685, 6], [0.754, 7], [0.804, 8]];
const FADE = 0.012;
// Caminho do cursor: [p, u, v]. Cada parada coincide com um clique.
const CURSOR: [number, number, number][] = [
  [0.31, 0.7, 0.2], [0.365, 0.296, 0.334], [0.4, 0.5, 0.4], [0.43, 0.651, 0.515], [0.47, 0.349, 0.374], [0.51, 0.349, 0.23],
  [0.56, 0.81, 0.049], [0.69, 0.86, 0.12], [0.75, 0.692, 0.337], [0.8, 0.518, 0.263], [0.86, 0.6, 0.18],
];
const CLICKS = [0.37, 0.43, 0.47, 0.51, 0.56, 0.75, 0.8];
const SCREEN_COUNT = 9;

export async function createFilmScene(canvas: HTMLCanvasElement, size: "lg" | "sm"): Promise<FilmScene> {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTarget = pmrem.fromScene(new RoomEnvironment(), 0.03);
  scene.environment = envTarget.texture;
  scene.environmentIntensity = 0.9;
  const camera = new THREE.PerspectiveCamera(28, 4 / 3, 0.05, 60);
  const key = new THREE.DirectionalLight("#ffffff", 1.6);
  key.position.set(-2, 6, 5);
  scene.add(key);

  const loader = new THREE.TextureLoader();
  const loadScreen = (name: string) =>
    loader.loadAsync(`/dashboard-scroll/${name}-${size}.webp`).then((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      t.generateMipmaps = true;
      return t;
    });
  const textures = await Promise.all(Array.from({ length: SCREEN_COUNT }, (_, i) => loadScreen(`s${i}`)));
  // Envia todas as telas para a placa de video ja: sem isso, a primeira troca de tela engasga.
  textures.forEach((t) => renderer.initTexture(t));

  const aluminium = new THREE.MeshStandardMaterial({ color: "#a7abb2", roughness: 0.34, metalness: 1 });
  const rig = new THREE.Group();
  scene.add(rig);

  const bevel = { bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3, curveSegments: 10 };
  const baseGeometry = new THREE.ExtrudeGeometry(roundedRect(W, D, 0.13), { depth: T - 0.024, ...bevel });
  baseGeometry.rotateX(-Math.PI / 2);
  const base = new THREE.Mesh(baseGeometry, aluminium);
  base.position.y = 0.012;
  rig.add(base);
  const deck = new THREE.Mesh(new THREE.ShapeGeometry(roundedRect(W - 0.05, D - 0.05, 0.11), 10), new THREE.MeshStandardMaterial({ map: deckTexture(), roughness: 0.62, metalness: 0.12, envMapIntensity: 0.6 }));
  // ShapeGeometry usa as coordenadas como UV: normaliza para 0..1
  const deckUv = deck.geometry.attributes.uv;
  for (let i = 0; i < deckUv.count; i += 1) deckUv.setXY(i, deckUv.getX(i) / (W - 0.05) + 0.5, deckUv.getY(i) / (D - 0.05) + 0.5);
  deck.rotation.x = -Math.PI / 2;
  deck.position.y = T + 0.0015;
  rig.add(deck);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(W * 1.6, D * 1.9), new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false, toneMapped: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0, 0.002, 0.05);
  rig.add(shadow);
  const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, W * 0.72, 16), new THREE.MeshStandardMaterial({ color: "#2a2b2e", roughness: 0.5, metalness: 0.6 }));
  hinge.rotation.z = Math.PI / 2;
  hinge.position.set(0, T + 0.012, -D / 2 + 0.04);
  rig.add(hinge);

  const lid = new THREE.Group();
  lid.position.set(0, T + 0.014, -D / 2 + 0.045);
  rig.add(lid);
  const shell = new THREE.Mesh(new THREE.ExtrudeGeometry(roundedRect(W, LH, 0.12, -W / 2, 0), { depth: LT - 0.024, ...bevel }), aluminium);
  shell.position.z = -LT;
  lid.add(shell);
  const bezel = new THREE.Mesh(new THREE.ShapeGeometry(roundedRect(W - 0.03, LH - 0.03, 0.105, -(W - 0.03) / 2, 0.015), 10), new THREE.MeshStandardMaterial({ color: "#050506", roughness: 0.16, metalness: 0.3 }));
  bezel.position.z = 0.0012;
  lid.add(bezel);
  const uniforms = { tA: { value: textures[0] }, tB: { value: textures[0] }, uMix: { value: 0 }, uBright: { value: 1 } };
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(SW, SH), new THREE.ShaderMaterial({ uniforms, vertexShader: SCREEN_VERTEX, fragmentShader: SCREEN_FRAGMENT, toneMapped: false }));
  screen.position.set(0, LH - 0.075 - SH / 2, 0.003);
  lid.add(screen);
  const cam = new THREE.Mesh(new THREE.CircleGeometry(0.012, 16), new THREE.MeshBasicMaterial({ color: "#1b1d22" }));
  cam.position.set(0, LH - 0.04, 0.002);
  lid.add(cam);
  const cursorSize = 0.11;
  const cursorGeometry = new THREE.PlaneGeometry(cursorSize, cursorSize);
  cursorGeometry.translate(cursorSize / 2 - 0.007, -cursorSize / 2 + 0.005, 0);
  const cursorMaterial = new THREE.MeshBasicMaterial({ map: cursorTexture(), transparent: true, depthWrite: false, toneMapped: false });
  const cursor = new THREE.Mesh(cursorGeometry, cursorMaterial);
  screen.add(cursor);

  const point = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const pos = new THREE.Vector3();
  const look = new THREE.Vector3();
  const pos2 = new THREE.Vector3();
  const look2 = new THREE.Vector3();
  const resolve = (k: Key, outPos: THREE.Vector3, outLook: THREE.Vector3) => {
    if (k.wide) {
      outPos.fromArray(k.wide[0]);
      outLook.fromArray(k.wide[1]);
      return;
    }
    const [u, v, d] = k.uv!;
    point.set((u - 0.5) * SW, (v - 0.5) * SH, 0);
    screen.localToWorld(point);
    normal.set(0, 0, 1).transformDirection(screen.matrixWorld);
    outLook.copy(point);
    outPos.copy(point).addScaledVector(normal, d);
  };

  const render = (progress: number) => {
    const p = clamp(progress);
    const opened = ss(0.01, 0.15, p);
    lid.rotation.x = lerp(CLOSED, OPEN, opened);
    rig.rotation.y = lerp(-0.55, -0.2, ss(0, 0.15, p)) * (1 - ss(0.15, 0.24, p)) + 0.3 * ss(0.93, 1, p);
    uniforms.uBright.value = lerp(0.04, 1, ss(0.35, 0.85, opened));
    // tela atual e a proxima, com um fade curto na troca
    let si = 0;
    while (si < SCREENS.length - 1 && p >= SCREENS[si + 1][0]) si += 1;
    const entering = si > 0 ? clamp((p - SCREENS[si][0]) / FADE) : 1;
    uniforms.tA.value = textures[SCREENS[Math.max(si - 1, 0)][1]];
    uniforms.tB.value = textures[SCREENS[si][1]];
    uniforms.uMix.value = entering;
    // cursor
    let ci = 0;
    while (ci < CURSOR.length - 2 && p > CURSOR[ci + 1][0]) ci += 1;
    const ct = ss(CURSOR[ci][0], CURSOR[ci + 1][0], p);
    const cu = lerp(CURSOR[ci][1], CURSOR[ci + 1][1], ct);
    const cv = lerp(CURSOR[ci][2], CURSOR[ci + 1][2], ct);
    cursor.position.set((cu - 0.5) * SW, (cv - 0.5) * SH, 0.002);
    let press = 0;
    for (const c of CLICKS) press = Math.max(press, 1 - Math.abs(p - c) / 0.007);
    cursor.scale.setScalar(1 - 0.18 * clamp(press));
    cursorMaterial.opacity = ss(0.31, 0.33, p) * (1 - ss(0.84, 0.86, p)) * (1 - ss(0.585, 0.6, p) * (1 - ss(0.69, 0.705, p)));
    rig.updateMatrixWorld(true);

    let i = 0;
    while (i < KEYS.length - 2 && p > KEYS[i + 1].p) i += 1;
    const a = KEYS[i];
    const b = KEYS[i + 1];
    resolve(a, pos, look);
    resolve(b, pos2, look2);
    const t = ss(a.p, b.p, p);
    camera.position.lerpVectors(pos, pos2, t);
    look.lerp(look2, t);
    camera.lookAt(look);
    renderer.render(scene, camera);
  };

  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();

  const dispose = () => {
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => {
        (x as THREE.MeshStandardMaterial).map?.dispose();
        x.dispose();
      });
    });
    textures.forEach((t) => t.dispose());
    envTarget.dispose();
    pmrem.dispose();
    renderer.dispose();
  };

  return { render, resize, dispose };
}
