const handler = (target, prop, receiver) => {
  console.log({ target, prop, receiver });
};

export const reactive = (val) => new Proxy(val, handler);
