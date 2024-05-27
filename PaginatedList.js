import React, { useState } from 'react';

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return React.createElement(
    'div',
    null,
    Array.from({ length: totalPages }, (_, index) =>
      React.createElement(
        'button',
        {
          key: index,
          onClick: () => handleClick(index + 1),
          className: currentPage === index + 1 ? 'active' : ''
        },
        index + 1
      )
    )
  );
};

export default Pagination;
