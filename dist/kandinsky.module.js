'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// curry :: (a -> b -> ... -> n) -> (a -> b) -> (b -> ...) -> (... -> n)
var curry = function curry(fn) {
  var curried = function curried() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length >= fn.length) {
      return fn.apply(undefined, args);
    }
    return function () {
      for (var _len2 = arguments.length, argsNext = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        argsNext[_key2] = arguments[_key2];
      }

      return curried.apply(undefined, args.concat(argsNext));
    };
  };
  return curried;
};

// pipe :: (a -> b) -> (b -> ...) -> (... -> n)
var pipe = function pipe(fn1) {
  for (var _len3 = arguments.length, functions = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    functions[_key3 - 1] = arguments[_key3];
  }

  return function () {
    return functions.reduce(function (acc, fn) {
      return fn(acc);
    }, fn1.apply(undefined, arguments));
  };
};

// clamp :: Number -> Number -> Number
var clamp = curry(function (min, max, n) {
  if (n < min) return min;
  if (n > max) return max;
  return n;
});

// clampRgb :: Int -> Int
var clampRgb = clamp(0, 255);

// clampNorm :: Int -> Int
var clampNorm = clamp(0, 1);

var padHex = function padHex(hexStr) {
  return hexStr.length === 1 ? '0' + hexStr : hexStr;
};

// rgb2hsl :: [Number, Number, Number] -> [Number, Number, Number]
var rgb2hsl = function rgb2hsl(_ref) {
  var _ref2 = _slicedToArray(_ref, 3),
      r = _ref2[0],
      g = _ref2[1],
      b = _ref2[2];

  var nr = r / 255;
  var ng = g / 255;
  var nb = b / 255;

  var max = Math.max(nr, ng, nb);
  var min = Math.min(nr, ng, nb);
  var h = void 0,
      s = void 0,
      l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
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
var hue2rgb = function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;

  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;

  return p;
};

