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

`<script src="https://unpkg.com/kandinsky-js@1.0.0/dist/kandinsky.js"></script>`

or

`<script src="node_modules/kandinsky-js/dist/kandinsky.js"></script>`


## Features

- Immutable, curried, composable functions
- Deals with hex, rgb and hsl colours
- Composable and fully curried

## API

### __rgb2hsl(rgbArray)__

```javascript
rgb2hsl :: [Number, Number, Number] -> [Number, Number, Number]
```

> returns a hsl array

### __hsl2rgb(hslArray)__

```javascript
hsl2rgb :: [Number, Number, Number] -> [Number, Number, Number]
```

> returns an rgb array

### __hex2rgb(hexString)__

```javascript
hex2rgb :: String -> [Number, Number, Number]
```

> returns an rgb array

### __rgb2hex(rgbArray)__

```javascript
rgb2hex :: [Number, Number, Number] -> String<
```

> returns a hex string

### __hex2hsl(hexString)__

```javascript
hex2hsl :: String -> [Number, Number, Number]
```

> returns a hsl array

### __hsl2hex(hslArray)__

```javascript
hsl2hex :: [Number, Number, Number] -> String<
```

> returns a hex string

### __darkenRgb(amount, rgbArray)__

```javascript
darkenRgb :: [Number, Number, Number] -> [Number, Number, Number]
```

> returns a darkened rgb array. `amount` is a value in the range `[0, 1]`

### __lightenRgb(amount, rgbArray)__

```javascript
lightenRgb :: [Number, Number, Number] -> [Number, Number, Number]
```

> returns a lightened rgb array. `amount` is a value in the range `[0, 1]`

### __darkenHsl(amount, hslArray)__

```javascript
darkenHsl :: [Number, Number, Number] -> [Number, Number, Number]
```

> returns a darkened hsl array. `amount` is a value in the range `[0, 1]`

### __lightenHsl(amount, hslArray)__

```javascript
lightenHsl :: [Number, Number, Number] -> [Number, Number, Number]
```

> returns a lightened hsl array. `amount` is a value in the range `[0, 1]`

### __lightenHex(amount, hexString)__

```javascript
lightenHex :: String -> [Number, Number, Number]
```

> returns a lightened hex string. `amount` is a value in the range `[0, 1]`

### __darkenHex(amount, hexString)__

```javascript
darkenHex :: String -> [Number, Number, Number]
```

> returns a darkened hex string. `amount` is a value in the range `[0, 1]`

### __lerp3(t, c1, c2)__

```javascript
lerp3 :: Int -> [Number, Number, Number] -> [Number, Number, Number] -> [Number, Number, Number]
```

> returns a Vector3 colour somewhere between `c1` and `c2`. `t` is the "time" value in the range `[0, 1]`

### __linearGradient(n, c1, c2)__

```javascript
linearGradient :: Int -> [Number, Number, Number] -> [Number, Number, Number] -> [[Number, Number, Number]
```

> returns an length `n` array of Vector3 colours. colours are evenly spaced between `c1` and `c2`.

### __gradient(easeFn, n, c1, c2)__

```javascript
gradient :: Function -> Int -> [Number, Number, Number] -> [Number, Number, Number] -> [[Number, Number, Number]
```

> returns an length `n` array of Vector3 colours. colours are between `c1` and `c2`, and are spaced according to the easing function `easeFn`.

### __rMultiGradient(n, [col1, col3, ..., colN])__

```javascript
rMultiGradient :: Int -> [[Number, Number, Number]] -> [[Number, Number, Number]
```

### __rLinearGradient(n, c1, c2)__

```javascript
rLinearGradient :: Int -> [Number, Number, Number] -> [Number, Number, Number] -> [[Number, Number, Number]
```

> returns a rounded, length `n` array of Vector3 colours. colours are evenly spaced between `c1` and `c2`.

### __rGradient(easeFn, n, c1, c2)__

```javascript
rGradient :: Function -> Int -> [Number, Number, Number] -> [Number, Number, Number] -> [[Number, Number, Number]
```

> returns a rounded, length `n` array of Vector3 colours. colours are between `c1` and `c2`, and are spaced according to the easing function `easeFn`.

### __multiGradient(n, [col1, col3, ..., colN])__

```javascript
multiGradient :: Int -> [[Number, Number, Number]] -> [[Number, Number, Number]
```

> returns a rounded, length `n` array of Vector3 colours. colours are the ones formed from the `linearGradient(n/(numColours-1), col1, col2)` for all colours `col1, col2, ..., colN`

### __complimentHex(n, hexString)__

```javascript
complimentHex :: Int -> String -> [String]
```

> returns an length `n` array of hex strings. The 0th color is the same as the input `hexString`, while the others are colours corresponding to an eve turn around the colour wheel. If `n` is 3 for example, the two other colours would represent a 1/3 and 2/3 rotation of the colour wheel.

### __complimentHsl(n, hsl)__

```javascript
complimentHsl :: Int -> [Number, Number, Number] -> [[Number, Number, Number]]
```

> returns an length `n` array of hsl Vector3. The 0th color is the same as the input `hsl`, while the others are colours corresponding to an eve turn around the colour wheel. If `n` is 3 for example, the two other colours would represent a 1/3 and 2/3 rotation of the colour wheel.

### __complimentRgb(n, rgb)__

```javascript
complimentRgb :: Int -> [Number, Number, Number] -> [[Number, Number, Number]]
```

> returns an length `n` array of rgb Vector3. The 0th color is the same as the input `rgb`, while the others are colours corresponding to an eve turn around the colour wheel. If `n` is 3 for example, the two other colours would represent a 1/3 and 2/3 rotation of the colour wheel.

### polute(target)__

```javascript
polute :: Object -> void
```

> Polute the `target` object by injecting all of the above functions. By default `target` refers to `window`.


### Window API

When using with a script tag in the window, functions are exported on the `window.kandinsky` namespace.