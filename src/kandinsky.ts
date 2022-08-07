export type RGB = [number, number, number];
export type HSL = [number, number, number];
export type XYZ = RGB | HSL;
export type EaseFn = (t: number) => number;

const wrapValue = (m: number, M: number) => (v: number): number => {
  if (v < m) {
    const diff = M - v - 1;
    return wrapValue(m, M)(M - diff);
  }
  if (v > M) {
    const diff = v - M - 1;
    return wrapValue(m, M)(m + diff);
  }
  return v;
};

export const wrapNorm = wrapValue(0, 1);

const clamp = (min: number, max: number) => (n: number): number => {
  if (n < min) return min;
  if (n > max) return max;
  return n;
};

export const clampNorm = clamp(0, 1);

export const padHex = (hexStr: string) => hexStr.padStart(2, '0');

export const rgb2hsl = ([r, g, b]: RGB): HSL => {
  const nr = r / 255;
  const ng = g / 255;
  const nb = b / 255;

  const max = Math.max(nr, ng, nb);
  const min = Math.min(nr, ng, nb);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = (l > 0.5)
      ? d / (2 - max - min)
      : d / (max + min);

    switch(max){
      case nr:
        h = (ng - nb) / d + (ng < nb ? 6 : 0);
        break;

      case ng:
        h = (nb - nr) / d + 2;
        break;

      case nb:
        h = (nr - ng) / d + 4;
        break;
    }

    h /= 6;
  }
  return [h, s, l];
};

const hue2rgb = (p: number, q: number, t: number) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;

  if (t < 1/6) return p + (q - p) * 6 * t;
  if (t < 1/2) return q;
  if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;

  return p;
}

export const hsl2rgb = ([h, s, l]: HSL): RGB => {
  let r, g, b;

  if (s === 0) {
      r = g = b = l; // achromatic
  } else {
      const q = (l < 0.5)
        ? l * (1 + s)
        : l + s - l * s;

      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export const hex2rgb = (hex: string): RGB => {
  const hs = hex[0] === '#' ? hex.slice(1) : hex;
  return [
    parseInt(hs[0] + hs[1], 16),
    parseInt(hs[2] + hs[3], 16),
    parseInt(hs[4] + hs[5], 16)
  ];
};

export const rgb2hex = (rgb: RGB): string => rgb.reduce((hex, c) => hex + padHex(c.toString(16)), '#');

export const hex2hsl = (hex: string) => rgb2hsl(hex2rgb(hex));

export const hsl2hex = (hsl: HSL) => rgb2hex(hsl2rgb(hsl));

export const darkenRgb = (amount: number, rgb: RGB): RGB =>
  rgb.map(c => Math.round(Math.min(Math.max(0, c + (c * -amount)), 255))) as RGB;

export const lightenRgb = (amount: number, rgb: RGB): RGB =>
  rgb.map(c => Math.round(Math.min(Math.max(0, c + (c * amount)), 255))) as RGB;

export const darkenHsl = (amount: number, [h, s, l]: HSL): HSL => {
  return [h, s, clampNorm(l - (l * amount))];
};

export const lightenHsl = (amount: number, [h, s, l]: HSL): HSL => {
  return [h, s, clampNorm(l + (l * amount))];
};

export const lightenHex = (amount: number, hex: string) => (
  rgb2hex(lightenRgb(amount, hex2rgb(hex)))
);

export const darkenHex = (amount: number, hex: string) => (
  rgb2hex(darkenRgb(amount, hex2rgb(hex)))
);

export const lerp3 = (t: number, [a1, b1, c1]: XYZ, [a2, b2, c2]: XYZ): XYZ => [
  a1 + t * (a2 - a1),
  b1 + t * (b2 - b1),
  c1 + t * (c2 - c1),
];

export const linearGradient = (n: number, c1: XYZ, c2: XYZ) => {
  const d = (n-1 !== 0) ? n-1 : 1;
  return Array.from(Array(n), (_, i) => lerp3(i / d, c1, c2));
};

export const gradient = (ease: EaseFn, n: number, c1: XYZ, c2: XYZ) => {
  const d = (n-1 !== 0) ? n-1 : 1;
  return Array.from(Array(n), (_, i) => lerp3(ease(i / d), c1, c2));
};

export const multiGradient = (n: number, colors: XYZ[]) => {
  return colors.reduce<XYZ[]>((grad, col, i) => {
    if (i === 0) return grad;
    const roundingFn = (i === colors.length-1 || i === 1)
      ? Math.ceil
      : Math.round;

    const col1 = colors[i-1];
    const col2 = col;

    return [
      ...grad,
      ...linearGradient(roundingFn(n/(colors.length - 1)), col1, col2)
    ];
  }, []);
};

export const rGradient = (ease: EaseFn, n: number, c1: XYZ, c2: XYZ) =>
  gradient(ease, n, c1, c2).map(color => color.map(Math.round)) as XYZ[];

export const rLinearGradient = (n: number, c1: XYZ, c2: XYZ) =>
  linearGradient(n, c1, c2).map(color => color.map(Math.round)) as XYZ[];

export const rMultiGradient = (n: number, colors: XYZ[]) =>
  multiGradient(n, colors).map(color => color.map(Math.round)) as XYZ[];

export const complimentHsl = (n: number, [h, s, l]: HSL): HSL[] => Array.from(Array(n), (_, i) => [
  wrapNorm(h - (i/n)),
  s,
  l
]);

export const complimentRgb = (n: number, rgb: RGB) => (
  complimentHsl(n, rgb2hsl(rgb)).map(hsl2rgb)
);

export const complimentHex = (n: number, hex: string) => (
  complimentHsl(n, hex2hsl(hex)).map(hsl2hex)
);

export const rgb2css = (alpha: number, rgb: RGB) => {
  const a = typeof alpha === 'number' ? clampNorm(alpha) : 1;
  const [r, g, b] = rgb.map(x => clamp(0, 255)(Math.round(x)));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const hsl2css = (alpha: number, [h, s, l]: HSL) => {
  const a = typeof alpha === 'number' ? clampNorm(alpha) : 1;
  const H = Math.round(h * 360);
  const S = Math.round(s * 100);
  const L = Math.round(l * 100);
  return `hsl(${H}, ${S}%, ${L}%, ${a})`;
};
