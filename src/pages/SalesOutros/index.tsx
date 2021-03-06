import React from 'react';

import { Container } from './styles';
import { useFetch } from '../../hooks/useFetch';
import PivotTable from '../../components/PivotTable/index.js';
import Header from '../../components/Header';

export interface Data {
  PRODUTO: string;
  ANO: string;
  MES: string;
  QTD: number;
}

const SalesOutros: React.FC = () => {
  const { data } = useFetch<Data[]>(
    'fat?filial=0101&grupo=0050,%200060,%200070,%200090,%200094,%200501,%200502,%200503,%200520,%200530,%200540,%200550,%200560,%200570&ano=2019,%202020,%202021',
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
      <Header title="Vendas - Outros" />

      <PivotTable
        data={data}
        rows={['PRODUTO']}
        cols={['ANO', 'MES']}
        aggregatorName="Sum"
        vals={['QTD']}
      />
    </Container>
  );
};

export default SalesOutros;
