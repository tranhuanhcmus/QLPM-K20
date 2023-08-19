let timer = null;
export const debouncePromise = (func, timeout) => {
  return (args) =>
    new Promise((resolve, reject) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        timer = null;
        func(args)
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      }, timeout);
    });
};
