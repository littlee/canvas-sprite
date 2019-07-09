// import './polyfill.js';

function CanvasSprite({
  canvas,
  imageUrl,
  width,
  height,
  frames,
  fps,
  loop = true,
  onEnd,
  onLoop
}) {
  let context = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  let reqId = null;

  let spriteImg = new Image();
  spriteImg.onload = () => {
    let now = 0;
    let then = Date.now();
    let fpsInterval = 1000 / fps;
    let delta = 0;

    let frameIndex = 0;
    let spriteWidth = width * frames;
    let spriteHeight = height;

    let loopCount = 0;

    function renderFrame() {
      if (frameIndex < frames - 1) {
        frameIndex += 1;
      } else {
        if (loop) {
          frameIndex = 0;
          loopCount++;
          onLoop && onLoop(loopCount);
        } else {
          window.cancelAnimationFrame(reqId);
          onEnd && onEnd();
        }
      }
      context.clearRect(0, 0, spriteWidth, height);
      context.drawImage(
        spriteImg,
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

    function spriteLoop() {
      reqId = window.requestAnimationFrame(spriteLoop);
      now = Date.now();
      delta = now - then;
      if (delta > fpsInterval) {
        then = now - (delta % fpsInterval);
        renderFrame();
      }
    }
    renderFrame();
    spriteLoop();
  };
  spriteImg.src = imageUrl;

  function destroy() {
    if (reqId) {
      window.cancelAnimationFrame(reqId);
    }
    reqId = null;
    canvas = null;
    context = null;
    spriteImg = null;
  }
  return {
    destroy
  };
}

export default CanvasSprite;
