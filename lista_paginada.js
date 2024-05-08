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


ERROR in ./src/components/interacao/PaginatedList.js 26:11
Module parse failed: Unexpected token (26:11)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
|   // Renderização dos itens e números das páginas
|   const renderItems = currentItems.map((item, index) => {
>     return <li key={index}>{item}</li>;
|   });
| 
 @ ./src/pages/Home/home.tsx 3:0-64 12:38-51
 @ ./src/pages/Home/index.ts 1:0-33 1:0-33
 @ ./src/index.ts 1:0-39 1:0-39

webpack 5.91.0 compiled with 1 error in 31163 ms
