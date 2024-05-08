import React from "react";

import Layout from "@components/Layout";

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
        <BbCardHeader>Marvin suporte React Blank</BbCardHeader>
        <BbCardBody>
          Esse é um projeto blank que ajuda você a dar o ponta pé inicial em uma aplicação dentro do
          APW, para mais informações acesse a documentação oficial do APW clicando{" "}
          <a target="_blank" rel="noreferrer" href="https://apw.apps.bb.com.br/">
            aqui
          </a>
          <div className="wrapper">
 
          </div>
        </BbCardBody>
        <BbCardFooter>
          <BbButton>Confirmar</BbButton>
          <BbButton kind="secondary">Cancelar</BbButton>
        </BbCardFooter>
      </BbCard>
    </Layout>
  );
};

export default Home;
