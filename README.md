<h1 align="center">Kandinsky JS</h1>
<p align="center">
  <img src="./logo.png"/>
  <br/>
  A (mini) colour manipulation library
</p>
<hr/>

## Installation

`npm install --save kandinsky-js`

and import or require as needed. If you need to use a standalone windowed version in a script tag:

`<script src="https://unpkg.com/kandinsky-js@1.3.0/dist/kandinsky.js"></script>`

or

`<script src="node_modules/kandinsky-js/dist/kandinsky.js"></script>`


## Features

- Immutable, curried, composable functions
- Deals with hex, rgb and hsl colours
- Composable and fully curried

## API

### __rgb2hsl(rgbArray)__

> returns a hsl array

---
```javascript
rgb2hsl :: [Number, Number, Number] -> [Number, Number, Number]
```
---

### __hsl2rgb(hslArray)__

> returns an rgb array

---
```javascript
hsl2rgb :: [Number, Number, Number] -> [Number, Number, Number]
```
---

### __hex2rgb(hexString)__

> returns an rgb array

---
```javascript
hex2rgb :: String -> [Number, Number, Number]
```
---

### __rgb2hex(rgbArray)__

> returns a hex string

---
```javascript
rgb2hex :: [Number, Number, Number] -> String<
```
---

### __hex2hsl(hexString)__

> returns a hsl array

---
```javascript
hex2hsl :: String -> [Number, Number, Number]
```
---

### __hsl2hex(hslArray)__

> returns a hex string

---
```javascript
hsl2hex :: [Number, Number, Number] -> String<
```
---

### __darkenRgb(amount, rgbArray)__

> returns a darkened rgb array. `amount` is a value in the range `[0, 1]`

---
```javascript
darkenRgb :: Number -> [Number, Number, Number] -> [Number, Number, Number]
```
---

### __lightenRgb(amount, rgbArray)__

> returns a lightened rgb array. `amount` is a value in the range `[0, 1]`

---
```javascript
lightenRgb :: Number -> [Number, Number, Number] -> [Number, Number, Number]
```
---

### __darkenHsl(amount, hslArray)__

> returns a darkened hsl array. `amount` is a value in the range `[0, 1]`

---
```javascript
darkenHsl :: Number -> [Number, Number, Number] -> [Number, Number, Number]
```
---

### __lightenHsl(amount, hslArray)__

> returns a lightened hsl array. `amount` is a value in the range `[0, 1]`

---
```javascript
lightenHsl :: Number -> [Number, Number, Number] -> [Number, Number, Number]
```
---

### __lightenHex(amount, hexString)__

> returns a lightened hex string. `amount` is a value in the range `[0, 1]`

---
```javascript
lightenHex :: Number -> String -> [Number, Number, Number]
```
---

### __darkenHex(amount, hexString)__

> returns a darkened hex string. `amount` is a value in the range `[0, 1]`

---
```javascript
darkenHex :: Number -> String -> [Number, Number, Number]
```
---

### __lerp3(t, c1, c2)__

> returns a Vector3 colour somewhere between `c1` and `c2`. `t` is the "time" value in the range `[0, 1]`

---
```javascript
lerp3 :: Int -> [Number, Number, Number] -> [Number, Number, Number] -> [Number, Number, Number]
```
---

### __linearGradient(n, c1, c2)__

> returns an length `n` array of Vector3 colours. colours are evenly spaced between `c1` and `c2`.

---
```javascript
linearGradient :: Int -> [Number, Number, Number] -> [Number, Number, Number] -> [[Number, Number, Number]
```
---

### __gradient(easeFn, n, c1, c2)__

> returns an length `n` array of Vector3 colours. colours are between `c1` and `c2`, and are spaced according to the easing function `easeFn`.

---
```javascript
gradient :: Function -> Int -> [Number, Number, Number] -> [Number, Number, Number] -> [[Number, Number, Number]
```
---

### __multiGradient(n, [col1, col3, ..., colN])__

> returns a length `n` array of Vector3 colours. colours are the ones formed from the `linearGradient(n/(numColours-1), col1, col2)` for all colours `col1, col2, ..., colN`

---
```javascript
multiGradient :: Int -> [[Number, Number, Number]] -> [[Number, Number, Number]
```
---


### __rLinearGradient(n, c1, c2)__

> returns a rounded, length `n` array of Vector3 colours. colours are evenly spaced between `c1` and `c2`.

---
```javascript
rLinearGradient :: Int -> [Number, Number, Number] -> [Number, Number, Number] -> [[Number, Number, Number]
```
---

### __rGradient(easeFn, n, c1, c2)__

> returns a rounded, length `n` array of Vector3 colours. colours are between `c1` and `c2`, and are spaced according to the easing function `easeFn`.

---
```javascript
rGradient :: Function -> Int -> [Number, Number, Number] -> [Number, Number, Number] -> [[Number, Number, Number]
```
---

### __rMultiGradient(n, [col1, col3, ..., colN])__

> returns a rounded, length `n` array of Vector3 colours. colours are the ones formed from the `linearGradient(n/(numColours-1), col1, col2)` for all colours `col1, col2, ..., colN`

---
```javascript
rMultiGradient :: Int -> [[Number, Number, Number]] -> [[Number, Number, Number]
```
---

### __complimentHex(n, hexString)__

> returns an length `n` array of hex strings. The 0th color is the same as the input `hexString`, while the others are colours corresponding to an eve turn around the colour wheel. If `n` is 3 for example, the two other colours would represent a 1/3 and 2/3 rotation of the colour wheel.

---
```javascript
complimentHex :: Int -> String -> [String]
```
---

### __complimentHsl(n, hsl)__

> returns an length `n` array of hsl Vector3. The 0th color is the same as the input `hsl`, while the others are colours corresponding to an eve turn around the colour wheel. If `n` is 3 for example, the two other colours would represent a 1/3 and 2/3 rotation of the colour wheel.

---
```javascript
complimentHsl :: Int -> [Number, Number, Number] -> [[Number, Number, Number]]
```
---

### __complimentRgb(n, rgb)__

> returns an length `n` array of rgb Vector3. The 0th color is the same as the input `rgb`, while the others are colours corresponding to an eve turn around the colour wheel. If `n` is 3 for example, the two other colours would represent a 1/3 and 2/3 rotation of the colour wheel.

---
```javascript
complimentRgb :: Int -> [Number, Number, Number] -> [[Number, Number, Number]]
```
---

### __rgb2css(alpha, rgb)__

> returns an rgba css string like `rgba(255, 255, 255, 1)` from the rgb color and alpha value

---
```javascript
rgb2css :: Number -> [Number, Number, Number] -> String
```
---

### __hsl2css(alpha, hsl)__

> returns an hsl css string like `hsl(222, 50%, 75%, 0.6)` from the hsl color and alpha value

---
```javascript
hsl2css :: Number -> [Number, Number, Number] -> String
```
---

### __polute(target)__

> Polute the `target` object by injecting all of the above functions. By default `target` refers to `window`.

---
```javascript
polute :: Object -> void
```
---


### Window API

When using with a script tag in the window, functions are exported on the `window.kandinsky` namespace.