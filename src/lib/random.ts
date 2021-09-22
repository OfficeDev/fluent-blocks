export const randomString = (n = 4) =>
  Math.random()
    .toString(16)
    .slice(2, n + 2)
