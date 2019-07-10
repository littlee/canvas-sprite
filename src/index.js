function CanvasSprite({
  canvas,
  imageUrl,
  frames,
  fps,
  loop = true,
  onEnd,
  onLoop
}) {
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
          onLoop && onLoop(loopCount);
        } else {
          window.cancelAnimationFrame(reqId);
          onEnd && onEnd();
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
