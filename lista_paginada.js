import React, { useState, createElement } from 'react';
import Pagination from './Pagination';

const PaginatedList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Por exemplo, exibir 5 itens por página

  // Dados de exemplo
  const exampleData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
    { id: 6, name: 'Item 6' },
    { id: 7, name: 'Item 7' },
    { id: 8, name: 'Item 8' },
    { id: 9, name: 'Item 9' },
    { id: 10, name: 'Item 10' },
    { id: 11, name: 'Item 11' },
    { id: 12, name: 'Item 12' },
    // Adicione mais registros conforme necessário
  ];

  // Função para obter os itens da página atual
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return exampleData.slice(startIndex, endIndex);
  };

  // Função para lidar com a mudança de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Renderizar os itens da página atual
  const renderItems = getCurrentItems().map((item) => {
    return createElement('li', { key: item.id }, item.name);
  });

  return createElement('div', null,
    createElement('h1', null, 'Lista de Itens'),
    createElement('ul', null, renderItems),
    createElement(Pagination, { totalItems: exampleData.length, itemsPerPage, onPageChange: handlePageChange })
  );
};

export default PaginatedList;







import React, { useState } from 'react';
import Pagination from './Pagination';

const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Por exemplo, exibir 5 itens por página

  // Função para lidar com a mudança de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Aqui você pode fazer algo com a nova página, como buscar novos dados do servidor
  };

  return (
    <div>
      {/* Seu conteúdo */}
      <Pagination totalItems={100} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default MyComponent;
