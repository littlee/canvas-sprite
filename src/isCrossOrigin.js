function isCrossOrigin(url) {
  if (!url || typeof url !== 'string') {
    throw new Error('url is required and should be string');
  }
  if (!/^data:/.test(url)) {
    const urlAnchor = document.createElement('a');
    urlAnchor.href = url;
    return urlAnchor.origin !== window.location.origin;
  }
  return false;
}

export default isCrossOrigin;
