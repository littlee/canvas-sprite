# canvas-sprite

Render sprite animation with canvas, (0 dependencies)

demo: https://codesandbox.io/s/still-hooks-16cj0

## Why?

Because why not ?

Even simple sprite sheet animation can be done with pure CSS, but:
- the animation looks shaking on Android device when the element is using repsonsive unit in some case.
- the animatoin looks flashing on iOS device when the sprite image's dimension is too large.

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

instance methods:

- play(): play animation, can be called after pause/stop
- pause(): pause animation, stay in curren frame
- stop(): stop animation, reset to first frame
- destroy(): destroy animation, should be called when canvas element is removed(unmounted) from DOM, in case of memory leak

## Migrate from v1.x

Basically nothing, `width` and `height` are removed from options since they can be calculated, automagically.

## Caveats

For now, we support single row vertical sprite image only.
