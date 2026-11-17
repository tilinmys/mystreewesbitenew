import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  LineSegments,
  OrthographicCamera,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector4,
  WebGLRenderer,
} from "three";

import type { Anchor, SceneHandle, SceneOptions } from "./three-backdrop";

/*
 * Flowing lines in light burgundy, two variants:
 *
 * "welcome": her hair. The drawn woman (stree-drawing.tsx) faces left; her
 * hair is grown here, rooted along her front hairline (forehead to temple),
 * lying over the skull (top locks over the crown, lower ones behind the ear)
 * and then flowing to the right in long S-waves. Strands are gathered into locks and each lock shares one wave
 * (phase from its place on the scalp), so locks move together like real hair;
 * a small per-strand offset keeps them from merging. Roots stay still and the
 * movement grows toward the tips.
 *
 * "ribbon" (story section): a silk ribbon. All strands share one centreline
 * and spread across a width that billows along its length.
 *
 * Cost: one LineSegments draw call (~37k vertices); all motion is computed in
 * the vertex shader from one time uniform.
 */
type V2 = [number, number];
export type HairLayout = {
  /** Root curve: a0 → (aM control) → a1. Strands' later points slide from …0 to …1. */
  a0: V2; aM: V2; a1: V2; b0: V2; b1: V2; c0: V2; c1: V2; d0: V2; d1: V2;
  /** Where the words sit, so lines fade there: centre (x, y) and radii (x, y) in UV. */
  clear: [number, number, number, number];
  /** Wave size, in fractions of the section's short side. */
  amplitude: number;
  /** Line opacity range. */
  alpha: [number, number];
  /** Ribbon width in fractions of the short side (ribbon variant only). */
  ribbon?: number;
};
export type HairVariant = "welcome" | "ribbon";

const LOCKS = 20;
const PER_LOCK = 9;
const SEGMENTS = 96;

