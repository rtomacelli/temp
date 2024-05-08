import React, { useState } from 'react';

const PaginatedList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de itens por página
  const items = Array.from({ length: 10 }, (_, i) => i + 1); // Lista de 10 itens

  // Índices dos itens na página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Função para alterar a página
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  // Números das páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Renderização dos itens e números das páginas
  const renderItems = currentItems.map((item, index) => {
    return <li key={index}>{item}</li>;
  });

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={currentPage === number ? 'active' : ''}
      >
        {number}
      </li>
    );
  });

  return (
    <div>
      <h2>Lista Paginada de 10 Itens</h2>
      <ul>
        {renderItems}
      </ul>
      <ul id="page-numbers">
        {renderPageNumbers}
      </ul>
    </div>
  );
};

export default PaginatedList;


import React from 'react';
import PaginatedList from './PaginatedList'; // Importando o componente

const App = () => {
  return (
    <div>
      <h1>Minha Página</h1>
      <PaginatedList /> {/* Usando o componente */}
    </div>
  );
};

export default App;
