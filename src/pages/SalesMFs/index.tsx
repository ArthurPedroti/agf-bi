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

const SalesMFs: React.FC = () => {
  const { data } = useFetch<Data[]>(
    'fat?filial=0101&grupo=0510&ano=2019,%202020,%202021',
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
      <Header>
        <HeaderMeta>
          <Link to="/menu">
            <FiArrowLeft size={20} />
          </Link>
          <h1>Vendas - Máquinas à fio</h1>
        </HeaderMeta>
      </Header>
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

export default SalesMFs;
