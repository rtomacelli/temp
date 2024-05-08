import React, { useState } from 'react';

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index + 1)}
          className={currentPage === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;



import React, { useState } from 'react';
import Pagination from './Pagination';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Aqui você pode fazer algo com a página selecionada, como buscar dados.
  };

  return (
    <div className="app">
      <h1>Lista de Itens</h1>
      {/* Seus itens a serem paginados */}
      <Pagination totalItems={100} itemsPerPage={10} onPageChange={handlePageChange} />
    </div>
  );
};

export default App;
