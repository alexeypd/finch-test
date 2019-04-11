export const isEmpty = (data) => {
  if ((typeof data === 'string' && data === 'undefined') || data === '') {
    return true;
  }

  if (data === undefined || data === null) {
    return true;
  }

  if (Array.isArray(data)) {
    return data.length === 0;
  }

  if (typeof data === 'object') {
    return Object.keys(data).length === 0;
  }

  return false;
};
