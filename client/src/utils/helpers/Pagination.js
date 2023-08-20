export const slicePaginationData = (
  data,
  pageNumber,
  maxPage,
  elementPerPage
) => {
  if (!Array.isArray(data)) return [];
  else {
    if (pageNumber <= maxPage && pageNumber > 0) {
      return data.slice(
        elementPerPage * (pageNumber - 1),
        elementPerPage * (pageNumber - 1) + elementPerPage
      );
    } else {
      return [];
    }
  }
};
export const isDisablePrev = ({ currentPage }) => {
  return currentPage - 1 < 1;
};
export const isDisableNext = ({ currentPage, maxPage }) => {
  return currentPage + 1 > maxPage;
};
export const handlePrevPage = ({ currentPage, maxPage }, paginateCallback) => {
  if (!isDisablePrev({ currentPage })) {
    paginateCallback({
      currentPage: currentPage - 1,
      maxPage,
    });
  }
};
export const handleNextPage = ({ currentPage, maxPage }, paginateCallback) => {
  if (!isDisableNext({ currentPage, maxPage })) {
    paginateCallback({
      currentPage: currentPage + 1,
      maxPage,
    });
  }
};
export const calculateFromIndex = (currentPage, elementPerPage) => {
  if (!currentPage) return 0;
  return (currentPage - 1) * elementPerPage + 1;
};
export const calculateToIndex = (data, currentPage, elementPerPage) => {
  if (!currentPage) return 0;
  if (!Array.isArray(data)) return null;
  const testMaxElement =
    (currentPage - 1) * elementPerPage + elementPerPage - 1;
  if (data.length < testMaxElement) {
    return data.length;
  } else {
    return testMaxElement + 1;
  }
};
export const calculateNumberList = (pageNumber, maxPage) => {
  const displayPages = [];

  if (pageNumber === 1) {
    for (let i = 0; i < 3 && pageNumber + i <= maxPage; i++) {
      displayPages.push({
        page: pageNumber + i,
        active: i === 0 ? true : false,
      });
    }
  } else if (pageNumber < maxPage) {
    displayPages.push(
      { page: pageNumber - 1, active: false },
      { page: pageNumber, active: true },
      { page: pageNumber + 1, active: false }
    );
  } else if (pageNumber === maxPage) {
    for (
      let i = pageNumber > 2 ? 2 : pageNumber - 1;
      i >= 0 && pageNumber - i >= 1;
      i--
    ) {
      displayPages.push({
        page: pageNumber - i,
        active: i === 0 ? true : false,
      });
    }
  }

  return displayPages;
};
const defaultStartPage = 1;
export const calculateMaxPage = (data, maxElementPerPage) => {
  return data ? Math.ceil(data.length / maxElementPerPage) : defaultStartPage;
};