const vertexShader = /* glsl */ `
  attribute float aStrand;
  attribute float aT;
  attribute float aSeed;
  uniform float uTime;
  uniform vec2 uRes;
  uniform float uAmp;
  uniform float uRibbon;
  uniform vec2 uAlpha;
  uniform vec2 uA0; uniform vec2 uAM; uniform vec2 uA1; uniform vec2 uB0; uniform vec2 uB1;
  uniform vec2 uC0; uniform vec2 uC1; uniform vec2 uD0; uniform vec2 uD1;
  varying float vAlpha;

  vec2 bez(vec2 a, vec2 b, vec2 c, vec2 d, float t) {
    float u = 1.0 - t;
    return u*u*u*a + 3.0*u*u*t*b + 3.0*u*t*t*c + t*t*t*d;
  }
  vec2 root(float s) {
    float u = 1.0 - s;
    return u*u*uA0 + 2.0*u*s*uAM + s*s*uA1;
  }
  vec2 strand(float s, float t) {
    return bez(root(s), mix(uB0, uB1, s), mix(uC0, uC1, s), mix(uD0, uD1, s), t) * uRes;
  }

  void main() {
    float s = aStrand;
    float t = aT;
    float unit = min(uRes.x, uRes.y) * uAmp;

    if (uRibbon > 0.0) {
      float ends = smoothstep(0.0, 0.07, t) * (1.0 - smoothstep(0.82, 1.0, t));
      vec2 c = strand(0.5, t);
      vec2 dir = normalize(strand(0.5, min(t + 0.01, 1.0)) - strand(0.5, max(t - 0.01, 0.0)) + 1e-4);
      vec2 n = vec2(-dir.y, dir.x);
      float tw = cos(t * 5.2 - uTime * 0.32) * 0.75 + cos(t * 2.1 + uTime * 0.21) * 0.25;
      // The ribbon billows (width breathing 25–100%) rather than flipping over.
      float twist = 0.625 + 0.375 * tw;
      float width = uRibbon * min(uRes.x, uRes.y) * (0.45 + 0.55 * sin(t * 3.14159));
      float drift = sin(t * 4.0 - uTime * 0.4) * unit * 1.4;
      vec2 p = c + n * ((s - 0.5) * width * twist + drift + (aSeed - 0.5) * unit * 0.2);
      float fold = 1.0 - abs(twist);
      vAlpha = mix(uAlpha.x, uAlpha.y, fract(aSeed * 7.13)) * (0.75 + 0.35 * fold) * ends;
      gl_Position = vec4(p / uRes * 2.0 - 1.0, 0.0, 1.0);
      return;
    }

    // Hair: tips fade out; near the roots, where all the strands gather on the
    // hairline, they are lighter so the hairline reads as a line, not a knot.
    float ends = smoothstep(0.0, 0.02, t) * (1.0 - smoothstep(0.78, 1.0, t))
               * mix(0.4, 1.0, smoothstep(0.0, 0.3, t));
    vec2 p = strand(s, t);
    vec2 dir = normalize(strand(s, min(t + 0.01, 1.0)) - strand(s, max(t - 0.01, 0.0)) + 1e-4);
    vec2 n = vec2(-dir.y, dir.x);

    // One wave per lock (phase from the place on the scalp), travelling root to tip.
    float lockPhase = s * 4.0;
    float wave = sin(t * 6.2 - uTime * 0.7 + lockPhase) * 1.0
               + sin(t * 11.0 - uTime * 1.1 + lockPhase * 1.7) * 0.22;
    float lift = smoothstep(0.0, 0.3, t) * (0.35 + 0.65 * t);
    float sway = sin(uTime * 0.33 + s * 1.5) * 1.6 * t * t;
    float spread = (aSeed - 0.5) * (0.25 + 1.6 * t);
    p += n * unit * ((wave + sway) * lift + spread);

    vAlpha = mix(uAlpha.x, uAlpha.y, fract(aSeed * 7.13)) * ends;
    gl_Position = vec4(p / uRes * 2.0 - 1.0, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float; // must match the vertex stage: uRes is shared
  uniform vec3 uColor;
  uniform vec2 uRes;
  uniform vec4 uClear;
  varying float vAlpha;
  void main() {
    vec2 uv = gl_FragCoord.xy / uRes;
    float d = length((uv - uClear.xy) / uClear.zw);
    float clear = mix(0.2, 1.0, smoothstep(0.55, 1.25, d));
    gl_FragColor = vec4(uColor, vAlpha * clear);
  }
`;

/*
 * Welcome: her scalp and hair, in the drawing's own units (600 × 480, see
 * stree-drawing.tsx), mapped through the drawing's box on the page. The hair
 * reaches well past the drawing to the right, behind the statement.
 */
const BOX_W = 600;
const BOX_H = 480;
/* Roots along the hairline, from the top of the forehead round to behind the
   ear; the strands follow the drawn hair's course over the crown and down the
   back (stree-drawing.tsx), then flow on to the right. */
const ROOT_FRONT: V2 = [114, 74];
const ROOT_MID: V2 = [150, 70];
const ROOT_BACK: V2 = [196, 150];

function welcomeLayout(width: number, anchor: Anchor | null): HairLayout {
  const narrow = width < 768;
  const box = anchor ?? { x: 0.03, y: 0.03, w: 0.42, h: 0.33 };
  const at = (p: V2): V2 => [box.x + (p[0] / BOX_W) * box.w, 1 - (box.y + (p[1] / BOX_H) * box.h)];
  // Each lock lies over the head first (top locks over the crown, lower ones
  // behind the ear and down the neck), then flows out to the right in waves.
  return {
    a0: at(ROOT_FRONT), aM: at(ROOT_MID), a1: at(ROOT_BACK),
    b0: at([210, 20]), b1: at([228, 268]),
    c0: at([400, 96]), c1: at([360, 372]),
    d0: at([narrow ? 980 : 1060, 140]), d1: at([narrow ? 900 : 980, 430]),
    clear: narrow ? [0.5, 0.86, 0.7, 0.08] : [0.5, 0.8, 0.32, 0.09],
    amplitude: narrow ? 0.026 : 0.02,
    alpha: narrow ? [0.07, 0.22] : [0.14, 0.38],
  };
}

