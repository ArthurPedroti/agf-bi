import React from 'react';

import { Container, TableWrap, Header } from './styles';
import { useFetch } from '../../hooks/useFetch';
import PivotTable from '../../components/PivotTable/index.js';

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
      <Header>Vendas Máquinas de Fio</Header>
      <TableWrap>
        <PivotTable
          data={data}
          rows={['PRODUTO']}
          cols={['ANO', 'MES']}
          aggregatorName="Sum"
          vals={['QTD']}
        />
      </TableWrap>
    </Container>
  );
};

export default Dashboard;
