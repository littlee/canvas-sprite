# canvas-sprite

Render sprite animation with canvas, (0 dependencies)

## Why?

Because why not ?

## Install!

```
npm i -S canvas-sprite
```

## Usage!

```js
import CanvasSprite from 'canvas-sprite';
// or use <script> tag to include, and CanvasSprite will be exposed to global

CanvasSprite({
  canvas: document.getElementById('canvas'),
  imageUrl: './sprite.png',
  width: 460,
  height: 380,
  frames: 25,
  fps: 12
});
```

## Caveats

For now, we support single row vertical sprite image only.
