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

  let spriteImg = new Image();
  spriteImg.onload = () => {
    let cWidth = spriteImg.width / frames;
    let cHeight = spriteImg.height;
    canvas.width = cWidth;
    canvas.height = cHeight;

    let now = 0;
    let then = Date.now();
    let fpsInterval = 1000 / fps;
    let delta = 0;

    let frameIndex = 0;
    let spriteWidth = canvas.width * frames;
    let spriteHeight = canvas.height;

    let loopCount = 0;

    function renderFrame() {
      if (frameIndex < frames - 1) {
        frameIndex += 1;
      } else {
        if (loop) {
          frameIndex = 0;
          loopCount++;
          setTimeout(() => {
            onLoop && onLoop(loopCount);
          }, 0);
        } else {
          window.cancelAnimationFrame(reqId);
          setTimeout(() => {
            onEnd && onEnd();
          }, 0);
        }
      }
      context.clearRect(0, 0, spriteWidth, cHeight);
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
    context.clearRect(0, 0, canvas.width, canvas.height);
    reqId = null;
    canvas.removeAttribute('data-cs-id');
    canvas = null;
    context = null;
    spriteImg = null;
  }
  return {
    destroy
  };
}

export default CanvasSprite;
