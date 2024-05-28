const React = require('react');

class ListaInteracoes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
      itemsPerPage: 3
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('https://sua-api.com/endpoint') // Substitua pela URL da sua API
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .catch(error => console.error('Erro ao buscar dados da API:', error));
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { data, currentPage, itemsPerPage } = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const tableStyle = { border: '1px solid black', width: '100%' };
    const borderStyle = { border: '1px solid black' };

    const renderItems = currentItems.map((item, index) => {
      return React.createElement('tr', { key: index },
        React.createElement('td', { style: borderStyle }, item.entrada),
        React.createElement('td', { style: borderStyle }, item.saida),
        React.createElement('td', { style: borderStyle }, item.project_id),
        React.createElement('td', { style: borderStyle }, item.label_time),
        React.createElement('td', { style: borderStyle }, item.sigla),
        React.createElement('td', { style: borderStyle },
          React.createElement('a', { href: 'https://www.g1.com.br', target: '_blank' }, 'Edit '),
          React.createElement('a', { href: 'https://www.g1.com.br', target: '_blank' }, 'Delete')
        )
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
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
            React.createElement('th', { style: borderStyle }, 'Ações')
          ),
        ),
        React.createElement('tbody', null, renderItems)
      ),
      React.createElement('div', { style: { marginTop: '10px' } }, renderPageNumbers)
    );
  }
}

module.exports = ListaInteracoes;
