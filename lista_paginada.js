import React, { Component } from 'react';

class PaginatedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 5, // Número de itens por página
    };
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { items, currentPage, itemsPerPage } = this.state;

    // Lógica para exibir os itens correspondentes à página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    // Renderizar os itens da página atual
    const renderItems = currentItems.map((item, index) => {
      return <li key={index}>{item}</li>;
    });

    // Número de páginas
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    // Renderizar números de página
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </li>
      );
    });

    return (
      <div>
        <ul>
          {renderItems}
        </ul>
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
      </div>
    );
  }
}

export default PaginatedList;
