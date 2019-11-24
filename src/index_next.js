// import binCache from './binCache';
import isCrossOrigin from './isCrossOrigin';

// function tryFromCache(key) {
//   return new Promise(resolve => {
//     const value = binCache.get(key);
//     if (value) {
//       resolve(value);
//     } else {
//       return fetchAsDataURL(key).then(fetchRes => {
//         binCache.set(fetchRes.url, fetchRes.result);
//         resolve(fetchRes.result);
//       });
//     }
//   });
// }

function loadImage(url) {
  return new Promise((resolve, reject) => {
    // xhr GET max size limit ?
    // return tryFromCache(url).then(src => {
      const img = new Image();
      if (isCrossOrigin(url)) {
        img.crossOrigin = 'anonymous';
      }
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject(Error(`load ${url} error`));
      };
      img.src = url;
    // });
  });
}

function CanvasSprite({
  canvas,
  imageUrl,
  frames,
  fps,
  loop = true,
  onEnd,
  onLoop
}) {
  if (canvas.hasAttribute('data-cs-id')) {
    throw new Error('the canvas has sprite with it, call .destroy() first');
  }
  canvas.setAttribute('data-cs-id', `cs-${Date.now()}`);
  let context = canvas.getContext('2d');

  let reqId = null;
  let animPaused = false;
  let frameIndex = 0;
  let spriteImgRef = null;

  let loopCount = 0;

  let now = 0;
  let then = 0;
  let fpsInterval = 1000 / fps;
  let delta = 0;
  function spriteLoop() {
    if (!animPaused && spriteImgRef) {
      now = Date.now();
      delta = now - then;
      if (delta >= fpsInterval) {
        then = now - (delta % fpsInterval);
        renderFrame();
      }
    }
    reqId = window.requestAnimationFrame(spriteLoop);
  }

  function renderFrame() {
    const spriteWidth = spriteImgRef.width;
    const spriteHeight = spriteImgRef.height;

    if (frameIndex < frames) {
      context.clearRect(0, 0, spriteWidth, spriteHeight);
      context.drawImage(
        spriteImgRef,
        (frameIndex * spriteWidth) / frames,
        0,
        spriteWidth / frames,
        spriteHeight,
        0,
        0,
        spriteWidth / frames,
        spriteHeight
      );
      // last frame
      if (frameIndex === frames - 1) {
        if (loop) {
          frameIndex = 0;
          loopCount++;
          onLoop && onLoop(loopCount);
        } else {
          animPaused = true;
          window.cancelAnimationFrame(reqId);
          onEnd && onEnd();
        }
      } else {
        frameIndex += 1;
      }
    }
  }

  loadImage(imageUrl).then(spriteImg => {
    spriteImgRef = spriteImg;
    let cWidth = spriteImg.width / frames;
    let cHeight = spriteImg.height;
    // loading image takes time, destroy may be called before
    if (canvas) {
      canvas.width = cWidth;
      canvas.height = cHeight;
      then = Date.now();
      renderFrame();
      spriteLoop();
    }
  });

  function play() {
    animPaused = false;
  }

  function pause() {
    animPaused = true;
  }

  function stop() {
    animPaused = true;
    frameIndex = 0;
    renderFrame();
  }

  function destroy() {
    animPaused = false;
    spriteImgRef = null;

    reqId && window.cancelAnimationFrame(reqId);
    context && context.clearRect(0, 0, canvas.width, canvas.height);
    canvas && canvas.removeAttribute('data-cs-id');

    reqId = null;
    context = null;
    canvas = null;
  }
  return {
    play,
    pause,
    stop,
    destroy
  };
}

export default CanvasSprite;
