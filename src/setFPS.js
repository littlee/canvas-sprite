function setFPS(cb, fps = 60) {
  if (typeof cb !== 'function') {
    throw Error('cb should be function');
  }
  if (typeof fps !== 'number') {
    throw Error('fps should be number');
  }
  if (fps < 1 || fps > 60) {
    throw Error('fps should be in range of [1, 60]');
  }
  const interval = parseInt(1000 / Math.min(fps, 60));
  let id = null;
  let prevTime = performance.now();
  function loop(ts) {
    id = requestAnimationFrame(loop);
    if (ts - prevTime >= interval) {
      cb();
      prevTime = ts;
    }
  }
  id = requestAnimationFrame(loop);
  return {
    cancel: () => {
      cancelAnimationFrame(id);
    }
  };
}

export default setFPS;
