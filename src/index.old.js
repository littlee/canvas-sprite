// import './polyfill.js';

function CanvasSprite(config) {
  var canvas = config.canvas;
  var canvasContext = canvas.getContext('2d');
  canvas.width = config.width;
  canvas.height = config.height;

  var sprite = null;
  var spriteImg = new Image();

  var now;
  var then = Date.now();
  var fpsInterval = 1000 / config.fps;
  var delta;

  var reqId = null;

  function spriteLoop() {
    reqId = window.requestAnimationFrame(spriteLoop);
    now = Date.now();
    delta = now - then;
    if (delta > fpsInterval) {
      then = now - (delta % fpsInterval);
      sprite.update();
      sprite.render();
    }
  }

  function createSprite(options) {
    var that = {};
    var frameIndex = 0;
    var numberOfFrames = options.numberOfFrames || 1;

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.update = function() {
      if (frameIndex < numberOfFrames - 1) {
        frameIndex += 1;
      } else {
        frameIndex = 0;
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
    context: canvasContext,
    width: config.width * config.frames,
    height: config.height,
    image: spriteImg,
    numberOfFrames: config.frames
  });

  spriteImg.addEventListener('load', function() {
    // sprite can be null if destroy happened before image load event
    if (sprite) {
      sprite.update();
      sprite.render();
      spriteLoop();
    }
  });
  spriteImg.src = config.imageUrl;

  return {
    destroy: function() {
      if (reqId) {
        window.cancelAnimationFrame(reqId);
      }
      canvas = null;
      canvasContext = null;
      sprite = null;
      spriteImg = null;
    }
  };
}

export default CanvasSprite;