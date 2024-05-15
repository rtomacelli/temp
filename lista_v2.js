import React, { useState, useEffect} from 'react';

class ListaInteracoes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 3,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { currentPage, itemsPerPage } = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = exampleData.slice(indexOfFirstItem, indexOfLastItem);
    const tableStyle = { border: '1px solid black', width: '100%' };
    const borderStyle = { border: '1px solid black' };

    const config = require('./interacao.json');
    console.log(config);

    const renderItems = data.map((item, index) => {
      return React.createElement('tr', { key: index },
        React.createElement('td', { style: borderStyle }, item.entrada),
        React.createElement('td', { style: borderStyle }, item.saida),
        React.createElement('td', { style: borderStyle }, item.project_id),
        React.createElement('td', { style: borderStyle }, item.label_time),
        React.createElement('td', { style: borderStyle }, item.sigla),
        React.createElement('td', { style: borderStyle }, 
          React.createElement('a', { href: 'https://www.g1.com.br', target: '_blank' }, 'Edit'),
          React.createElement('a', { href: 'https://www.g1.com.br', target: '_blank' }, 'Delete')
        )
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(exampleData.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return React.createElement('span', {
        key: number,
        id: number,
        onClick: this.handleClick,
        style: { margin: '0 5px', cursor: 'pointer' }
      }, number);
    });

    return React.createElement('div', null,

    React.createElement('table', { style: tableStyle },
      React.createElement('thead', null,
        React.createElement('tr', null, 
          React.createElement('th', { style: borderStyle }, 'Entrada'),
          React.createElement('th', { style: borderStyle }, 'Saída'),
          React.createElement('th', { style: borderStyle }, 'Project ID'),
          React.createElement('th', { style: borderStyle }, 'Label Time'),
          React.createElement('th', { style: borderStyle }, 'Sigla'),
          React.createElement('th', { style: borderStyle }, 'Ações'),
        ),
      ),
      React.createElement('tbody', null, renderItems)
    ),	
    React.createElement('div', { style: { marginTop: '10px' } }, renderPageNumbers)
  );

  }
}

export default ListaInteracoes;
