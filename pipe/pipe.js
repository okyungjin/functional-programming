export const pipe = (...functions) => x => {
  return functions.reduce((value, func) => func(value), x);
};
