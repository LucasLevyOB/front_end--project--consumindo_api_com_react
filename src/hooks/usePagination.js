import { useMemo, useState } from "react";

function countTotalPages(totalCount, pageSize) {
  return Math.ceil(totalCount / pageSize);
}

const usePagination = (totalCount, pageSize, totalPages, actualPage = 1) => {
  const [pagination, setPagination] = useState({
    totalCount,
    pageSize,
    totalPages,
    actualPage,
  });

  function getPageData(data) {
    return data.slice(
      pagination.actualPage * pagination.pageSize - pagination.pageSize,
      pagination.pageSize * pagination.actualPage
    );
  }

  function handlePagination(key, value) {
    if (key === "totalCount") {
      const totalPages = countTotalPages(value, pagination.pageSize);
      setPagination({
        ...pagination,
        [key]: value,
        totalPages: totalPages,
        actualPage:
          pagination.actualPage > totalPages
            ? totalPages
            : pagination.actualPage,
      });
    } else {
      setPagination({
        ...pagination,
        [key]: value,
      });
    }
  }

  function saveActualPage(page) {
    localStorage.setItem("actualPage", page);
  }

  function handlePageChange(event, value) {
    saveActualPage(value);
    setPagination({
      ...pagination,
      actualPage: value,
    });
  }

  return {
    pagination,
    setPagination,
    handlePageChange,
    handlePagination,
    getPageData,
  };
};

export default usePagination;
