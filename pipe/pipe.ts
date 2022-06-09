export const pipe =
  <T>(...functions: readonly Function[]): Function =>
  (x: T): T => {
    return functions.reduce((value, func) => func(value), x);
  };
