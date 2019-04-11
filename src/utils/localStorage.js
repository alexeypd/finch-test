function setLocalStorage(fields = {}) {
  return Object.keys(fields).forEach(field =>
    localStorage.setItem(field, fields[field]),
  );
}

function getLocalStorage(fields = []) {
  const readBuffer = {};

  fields.forEach(field =>
    Object.assign(readBuffer, { [field]: localStorage.getItem(field) }),
  );

  return readBuffer;
}

export { setLocalStorage, getLocalStorage };
