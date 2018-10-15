import './polyfill.js';

function CanvasSprite(config) {
  var canvas = config.canvas;
  canvas.width = config.width;
  canvas.height = config.height;

  var sprite = null;
  var spriteImg = new Image();

  function spriteLoop() {
    window.requestAnimationFrame(spriteLoop);
    sprite.update();
    sprite.render();
  }

  function createSprite(options) {
    var that = {};
    var frameIndex = 0;
    var tickCount = 0;
    var ticksPerFrame = options.ticksPerFrame || 0;
    var numberOfFrames = options.numberOfFrames || 1;

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.update = function() {
      tickCount += 1;

      if (tickCount > ticksPerFrame) {
        tickCount = 0;
        if (frameIndex < numberOfFrames - 1) {
          frameIndex += 1;
        } else {
          frameIndex = 0;
        }
      }
    };

    that.render = function() {
      that.context.clearRect(0, 0, that.width, that.height);
      that.context.drawImage(
        that.image,
        (frameIndex * that.width) / numberOfFrames,
        0,
        that.width / numberOfFrames,
        that.height,
        0,
        0,
        that.width / numberOfFrames,
        that.height
      );
    };

    return that;
  }

  sprite = createSprite({
    context: canvas.getContext('2d'),
    width: config.width * config.numberOfFrames,
    height: config.height,
    image: spriteImg,
    numberOfFrames: config.numberOfFrames,
    ticksPerFrame: config.ticksPerFrame
  });

  spriteImg.addEventListener('load', spriteLoop);
  spriteImg.src = config.imageUrl;
}

export default CanvasSprite;
