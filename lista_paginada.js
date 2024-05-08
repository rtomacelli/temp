import React from 'react';

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

    // Exemplo de dados
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
      { id: 10, name: 'Item 10' }
    ];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = exampleData.slice(indexOfFirstItem, indexOfLastItem);

    const renderItems = currentItems.map((item, index) => {
      return React.createElement('div', { key: index }, item.name);
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
      React.createElement('div', null, renderItems),
      React.createElement('div', { style: { marginTop: '10px' } }, renderPageNumbers)
    );
  }
}

export default ListaInteracoes;






import React from 'react';
import ListaInteracoes from './ListaInteracoes';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Exemplo de Utilização de ListaInteracoes Component</h1>
        <ListaInteracoes />
      </div>
    );
  }
}

export default App;




import React from 'react';
import Layout from "@components/Layout";
import ListaInteracoes from '@components/interacao/ListaInteracoes';
import {
  BbCard,
  BbCardHeader,
  BbCardBody,
  BbCardFooter,
  BbButton,
} from "dls-bb-web-components-react-wrapper";

const Home: React.FC = (): JSX.Element => {
  return (
    <Layout>
      <BbCard>
        <BbCardHeader>Exemplo de Utilização de ListaInteracoes Component</BbCardHeader>
        <BbCardBody>
          <ListaInteracoes />
        </BbCardBody>
      </BbCard>
    </Layout>
  );
};

export default Home;
