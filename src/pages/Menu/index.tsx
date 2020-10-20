import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Menu } from './styles';
import { useFetch } from '../../hooks/useFetch';
import Button from '../../components/Button';

export interface Data {
  PRODUTO: string;
  ANO: string;
  MES: string;
  QTD: number;
}

const Dashboard: React.FC = () => {
  const { data } = useFetch<Data[]>(
    'fat?filial=0101&grupo=0510&ano=2019,%202020',
  );

  if (!data) {
    return (
      <Container>
        <h1>Carregando...</h1>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Menu</h1>
      <Menu>
        <Link to="/sales-romp">
          <Button style={{ fontSize: 20 }}>Vendas - Rompedores</Button>
        </Link>
        <Link to="/sales-mfs">
          <Button style={{ fontSize: 20 }}>Vendas - Máquinas à Fio</Button>
        </Link>
        <Link to="/sales-ger">
          <Button style={{ fontSize: 20 }}>Vendas - Geradores</Button>
        </Link>
        <Link to="/sales-outros">
          <Button style={{ fontSize: 20 }}>
            Vendas - Demais Máquinas e Equipamentos
          </Button>
        </Link>
        <Link to="/op-costs">
          <Button style={{ fontSize: 20 }}>Custo de Fabricação</Button>
        </Link>
        <Link to="/sales-all">
          <Button style={{ fontSize: 20 }}>Vendas - Todas</Button>
        </Link>
      </Menu>
    </Container>
  );
};

export default Dashboard;
