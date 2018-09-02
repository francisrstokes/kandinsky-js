# Kandisky JS

`kandinsky-js` is a mini library for manipulating colours.

## Installation

`npm install --save kandinsky-js`

and import or require as needed. If you need to use a standalone windowed version in a script tag:

`<script src="https://unpkg.com/kandinsky-js@1.0.0/dist/kandinsky.js"></script>`

or

`<script src="node_modules/kandinsky-js/dist/kandinsky.js"></script>`


## Features

- Immutable, curried, composable functions
- Deals with hex, rgb and hsl colours
- Composable and fully curried

## API

### Module API

<details>
  <summary>rgb2hsl :: [Number, Number, Number] -> [Number, Number, Number]</summary>
  <p><b>rgb2hsl(rgbArray)</b></p>
  returns a hsl array
</details>
<details>
  <summary>hsl2rgb :: [Number, Number, Number] -> [Number, Number, Number]</summary>
  <p><b>hsl2rgb(hslArray)</b></p>
  returns an rgb array
</details>
<details>
  <summary>hex2rgb :: String -> [Number, Number, Number]</summary>
  <p><b>hex2rgb(hexString)</b></p>
  returns an rgb array
</details>
<details>
  <summary>rgb2hex :: [Number, Number, Number] -> String</summary>
  <p><b>rgb2hex(rgbArray)</b></p>
  returns a hex string
</details>
<details>
  <summary>hex2hsl :: String -> [Number, Number, Number]</summary>
  <p><b>hex2hsl(hexString)</b></p>
  returns a hsl array
</details>
<details>
  <summary>hsl2hex :: [Number, Number, Number] -> String</summary>
  <p><b>hsl2hex(hslArray)</b></p>
  returns a hex string
</details>
<details>
  <summary>darkenRgb :: [Number, Number, Number] -> [Number, Number, Number]</summary>
  <p><b>darkenRgb(amount, rgbArray)</b></p>
  returns a darkened rgb array. `amount` is a value in the range `[0, 1]`
</details>
<details>
  <summary>lightenRgb :: [Number, Number, Number] -> [Number, Number, Number]</summary>
  <p><b>lightenRgb(amount, rgbArray)</b></p>
  returns a lightened rgb array. `amount` is a value in the range `[0, 1]`
</details>
<details>
  <summary>darkenHsl :: [Number, Number, Number] -> [Number, Number, Number]</summary>
  <p><b>darkenHsl(amount, hslArray)</b></p>
  returns a darkened hsl array. `amount` is a value in the range `[0, 1]`
</details>
<details>
  <summary>lightenHsl :: [Number, Number, Number] -> [Number, Number, Number]</summary>
  <p><b>lightenHsl(amount, hslArray)</b></p>
  returns a lightened hsl array. `amount` is a value in the range `[0, 1]`
</details>
<details>
  <summary>lightenHex :: String -> [Number, Number, Number]</summary>
  <p><b>lightenHex(amount, hexString)</b></p>
  returns a lightened hex string. `amount` is a value in the range `[0, 1]`
</details>
<details>
  <summary>darkenHex :: String -> [Number, Number, Number]</summary>
  <p><b>darkenHex(amount, hexString)</b></p>
  returns a darkened hex string. `amount` is a value in the range `[0, 1]`
</details>
<details>
  <summary>lerp3 :: Int -> [Number, Number, Number] -> [Number, Number, Number] -> [Number, Number, Number]</summary>
  <p><b>lerp3(t, c1, c2)</b></p>
  returns a Vector3 colour somewhere between `c1` and `c2`. `t` is the "time" value in the range `[0, 1]`
</details>
<details>
  <summary>linearGradient :: Int -> [Number, Number, Number] -> [Number, Number, Number] -> [[Number, Number, Number]]</summary>
  <p><b>linearGradient(n, c1, c2)</b></p>
  returns an length `n` array of Vector3 colours. colours are evenly spaced between `c1` and `c2`.
</details>
<details>
  <summary>gradient :: Function -> Int -> [Number, Number, Number] -> [Number, Number, Number] -> [[Number, Number, Number]]</summary>
  <p><b>gradient(easeFn, n, c1, c2)</b></p>
  returns an length `n` array of Vector3 colours. colours are between `c1` and `c2`, and are spaced according to the easing function `easeFn`.
</details>
<details>
  <summary>multiGradient :: Int -> [[Number, Number, Number]] -> [[Number, Number, Number]]</summary>
  <p><b>multiGradient(n, [col1, col3, ..., colN])</b></p>
  returns an length `n` array of Vector3 colours. colours are the ones formed from the `linearGradient(n/(numColours-1), col1, col2)` for all colours `col1, col2, ..., colN`
</details>


### Window API

When using the standalone window version, functions are exported on the `window.kandinsky` namespace.