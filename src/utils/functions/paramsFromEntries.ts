export const paramsFromEntries = (searchParams: URLSearchParams) => {
  return Object.fromEntries(searchParams.entries());
};
