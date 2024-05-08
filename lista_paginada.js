Claro! Vou reescrever o componente `PaginatedList` sem usar a sintaxe JSX, usando em vez disso métodos do React como `createElement`. Aqui está o código:

```jsx
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
    return React.createElement('li', { key: index }, item);
  });

  const renderPageNumbers = pageNumbers.map((number) => {
    return React.createElement('li', {
      key: number,
      id: number,
      onClick: handleClick,
      className: currentPage === number ? 'active' : ''
    }, number);
  });

  return React.createElement('div', null,
    React.createElement('h2', null, 'Lista Paginada de 10 Itens'),
    React.createElement('ul', null, renderItems),
    React.createElement('ul', { id: 'page-numbers' }, renderPageNumbers)
  );
};

export default PaginatedList;
```

Neste código, substituímos todas as ocorrências de JSX por chamadas de função `React.createElement`. O funcionamento do componente é o mesmo, mas agora não depende mais da sintaxe JSX.


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
