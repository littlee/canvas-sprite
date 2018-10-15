# canvas-sprite

Render sprite animation with canvas, (0 dependencies)

## Why

Because why not

## Install

```
npm i -S canvas-sprite
```

## Usage

```js
import CanvasSprite from 'canvas-sprite';
// or use <script> tag to include, and CanvasSprite will be exposed to global

CanvasSprite({
  canvas: document.getElementById('canvas'),
  imageUrl: './sprite.png',
  width: 460,
  height: 380,
  numberOfFrames: 25,
  ticksPerFrame: 3
});
```
