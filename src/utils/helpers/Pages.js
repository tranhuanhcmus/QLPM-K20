export const calcMaxPage = (numberOfItems, currentPage, itemsPerPage) => {
  const totalPages = Math.ceil(numberOfItems / itemsPerPage);
  return Math.max(1, Math.min(totalPages, currentPage));
};
