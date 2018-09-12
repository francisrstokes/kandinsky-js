const chai = require('chai');
const expect = chai.expect;
const {
  hex2rgb,
  rgb2hex,

  rgb2hsl,
  hsl2rgb,

  hex2hsl,
  hsl2hex,

  lightenHex,
  darkenHex,
  lightenRgb,
  darkenRgb,
  lightenHsl,
  darkenHsl,

  lerp3,
  linearGradient,
  gradient,
  multiGradient,
  rLinearGradient,
  rGradient,
  rMultiGradient,

  complimentRgb,
  complimentHex,
  complimentHsl,

  rgb2css,
  hsl2css,

  polute
} = require('../dist/kandinsky');

// This function corrects rounding errors like 0.69999999999 to 0.70
const errorCorrect = n => parseFloat(parseFloat(n).toPrecision(2));

// There is a rounding error because of the floating point math.
// Tests allow for a maximum 1% error margin.
const errorMargin = 255 / 100;
const hslErrorMargin = 360/100;

/* eslint-disable func-names */
describe('Kandisky JS Colour Library', function() {
  it('should polute a target object', () => {
    const obj = {};
    polute(obj);
    expect(Object.keys(obj)).to.contain('hex2rgb');
  });

  it('convert a hex code to a rgb array', () => {
    const hex = '#FF0000';
    const hexNoHash = 'FF0000';
    const expected = [0xFF, 0, 0];

    expect(hex2rgb(hex)).to.deep.equal(expected);
    expect(hex2rgb(hexNoHash)).to.deep.equal(expected);
  });

  it('convert an rgb array to a hex code', () => {
    const expected = '#ff0000';
    const rgb = [0xFF, 0, 0];

    expect(rgb2hex(rgb)).to.equal(expected);
  });

  it('convert a rgb array to a hsl array', () => {
    const rgb = [175, 103, 31];
    const expected = [30 / 360, 70 / 100, 40 / 100].map(errorCorrect);

    expect(rgb2hsl(rgb).map(errorCorrect)).to.deep.equal(expected);
  });

  it('convert a hsl array to a rgb array', () => {
    const hsl = [30 / 360, 70 / 100, 40 / 100];
    const expected = [175, 103, 31];

    const converted = hsl2rgb(hsl);
    const diff = [
      Math.max(converted[0], expected[0]) - Math.min(converted[0], expected[0]),
      Math.max(converted[1], expected[1]) - Math.min(converted[1], expected[1]),
      Math.max(converted[2], expected[2]) - Math.min(converted[2], expected[2]),
    ];

    diff.forEach(d => expect(d < errorMargin).to.be.true);
  });

  it('convert a hex code to a hsl array', () => {
    const hex = '#af671f';
    const expected = [30 / 360, 70 / 100, 40 / 100].map(errorCorrect);

    expect(hex2hsl(hex).map(errorCorrect)).to.deep.equal(expected);
  });

  it('convert a hsl array to a hex code', () => {
    const expected = hex2rgb('#af671f');
    const hsl = [30 / 360, 70 / 100, 40 / 100];
    const converted = hex2rgb(hsl2hex(hsl));

    const diff = [
      Math.max(converted[0], expected[0]) - Math.min(converted[0], expected[0]),
      Math.max(converted[1], expected[1]) - Math.min(converted[1], expected[1]),
      Math.max(converted[2], expected[2]) - Math.min(converted[2], expected[2]),
    ];

    diff.forEach(d => expect(d < errorMargin).to.be.true);
  });

  it('lighten a hex code', () => {
    const hex = '#6699CC';
    const expected = '#7ab8f5';
    const converted = lightenHex(0.2, hex);

    expect(converted).to.equal(expected);
  });

  it('darken a hex code', () => {
    const hex = '#6699CC';
    const expected = '#527aa3';
    const converted = darkenHex(0.2, hex);

    expect(converted).to.equal(expected);
  });

  it('lighten an rgb color', () => {
    const rgb = [0x66, 0x99, 0xCC];
    const expected = [0x7a, 0xb8, 0xf5];
    const converted = lightenRgb(0.2, rgb);

    expect(converted).to.deep.equal(expected);
  });

  it('darken an rgb color', () => {
    const rgb = [0x66, 0x99, 0xCC];
    const expected = [0x52, 0x7a, 0xa3];
    const converted = darkenRgb(0.2, rgb);

    expect(converted).to.deep.equal(expected);
  });

  it('lighten a hsl color', () => {
    const hsl = [210/360, 0.5, 0.6].map(errorCorrect);
    const expected = [210/360, 0.5, 0.6 + (0.6 * 0.2)].map(errorCorrect);
    const converted = lightenHsl(0.2, hsl);

    expect(converted).to.deep.equal(expected);
  });

  it('darken a hsl color', () => {
    const hsl = [210/360, 0.5, 0.6].map(errorCorrect);
    const expected = [210/360, 0.5, 0.6 - (0.6 * 0.2)].map(errorCorrect);
    const converted = darkenHsl(0.2, hsl);

    expect(converted).to.deep.equal(expected);
  });

  it('linear interpolate a vector3', () => {
    const a = [0, 0, 0];
    const b = [255, 255, 255];

    const expected1 = a;
    const expected2 = [127.5, 127.5, 127.5];
    const expected3 = b;


    const converted1 = lerp3(0, a, b);
    const converted2 = lerp3(0.5, a, b);
    const converted3 = lerp3(1, a, b);

    expect(converted1).to.deep.equal(expected1);
    expect(converted2).to.deep.equal(expected2);
    expect(converted3).to.deep.equal(expected3);
  });

  it('create a linear gradient between two vector3 colors', () => {
    const a = [0, 0, 0];
    const b = [255, 255, 255];
    const n = 10;

    const out = linearGradient(10, a, b);

    const expected = Array.from(Array(n), (_, i) => lerp3(i / (n-1), a, b));
    expect(out).to.deep.equal(expected)
  });

  it('create a rounded linear gradient between two vector3 colors', () => {
    const a = [0, 0, 0];
    const b = [255, 255, 255];
    const n = 10;

    const out = rLinearGradient(10, a, b);

    const expected = Array.from(Array(n), (_, i) => lerp3(i / (n-1), a, b).map(Math.round));
    expect(out).to.deep.equal(expected)
  });

  it('create a nonlinear gradient between two vector3 colors', () => {
    const a = [0, 0, 0];
    const b = [255, 255, 255];
    const n = 10;

    const easeFn = t => t ** 2;

    const out = gradient(easeFn, 10, a, b);

    const expected = Array.from(Array(n), (_, i) => lerp3(easeFn(i / (n-1)), a, b));
    expect(out).to.deep.equal(expected)
  });

  it('create a rounded nonlinear gradient between two vector3 colors', () => {
    const a = [0, 0, 0];
    const b = [255, 255, 255];
    const n = 10;

    const easeFn = t => t ** 2;

    const out = rGradient(easeFn, 10, a, b);

    const expected = Array.from(Array(n), (_, i) =>lerp3(easeFn(i / (n-1)), a, b).map(Math.round));
    expect(out).to.deep.equal(expected)
  });

  it('create a linear gradient of multiple vector3 colors', () => {
    const a = [0, 0, 0];
    const b = [255, 255, 255];
    const c = [23, 45, 67];
    const d = [99, 101, 222];
    const n = 10;

    for (let i = 1; i < 101; i += 1) {
      const mg2 = multiGradient(i, [a, b]);
      expect(mg2.length).to.equal(i);
    }

    const g1 = [
      ...linearGradient(Math.ceil(n/3), a, b),  // Start and end gradients get ceil'd
      ...linearGradient(Math.round(n/3), b, c), // Middle gradients get round'd
      ...linearGradient(Math.ceil(n/3), c, d),
    ];

    const g2 = multiGradient(n, [a, b, c, d]);

    expect(g1).to.deep.equal(g2);
  });

  it('create a rounded linear gradient of multiple vector3 colors', () => {
    const a = [0, 0, 0];
    const b = [255, 255, 255];
    const c = [23, 45, 67];
    const d = [99, 101, 222];
    const n = 10;

    for (let i = 1; i < 101; i += 1) {
      const mg2 = multiGradient(i, [a, b]);
      expect(mg2.length).to.equal(i);
    }

    const g1 = [
      ...linearGradient(Math.ceil(n/3), a, b),  // Start and end gradients get ceil'd
      ...linearGradient(Math.round(n/3), b, c), // Middle gradients get round'd
      ...linearGradient(Math.ceil(n/3), c, d),
    ].map(color => color.map(Math.round));

    const g2 = rMultiGradient(n, [a, b, c, d]);

    expect(g1).to.deep.equal(g2);
  });

  it('create a hsl complimentary colour pallete', () => {
    const c = hex2hsl('#ff0000');
    const expected2 = ['#ff0000', '#00ffff'].map(hex2hsl).map(c => c.map(errorCorrect));
    const result2 = complimentHsl(2, c);

    const diffs2 = expected2.map((ex, i) => [
      Math.max(result2[i][0], ex[0]) - Math.min(result2[i][0], ex[0]),
      Math.max(result2[i][1], ex[1]) - Math.min(result2[i][1], ex[1]),
      Math.max(result2[i][2], ex[2]) - Math.min(result2[i][2], ex[2]),
    ]);
    diffs2.forEach(diff => diff.forEach(d => expect(d < hslErrorMargin).to.be.true));

    const expected3 = ['#ff0000', '#0000ff', '#00ff00'].map(hex2hsl).map(c => c.map(errorCorrect));
    const result3 = complimentHsl(3, c).map(c => c.map(errorCorrect));

    const diffs3 = expected3.map((ex, i) => [
      Math.max(result3[i][0], ex[0]) - Math.min(result3[i][0], ex[0]),
      Math.max(result3[i][1], ex[1]) - Math.min(result3[i][1], ex[1]),
      Math.max(result3[i][2], ex[2]) - Math.min(result3[i][2], ex[2]),
    ]);
    diffs3.forEach(diff => diff.forEach(d => expect(d < hslErrorMargin).to.be.true));

    const expected4 = ['#ff0000', '#7f00ff', '#00ffff', '#80ff00'].map(hex2hsl).map(c => c.map(errorCorrect));
    const result4 = complimentHsl(4, c).map(c => c.map(errorCorrect));
    const diffs4 = expected4.map((ex, i) => [
      Math.max(result4[i][0], ex[0]) - Math.min(result4[i][0], ex[0]),
      Math.max(result4[i][1], ex[1]) - Math.min(result4[i][1], ex[1]),
      Math.max(result4[i][2], ex[2]) - Math.min(result4[i][2], ex[2]),
    ]);
    diffs4.forEach(diff => diff.forEach(d => expect(d < hslErrorMargin).to.be.true));
  });

  it('create a rgb complimentary colour pallete', () => {
    const c = hex2rgb('#ff0000');
    const expected2 = ['#ff0000', '#00ffff'].map(hex2rgb);
    const result2 = complimentRgb(2, c);

    const diffs2 = expected2.map((ex, i) => [
      Math.max(result2[i][0], ex[0]) - Math.min(result2[i][0], ex[0]),
      Math.max(result2[i][1], ex[1]) - Math.min(result2[i][1], ex[1]),
      Math.max(result2[i][2], ex[2]) - Math.min(result2[i][2], ex[2]),
    ]);
    diffs2.forEach(diff => diff.forEach(d => expect(d < errorMargin).to.be.true));

    const expected3 = ['#ff0000', '#0000ff', '#00ff00'].map(hex2rgb);
    const result3 = complimentRgb(3, c);

    const diffs3 = expected3.map((ex, i) => [
      Math.max(result3[i][0], ex[0]) - Math.min(result3[i][0], ex[0]),
      Math.max(result3[i][1], ex[1]) - Math.min(result3[i][1], ex[1]),
      Math.max(result3[i][2], ex[2]) - Math.min(result3[i][2], ex[2]),
    ]);
    diffs3.forEach(diff => diff.forEach(d => expect(d < errorMargin).to.be.true));

    const expected4 = ['#ff0000', '#7f00ff', '#00ffff', '#80ff00'].map(hex2rgb);
    const result4 = complimentRgb(4, c);
    const diffs4 = expected4.map((ex, i) => [
      Math.max(result4[i][0], ex[0]) - Math.min(result4[i][0], ex[0]),
      Math.max(result4[i][1], ex[1]) - Math.min(result4[i][1], ex[1]),
      Math.max(result4[i][2], ex[2]) - Math.min(result4[i][2], ex[2]),
    ]);
    diffs4.forEach(diff => diff.forEach(d => expect(d < errorMargin).to.be.true));
  });

  it('create a hex complimentary colour pallete', () => {
    const c = '#ff0000';
    const expected2 = ['#ff0000', '#00ffff'];
    const result2 = complimentHex(2, c);
    expect(result2).to.deep.equal(expected2);

    const expected3 = ['#ff0000', '#0000ff', '#00ff00'];
    const result3 = complimentHex(3, c);
    expect(result3).to.deep.equal(expected3);

    const expected4 = ['#ff0000', '#7f00ff', '#00ffff', '#80ff00'];
    const result4 = complimentHex(4, c);
    expect(expected4).to.deep.equal(result4);
  });

  it('get a css string from an rgb color', () => {
    const expected1 = 'rgba(255, 128, 64, 1)';
    expect(rgb2css(1, [255, 128, 64])).to.equal(expected1);

    const expected2 = 'rgba(255, 128, 64, 1)';
    expect(rgb2css(1.5, [255, 128, 64])).to.equal(expected2);

    const expected3 = 'rgba(255, 128, 64, 1)';
    expect(rgb2css(null, [255, 128, 64])).to.equal(expected3);

    const expected4 = 'rgba(255, 128, 64, 0.3)';
    expect(rgb2css(0.3, [255, 128, 64])).to.equal(expected4);
  });

  it('get a css string from an hsl color', () => {
    const expected1 = 'hsl(101, 62%, 41%, 1)';
    expect(hsl2css(1, [0.28, 0.62, 0.414])).to.equal(expected1);

    const expected2 = 'hsl(101, 62%, 41%, 0.12)';
    expect(hsl2css(0.12, [0.28, 0.62, 0.414])).to.equal(expected2);

    const expected3 = 'hsl(101, 62%, 41%, 1)';
    expect(hsl2css(null, [0.28, 0.62, 0.414])).to.equal(expected3);

    const expected4 = 'hsl(101, 62%, 41%, 1)';
    expect(hsl2css(1.5, [0.28, 0.62, 0.414])).to.equal(expected4);
  });
});
/* eslint-enable func-names */
