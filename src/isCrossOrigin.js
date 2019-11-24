import URLParse from 'url-parse';

// crossOrigin = 'anonymous'
function isCrossOrigin(url) {
  if (!url || typeof url !== 'string') {
    throw new Error('url is required and should be string');
  }
  if (!/^data:/.test(url)) {
    let parsedUrl = new URLParse(url);
    return parsedUrl.origin !== window.location.origin;
  }
  return false;
}

export default isCrossOrigin;