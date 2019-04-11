let setTimeoutId = null;

export const debounce = (func, wait) => {
  clearTimeout(setTimeoutId);
  setTimeoutId = setTimeout(() => {
    func();
  }, wait);
};
