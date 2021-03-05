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

const OpCosts: React.FC = () => {
  const { data } = useFetch<Data[]>(
    'op-costs?filial=0101&ano=2019,%202020,%202021&grupo=0010,%200080,%200094,%200500,%200501,%200502,%200503,%200510,%200520,%200540,%200550,%200560,%200570',
  );

  if (!data) {
    return (
      <Container>
        <h1>Carregando...</h1>
      </Container>
    );
  }
  // console.log(data);
  const arr = [
    'BH05P01',
    'BH05P02',
    'BH05P03',
    'BH05P04',
    'BH05P05',
    'BH05P06',
    'BH05P07',
    'BH05P08',
  ];
  const newData = data.filter(
    (dataItem: Data) => !arr.includes(dataItem.PRODUTO),
  );

  return (
    <Container>
      <Header title="Custo de Fabricação" />

      <PivotTable
        data={newData}
        rows={['PRODUTO']}
        cols={['ANO', 'MES']}
        aggregatorName="Average"
        vals={['CUSTO']}
      />
    </Container>
  );
};

export default OpCosts;
