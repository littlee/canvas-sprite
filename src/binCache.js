let cacheMap = {};

const binCache = {
  get: key => cacheMap[key],
  set: (key, value) => {
    cacheMap[key] = value;
    return { key, value };
  },
  delete: key => {
    delete cacheMap[key];
  },
  clear: () => {
    cacheMap = {};
  }
};

export default binCache;