/* Story: a ribbon entering at the left, dipping low and lifting past the right edge. */
function ribbonLayout(width: number): HairLayout {
  const narrow = width < 768;
  const a: V2 = narrow ? [-0.15, 0.26] : [-0.08, 0.6];
  const b: V2 = narrow ? [0.35, -0.04] : [0.22, 0.02];
  const c: V2 = narrow ? [0.75, 0.3] : [0.62, 0.0];
  const d: V2 = narrow ? [1.2, 0.04] : [1.1, 0.4];
  return {
    a0: a, aM: a, a1: a, b0: b, b1: b, c0: c, c1: c, d0: d, d1: d,
    clear: narrow ? [0.5, 0.66, 0.7, 0.3] : [0.72, 0.6, 0.22, 0.26],
    amplitude: 0.02,
    alpha: [0.05, 0.16],
    ribbon: narrow ? 0.34 : 0.22,
  };
}

function random(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

export function createScene(canvas: HTMLCanvasElement, { still, variant }: SceneOptions): SceneHandle {
  const ribbon = (variant as HairVariant) === "ribbon";

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const positions: number[] = [];
  const strandAttr: number[] = [];
  const tAttr: number[] = [];
  const seedAttr: number[] = [];

  for (let lock = 0; lock < LOCKS; lock++) {
    const centre = (lock + 0.5) / LOCKS;
    for (let k = 0; k < PER_LOCK; k++) {
      const id = lock * PER_LOCK + k;
      const s = Math.min(1, Math.max(0, centre + (random(id + 1) - 0.5) * 0.05));
      const seed = random(id * 3.7 + 11);
      for (let i = 0; i < SEGMENTS; i++) {
        for (const t of [i / SEGMENTS, (i + 1) / SEGMENTS]) {
          positions.push(0, 0, 0);
          strandAttr.push(s);
          tAttr.push(t);
          seedAttr.push(seed);
        }
      }
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("aStrand", new Float32BufferAttribute(strandAttr, 1));
  geometry.setAttribute("aT", new Float32BufferAttribute(tAttr, 1));
  geometry.setAttribute("aSeed", new Float32BufferAttribute(seedAttr, 1));

  const v2 = () => ({ value: new Vector2() });
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    uniforms: {
      uTime: { value: 6 },
      uRes: v2(),
      uAmp: { value: 0.02 },
      uRibbon: { value: 0 },
      uAlpha: v2(),
      uA0: v2(), uAM: v2(), uA1: v2(), uB0: v2(), uB1: v2(), uC0: v2(), uC1: v2(), uD0: v2(), uD1: v2(),
      uClear: { value: new Vector4(0.5, 0.5, 0.3, 0.2) },
      uColor: { value: new Color(ribbon ? "#b0606c" : "#8a4b52") },
    },
  });

  const lines = new LineSegments(geometry, material);
  lines.frustumCulled = false;
  scene.add(lines);

  return {
    // A slow ribbon needs no more than 30fps; halves the GPU work while visible.
    fps: 30,
    render(time) {
      material.uniforms.uTime.value = still ? 6 : 6 + time;
      renderer.render(scene, camera);
    },
    resize(width, height, ratio, anchor) {
      renderer.setPixelRatio(ratio);
      renderer.setSize(width, height, false);
      const u = material.uniforms;
      u.uRes.value.set(width * ratio, height * ratio);
      const layout = ribbon ? ribbonLayout(width) : welcomeLayout(width, anchor ?? null);
      (["a0", "aM", "a1", "b0", "b1", "c0", "c1", "d0", "d1"] as const).forEach((key) => {
        u[`u${key.toUpperCase()}`].value.set(layout[key][0], layout[key][1]);
      });
      u.uClear.value.set(...layout.clear);
      u.uAmp.value = layout.amplitude;
      u.uAlpha.value.set(layout.alpha[0], layout.alpha[1]);
      u.uRibbon.value = layout.ribbon ?? 0;
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
