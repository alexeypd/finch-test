export const getArrayNeedLength = (quantity) => {
  const newArr = [];
  for (let i = 1; i <= quantity; i++) {
    newArr.push(i);
  }
  return newArr;
};
