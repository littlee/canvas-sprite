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

var CS = CanvasSprite({
  canvas: document.getElementById('canvas'),
  imageUrl: './sprite.png',
  width: 460,
  height: 380,
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
CS.destroy();
```

options:

- canvas (HTMLCanvasElement): the canvas we want to render the sprite, **required**
- imageUrl (String): the sprite image url, **required**
- width (Number): width per frame in px, **required**
- height (Number): height per frame in px, **required**
- frames (Number): the number of sprite frames, **required**
- fps (Number): frames rendered per second, **required**
- loop (Boolean): should sprite animation loop, default to `true`
- onLoop (Function): callback function when every time animation loop, only called when options.loop is `true`, receives `count` as parameter
- onEnd (Function): callback function when animation end, only called when options.loop is `false`

## Caveats

For now, we support single row vertical sprite image only.
