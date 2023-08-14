export const getRandomInteger = (max: number, min: number = 0) => {
  max = Math.floor(max);
  min = Math.ceil(min);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
