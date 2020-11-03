import isCrossOrigin from './isCrossOrigin';
import setFPS from './setFPS';

export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (isCrossOrigin(url)) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(Error(`${url} load failed`));
    };
    img.src = url;
  });
}

function isInteger(num) {
  return typeof num === 'number' && parseInt(num) === num;
}

function CanvasSprite({
  canvas,
  imageUrl,
  frames,
  fps = 12,
  loop = true,
  onEnd,
  onLoop
}) {
  if (!canvas) {
    throw new Error('canvas is required');
  }

  if (!imageUrl) {
    throw new Error('imageUrl is required');
  }

  if (!isInteger(frames)) {
    throw new Error('frames is required and should be integer');
  }

  if (!isInteger(fps)) {
    throw new Error('fps is required and should be integer');
  }

  if (canvas.hasAttribute('data-cs-id')) {
    throw new Error('the canvas has sprite with it, call .destroy() first');
  }
  canvas.setAttribute('data-cs-id', `cs-${Date.now()}`);

  let paused = false;
  let frameIndex = 0;
  let fpsIns = null;
  const context = canvas.getContext('2d');
  let imgRef = null;
  function renderFrame() {
    if (!imgRef) {
      return;
    }
    const spriteWidth = imgRef.width;
    const spriteHeight = imgRef.height;
    if (frameIndex < frames) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        imgRef,
        (frameIndex * spriteWidth) / frames,
        0,
        spriteWidth / frames,
        spriteHeight,
        0,
        0,
        spriteWidth / frames,
        spriteHeight
      );
    }
    frameIndex++;
    if (frameIndex === frames) {
      if (!loop) {
        fpsIns.cancel();
        onEnd && onEnd();
      } else {
        frameIndex = 0;
        onLoop && onLoop();
      }
    }
  }

  function startAnim(img) {
    canvas.width = img.width / frames;
    canvas.height = img.height;
    imgRef = img;
    renderFrame();
    fpsIns = setFPS(() => {
      if (paused) {
        return;
      }
      renderFrame();
    }, fps);
  }

  if (imageUrl instanceof Image) {
    startAnim(imageUrl);
  } else {
    loadImage(imageUrl).then(img => {
      startAnim(img);
    });
  }

  function play() {
    paused = false;
  }

  function pause() {
    paused = true;
  }

  function stop() {
    paused = true;
    frameIndex = 0;
    renderFrame();
  }

  function destroy() {
    fpsIns && fpsIns.cancel();
    context && context.clearRect(0, 0, canvas.width, canvas.height);
    canvas && canvas.removeAttribute('data-cs-id');
  }
  return {
    play,
    pause,
    stop,
    destroy
  };
}

CanvasSprite.loadImage = loadImage;

export default CanvasSprite;
