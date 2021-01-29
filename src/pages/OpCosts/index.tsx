import React from 'react';

import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, Header, HeaderMeta } from './styles';
import { useFetch } from '../../hooks/useFetch';
import PivotTable from '../../components/PivotTable/index.js';

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
  console.log(newData);

  return (
    <Container>
      <Header>
        <HeaderMeta>
          <Link to="/menu">
            <FiArrowLeft size={20} />
          </Link>
          <h1>Custo de Fabricação</h1>
        </HeaderMeta>
      </Header>
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
