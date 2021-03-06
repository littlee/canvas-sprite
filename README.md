# canvas-sprite

Render sprite animation with canvas

demo: https://codesandbox.io/s/red-dawn-m706x

## Why?

Because why not ?

Even simple sprite sheet animation can be done with pure CSS, but:

- the animation looks "shaking" on Android device when the element is using repsonsive unit in some case.
- the animation looks "flashing" on iOS device when the sprite image's dimension is too large.

## Install!

```
npm i -S canvas-sprite
```

or you can include `dist/main.js` with a `<script />` tag, it exposes `CanvasSprite` to global

## Usage!

### Simple Case

```js
import CanvasSprite from 'canvas-sprite';

var cs = CanvasSprite({
  canvas: document.getElementById('canvas'),
  imageUrl: './sprite.png',
  frames: 25,
  fps: 12,
  loop: true,
  onLoop: function (count) {
    console.log('have looped', count, 'times');
  },
  onEnd: function () {
    console.log('end');
  }
});

// call destroy when the canvas element is removed from DOM
cs.destroy();
```

### Cache Management

If an url string is passed to `options.imageUrl`, the library has to fetch the image from the URL before display the animation, and when the image is too large, it may take too long to fetching it, this will be the case when trying to switch sprite sheet on the same canvas element. So we can pass a loaded `Image` to `options.imageUrl` to get a seamlessly switching.

```js
import CanvasSprite, { loadImage } from 'canvas-sprite';

let cs = null;
function createAnim(image) {
  cs.destroy();
  cs = CanvasSprite({
    canvas: document.getElementById('canvas'),
    imageUrl: image,
    frames: 25,
    fps: 12,
    loop: true
  });
}

// prepare image cache
let cache = [];
Promise.all([
  loadImage('./sprite_sheet_1.png'),
  loadImage('./sprite_sheet_2.png')
])
  .then(imgs => {
    cache = imgs;
    console.log('cache is ready');
  })
  .then(() => {
    createAnim(cache[0]);
    // some time later...
    setTimeout(() => {
      createAnim(cache[1]);
    }, 10 * 1000);
  });
```

## API!

options:

- canvas (HTMLCanvasElement): the canvas we want to render the sprite, **required**
- imageUrl (String|Image): the sprite image url or image element, **required**
- frames (Number): the number of sprite frames, **required**
- fps (Number): frames rendered per second, **required**
- loop (Boolean): should sprite animation loop, default to `true`
- onEnd (Function): function invoked when animation ends if options.loop is `false`
- onLoop (Function): function invoked every time aniamtion loops if options.loop is `true`

instance methods:

- play(): play animation, can be called after pause/stop
- pause(): pause animation, stay in curren frame
- stop(): stop animation, reset to first frame
- destroy(): destroy animation, should be called when canvas element is removed(unmounted) from DOM, in case of memory leak

static methods:

- loadImage(url): load image from url, return a Promise which resolve the loaded image

## Migrate from v1.x

Basically nothing, `width` and `height` are removed from options since they can be calculated, automagically.

## Caveats

- we support single row sprite image only for now
- make sure the width & height of every frame is integer for performance boost
