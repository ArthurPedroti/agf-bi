import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Menu } from './styles';
import Button from '../../components/Button';

export interface Data {
  PRODUTO: string;
  ANO: string;
  MES: string;
  QTD: number;
}

const Dashboard: React.FC = () => {
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
        <Link to="/margin">
          <Button style={{ fontSize: 20 }}>Margem dos produtos</Button>
        </Link>
      </Menu>
    </Container>
  );
};

export default Dashboard;