// hsl2rgb :: [Number, Number, Number] -> [Number, Number, Number]
var hsl2rgb = function hsl2rgb(_ref3) {
  var _ref4 = _slicedToArray(_ref3, 3),
      h = _ref4[0],
      s = _ref4[1],
      l = _ref4[2];

  var r = void 0,
      g = void 0,
      b = void 0;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;

    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

// hex2rgb :: String -> [Number, Number, Number]
var hex2rgb = function hex2rgb(hex) {
  var hs = hex[0] === '#' ? hex.slice(1) : hex;
  return [parseInt(hs[0] + hs[1], 16), parseInt(hs[2] + hs[3], 16), parseInt(hs[4] + hs[5], 16)];
};

// rgb2hex :: [Number, Number, Number] -> String
var rgb2hex = function rgb2hex(rgb) {
  return rgb.reduce(function (hex, c) {
    return hex + padHex(c.toString(16));
  }, '#');
};

// hex2hsl :: String -> [Number, Number, Number]
var hex2hsl = pipe(hex2rgb, rgb2hsl);

// hsl2hex :: [Number, Number, Number] -> String
var hsl2hex = pipe(hsl2rgb, rgb2hex);

// darkenRgb :: [Number, Number, Number] -> [Number, Number, Number]
var darkenRgb = curry(function (amount, rgb) {
  return rgb.map(function (c) {
    return Math.round(Math.min(Math.max(0, c + c * -amount), 255));
  });
});

// lightenRgb :: [Number, Number, Number] -> [Number, Number, Number]
var lightenRgb = curry(function (amount, rgb) {
  return rgb.map(function (c) {
    return Math.round(Math.min(Math.max(0, c + c * amount), 255));
  });
});

// darkenHsl :: [Number, Number, Number] -> [Number, Number, Number]
var darkenHsl = curry(function (amount, _ref5) {
  var _ref6 = _slicedToArray(_ref5, 3),
      h = _ref6[0],
      s = _ref6[1],
      l = _ref6[2];

  return [h, s, clampNorm(l - l * amount)];
});

// lightenHsl :: [Number, Number, Number] -> [Number, Number, Number]
var lightenHsl = curry(function (amount, _ref7) {
  var _ref8 = _slicedToArray(_ref7, 3),
      h = _ref8[0],
      s = _ref8[1],
      l = _ref8[2];

  return [h, s, clampNorm(l + l * amount)];
});

// lightenHex :: String -> [Number, Number, Number]
var lightenHex = curry(function (amount, hex) {
  return pipe(hex2rgb, lightenRgb(amount), rgb2hex)(hex);
});

// darkenHex :: String -> [Number, Number, Number]
var darkenHex = curry(function (amount, hex) {
  return pipe(hex2rgb, darkenRgb(amount), rgb2hex)(hex);
});

// lerp3 :: Int -> [Number, Number, Number] -> [Number, Number, Number] -> [Number, Number, Number]
var lerp3 = curry(function (t, _ref9, _ref10) {
  var _ref12 = _slicedToArray(_ref9, 3),
      a1 = _ref12[0],
      b1 = _ref12[1],
      c1 = _ref12[2];

  var _ref11 = _slicedToArray(_ref10, 3),
      a2 = _ref11[0],
      b2 = _ref11[1],
      c2 = _ref11[2];

  return [a1 + t * (a2 - a1), b1 + t * (b2 - b1), c1 + t * (c2 - c1)];
});

// linearGradient :: Int -> [Number, Number, Number] -> [Number, Number, Number] -> [[Number, Number, Number]]
var linearGradient = curry(function (n, c1, c2) {
  var d = n - 1 !== 0 ? n - 1 : 1;
  return Array.from(Array(n), function (_, i) {
    return lerp3(i / d, c1, c2);
  });
});

// gradient :: Function -> Int -> [Number, Number, Number] -> [Number, Number, Number] -> [[Number, Number, Number]]
var gradient = curry(function (ease, n, c1, c2) {
  var d = n - 1 !== 0 ? n - 1 : 1;
  return Array.from(Array(n), function (_, i) {
    return lerp3(ease(i / d), c1, c2);
  });
});

// multiGradient :: Int -> [[Number, Number, Number]] -> [[Number, Number, Number]]
var multiGradient = function multiGradient(n, colors) {
  return colors.reduce(function (grad, col, i) {
    if (i === 0) return grad;
    var roundingFn = i === colors.length - 1 || i === 1 ? Math.ceil : Math.round;

    var col1 = colors[i - 1];
    var col2 = col;

    return [].concat(_toConsumableArray(grad), _toConsumableArray(linearGradient(roundingFn(n / (colors.length - 1)), col1, col2)));
  }, []);
};

var kandinsky = {
  rgb2hsl: rgb2hsl,
  hsl2rgb: hsl2rgb,
  hex2rgb: hex2rgb,
  rgb2hex: rgb2hex,
  hex2hsl: hex2hsl,
  hsl2hex: hsl2hex,
  darkenRgb: darkenRgb,
  lightenRgb: lightenRgb,
  darkenHsl: darkenHsl,
  lightenHsl: lightenHsl,
  lightenHex: lightenHex,
  darkenHex: darkenHex,
  lerp3: lerp3,
  linearGradient: linearGradient,
  gradient: gradient,
  multiGradient: multiGradient
};

/* start exports */
exports.default = kandinsky;
exports.rgb2hsl = rgb2hsl;
exports.hsl2rgb = hsl2rgb;
exports.hex2rgb = hex2rgb;
exports.rgb2hex = rgb2hex;
exports.hex2hsl = hex2hsl;
exports.hsl2hex = hsl2hex;
exports.darkenRgb = darkenRgb;
exports.lightenRgb = lightenRgb;
exports.darkenHsl = darkenHsl;
exports.lightenHsl = lightenHsl;
exports.lightenHex = lightenHex;
exports.darkenHex = darkenHex;
exports.lerp3 = lerp3;
exports.linearGradient = linearGradient;
exports.gradient = gradient;
exports.multiGradient = multiGradient;
/* end exports */