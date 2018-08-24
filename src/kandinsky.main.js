// curry :: (a -> b -> ... -> n) -> (a -> b) -> (b -> ...) -> (... -> n)
const curry = (fn) => {
  const curried = (...args) => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...argsNext) => curried(...args, ...argsNext);
  };
  return curried;
};

// pipe :: (a -> b) -> (b -> ...) -> (... -> n)
const pipe = (fn1, ...functions) =>
  (...args) =>
    functions.reduce((acc, fn) => fn(acc), fn1(...args));

// clamp :: Number -> Number -> Number
const clamp = curry((min, max, n) => {
  if (n < min) return min;
  if (n > max) return max;
  return n;
});

// clampRgb :: Int -> Int
const clampRgb = clamp(0, 255);

// clampNorm :: Int -> Int
const clampNorm = clamp(0, 1);

const padHex = hexStr => hexStr.length === 1 ? `0${hexStr}` : hexStr;

// rgb2hsl :: [Number, Number, Number] -> [Number, Number, Number]
const rgb2hsl = ([r, g, b]) => {
  const nr = r / 255;
  const ng = g / 255;
  const nb = b / 255;

  const max = Math.max(nr, ng, nb);
  const min = Math.min(nr, ng, nb);
  let h, s, l = (max + min) / 2;

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

// hue2rgb :: Int -> Int -> Int -> Int
const hue2rgb = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;

  if (t < 1/6) return p + (q - p) * 6 * t;
  if (t < 1/2) return q;
  if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;

  return p;
}

// hsl2rgb :: [Number, Number, Number] -> [Number, Number, Number]
const hsl2rgb = ([h, s, l]) => {
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

// hex2rgb :: String -> [Number, Number, Number]
const hex2rgb = hex => {
  const hs = hex[0] === '#' ? hex.slice(1) : hex;
  return [
    parseInt(hs[0] + hs[1], 16),
    parseInt(hs[2] + hs[3], 16),
    parseInt(hs[4] + hs[5], 16)
  ];
};

// rgb2hex :: [Number, Number, Number] -> String
const rgb2hex = rgb => rgb.reduce((hex, c) => hex + padHex(c.toString(16)), '#');

// hex2hsl :: String -> [Number, Number, Number]
const hex2hsl = pipe(hex2rgb, rgb2hsl);

// hsl2hex :: [Number, Number, Number] -> String
const hsl2hex = pipe(hsl2rgb, rgb2hex);

// darkenRgb :: [Number, Number, Number] -> [Number, Number, Number]
const darkenRgb = curry((amount, rgb) =>
  rgb.map(c => Math.round(Math.min(Math.max(0, c + (c * -amount)), 255)))
);

// lightenRgb :: [Number, Number, Number] -> [Number, Number, Number]
const lightenRgb = curry((amount, rgb) =>
  rgb.map(c => Math.round(Math.min(Math.max(0, c + (c * amount)), 255)))
);

// darkenHsl :: [Number, Number, Number] -> [Number, Number, Number]
const darkenHsl = curry((amount, [h, s, l]) => {
  return [h, s, clampNorm(l - (l * amount))];
});

// lightenHsl :: [Number, Number, Number] -> [Number, Number, Number]
const lightenHsl = curry((amount, [h, s, l]) => {
  return [h, s, clampNorm(l + (l * amount))];
});

// lightenHex :: String -> [Number, Number, Number]
const lightenHex = curry((amount, hex) => pipe(
  hex2rgb,
  lightenRgb(amount),
  rgb2hex
)(hex));

// darkenHex :: String -> [Number, Number, Number]
const darkenHex = curry((amount, hex) => pipe(
  hex2rgb,
  darkenRgb(amount),
  rgb2hex
)(hex));

// lerp3 :: Int -> [Number, Number, Number] -> [Number, Number, Number] -> [Number, Number, Number]
const lerp3 = curry((t, [a1, b1, c1], [a2, b2, c2]) => [
  a1 + t * (a2 - a1),
  b1 + t * (b2 - b1),
  c1 + t * (c2 - c1)
]);

// linearGradient :: Int -> [Number, Number, Number] -> [Number, Number, Number] -> [[Number, Number, Number]]
const linearGradient = curry((n, c1, c2) => {
  const d = (n-1 !== 0) ? n-1 : 1;
  return Array.from(Array(n), (_, i) => lerp3(i / d, c1, c2));
});

// gradient :: Function -> Int -> [Number, Number, Number] -> [Number, Number, Number] -> [[Number, Number, Number]]
const gradient = curry((ease, n, c1, c2) => {
  const d = (n-1 !== 0) ? n-1 : 1;
  return Array.from(Array(n), (_, i) => lerp3(ease(i / d), c1, c2));
});

// multiGradient :: Int -> [[Number, Number, Number]] -> [[Number, Number, Number]]
const multiGradient = (n, colors) => {
  return colors.reduce((grad, col, i) => {
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
}

const kandinsky = {
  rgb2hsl,
  hsl2rgb,
  hex2rgb,
  rgb2hex,
  hex2hsl,
  hsl2hex,
  darkenRgb,
  lightenRgb,
  darkenHsl,
  lightenHsl,
  lightenHex,
  darkenHex,
  lerp3,
  linearGradient,
  gradient,
  multiGradient,
};

/* start window exports */
const polute = () => {
  window.rgb2hsl = rgb2hsl;
  window.hsl2rgb = hsl2rgb;
  window.hex2rgb = hex2rgb;
  window.rgb2hex = rgb2hex;
  window.hex2hsl = hex2hsl;
  window.hsl2hex = hsl2hex;
  window.darkenRgb = darkenRgb;
  window.lightenRgb = lightenRgb;
  window.darkenHsl = darkenHsl;
  window.lightenHsl = lightenHsl;
  window.lightenHex = lightenHex;
  window.darkenHex = darkenHex;
  window.lerp3 = lerp3;
  window.linearGradient = linearGradient;
  window.gradient = gradient;
  window.multiGradient = multiGradient;
};

/**
 * Exposed API
 */
window.kandinsky = Object.assign({ polute }, kandinsky);
/* end window exports */

/* start exports */
export default kandinsky;
export {rgb2hsl};
export {hsl2rgb};
export {hex2rgb};
export {rgb2hex};
export {hex2hsl};
export {hsl2hex};
export {darkenRgb};
export {lightenRgb};
export {darkenHsl};
export {lightenHsl};
export {lightenHex};
export {darkenHex};
export {lerp3};
export {linearGradient};
export {gradient};
export {multiGradient};
/* end exports */
