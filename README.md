# canvas-sprite

Render sprite animation with canvas, (0 dependencies)

demo: https://codesandbox.io/s/affectionate-flower-s3opk

## Why?

Because why not ?

## Install!

```
npm i -S canvas-sprite
```

or you can include `dist/main.js` with a `<script />` tag, it exposes `CanvasSprite` to global

## Usage!

```js
import CanvasSprite from 'canvas-sprite';

var cs = CanvasSprite({
  canvas: document.getElementById('canvas'),
  imageUrl: './sprite.png',
  frames: 25,
  fps: 12,
  loop: true,
  onLoop: function(count) {
    console.log('have looped', count, 'times');
  },
  onEnd: function() {
    console.log('end');
  }
});

// call destroy when the canvas element is removed from DOM
cs.destroy();
```

options:

- canvas (HTMLCanvasElement): the canvas we want to render the sprite, **required**
- imageUrl (String): the sprite image url, **required**
- frames (Number): the number of sprite frames, **required**
- fps (Number): frames rendered per second, **required**
- loop (Boolean): should sprite animation loop, default to `true`
- onLoop (Function): function invoked every time aniamtion loops if options.loop is `true`, takes `count` as parameter
- onEnd (Function): function invoked when animation ends if options.loop is `false`

## Migrate from v1.x

Basically nothing, `width` and `height` are removed from options since they can be calculated, automagically.

## Caveats

For now, we support single row vertical sprite image only.
