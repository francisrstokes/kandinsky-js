<h1 align="center">Kandinsky JS</h1>
<p align="center">
  <img src="./logo.png"/>
  <br/>
  A (mini) colour manipulation library
</p>
<hr/>

## Installation

`npm install --save kandinsky-js`

and import as needed.

## Features

- Written in TypeScript, usable in JavaScript
- Immutable, composable functions
- Deals with hex, rgb and hsl colours
- Programmatic generation for linear and non-linear gradients

## API

### Types

---
```typescript
type RGB = [number, number, number];
type HSL = [number, number, number];

// When either RGB or HSL colours can be used
type XYZ = RGB | HSL;

// `t` is expected to be in range [0, 1], and the function should return a value
// in the range [0, 1]
type EaseFn = (t: number) => number;
```
---

### __rgb2hsl(rgbArray)__

> returns a hsl array

---
```typescript
rgb2hsl: ([r, g, b]: RGB) => HSL;
```
---

### __hsl2rgb(hslArray)__

> returns an rgb array

---
```typescript
hsl2rgb: ([h, s, l]: HSL) => RGB;
```
---

### __hex2rgb(hexString)__

> returns an rgb array

---
```typescript
hex2rgb: (hex: string) => RGB;
```
---

### __rgb2hex(rgbArray)__

> returns a hex string

---
```typescript
rgb2hex: (rgb: RGB) => string;
```
---

### __hex2hsl(hexString)__

> returns a hsl array

---
```typescript
hex2hsl: (hex: string) => HSL;
```
---

### __hsl2hex(hslArray)__

> returns a hex string

---
```typescript
hsl2hex: (hsl: HSL) => string;
```
---

### __darkenRgb(amount, rgbArray)__

> returns a darkened rgb array. `amount` is a value in the range `[0, 1]`

---
```typescript
darkenRgb: (amount: number, rgb: RGB) => RGB;
```
---

### __lightenRgb(amount, rgbArray)__

> returns a lightened rgb array. `amount` is a value in the range `[0, 1]`

---
```typescript
lightenRgb: (amount: number, rgb: RGB) => RGB;
```
---

### __darkenHsl(amount, hslArray)__

> returns a darkened hsl array. `amount` is a value in the range `[0, 1]`

---
```typescript
darkenHsl: (amount: number, [h, s, l]: HSL) => HSL;
```
---

### __lightenHsl(amount, hslArray)__

> returns a lightened hsl array. `amount` is a value in the range `[0, 1]`

---
```typescript
lightenHsl: (amount: number, [h, s, l]: HSL) => HSL;
```
---

### __lightenHex(amount, hexString)__

> returns a lightened hex string. `amount` is a value in the range `[0, 1]`

---
```typescript
lightenHex: (amount: number, hex: string) => string;
```
---

### __darkenHex(amount, hexString)__

> returns a darkened hex string. `amount` is a value in the range `[0, 1]`

---
```typescript
darkenHex: (amount: number, hex: string) => string;
```
---

### __lerp3(t, c1, c2)__

> returns a Vector3 colour somewhere between `c1` and `c2`. `t` is the "time" value in the range `[0, 1]`

---
```typescript
lerp3: (t: number, [a1, b1, c1]: XYZ, [a2, b2, c2]: XYZ) => XYZ;
```
---

### __linearGradient(n, c1, c2)__

> returns an length `n` array of Vector3 colours. colours are evenly spaced between `c1` and `c2`.

---
```typescript
linearGradient: (n: number, c1: XYZ, c2: XYZ) => XYZ[];
```
---

### __gradient(easeFn, n, c1, c2)__

> returns an length `n` array of Vector3 colours. colours are between `c1` and `c2`, and are spaced according to the easing function `easeFn`.

---
```typescript
gradient: (ease: EaseFn, n: number, c1: XYZ, c2: XYZ) => XYZ[];
```
---

### __multiGradient(n, [col1, col3, ..., colN])__

> returns a length `n` array of Vector3 colours. colours are the ones formed from the `linearGradient(n/(numColours-1), col1, col2)` for all colours `col1, col2, ..., colN`

---
```typescript
multiGradient: (n: number, colors: XYZ[]) => XYZ[];
```
---


### __rLinearGradient(n, c1, c2)__

> returns a rounded, length `n` array of Vector3 colours. colours are evenly spaced between `c1` and `c2`.

---
```typescript
rLinearGradient: (n: number, c1: XYZ, c2: XYZ) => XYZ[];
```
---

### __rGradient(easeFn, n, c1, c2)__

> returns a rounded, length `n` array of Vector3 colours. colours are between `c1` and `c2`, and are spaced according to the easing function `easeFn`.

---
```typescript
rGradient: (ease: EaseFn, n: number, c1: XYZ, c2: XYZ) => XYZ[];
```
---

### __rMultiGradient(n, [col1, col3, ..., colN])__

> returns a rounded, length `n` array of Vector3 colours. colours are the ones formed from the `linearGradient(n/(numColours-1), col1, col2)` for all colours `col1, col2, ..., colN`

---
```typescript
rMultiGradient: (n: number, colors: XYZ[]) => XYZ[];
```
---

### __complimentHex(n, hexString)__

> returns an length `n` array of hex strings. The 0th color is the same as the input `hexString`, while the others are colours corresponding to an eve turn around the colour wheel. If `n` is 3 for example, the two other colours would represent a 1/3 and 2/3 rotation of the colour wheel.

---
```typescript
complimentHex: (n: number, hex: string) => string[];
```
---

### __complimentHsl(n, hsl)__

> returns an length `n` array of hsl Vector3. The 0th color is the same as the input `hsl`, while the others are colours corresponding to an eve turn around the colour wheel. If `n` is 3 for example, the two other colours would represent a 1/3 and 2/3 rotation of the colour wheel.

---
```typescript
complimentHsl: (n: number, [h, s, l]: HSL) => HSL[];
```
---

### __complimentRgb(n, rgb)__

> returns an length `n` array of rgb Vector3. The 0th color is the same as the input `rgb`, while the others are colours corresponding to an eve turn around the colour wheel. If `n` is 3 for example, the two other colours would represent a 1/3 and 2/3 rotation of the colour wheel.

---
```typescript
complimentRgb: (n: number, rgb: RGB) => RGB[];
```
---

### __rgb2css(alpha, rgb)__

> returns an rgba css string like `rgba(255, 255, 255, 1)` from the rgb color and alpha value

---
```typescript
rgb2css: (alpha: number, rgb: RGB) => string;
```
---

### __hsl2css(alpha, hsl)__

> returns an hsl css string like `hsl(222, 50%, 75%, 0.6)` from the hsl color and alpha value

---
```typescript
hsl2css: (alpha: number, [h, s, l]: HSL) => string;
```
---
