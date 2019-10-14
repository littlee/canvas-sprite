import binCache from './binCache';

function fetchAsDataURL(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
      let fr = new FileReader();
      fr.onload = e => {
        resolve({ url, result: e.target.result });
      };
      fr.onerror = () => {
        reject(Error(`read ${url} error`));
      };
      fr.readAsDataURL(xhr.response);
    };
    xhr.onerror = () => {
      reject(Error(`fetch ${url} error`));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', url);
    xhr.send();
  });
}

function tryFromCache(key) {
  return new Promise(resolve => {
    const value = binCache.get(key);
    if (value) {
      resolve(value);
    } else {
      return fetchAsDataURL(key).then(fetchRes => {
        binCache.set(fetchRes.url, fetchRes.result);
        resolve(fetchRes.result);
      });
    }
  });
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    return tryFromCache(url).then(src => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject(Error(`load ${url} error`));
      };
      img.src = src;
    });
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
      }
      else {
        frameIndex += 1;
      }
    }
  }

  loadImage(imageUrl).then(spriteImg => {
    spriteImgRef = spriteImg;
    let cWidth = spriteImg.width / frames;
    let cHeight = spriteImg.height;
    canvas.width = cWidth;
    canvas.height = cHeight;
    then = Date.now();
    renderFrame();
    spriteLoop();
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
    if (reqId) {
      window.cancelAnimationFrame(reqId);
    }
    reqId = null;
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.removeAttribute('data-cs-id');
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
