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

export default fetchAsDataURL;