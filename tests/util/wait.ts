export const wait = async (milliseconds: number = 0) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
