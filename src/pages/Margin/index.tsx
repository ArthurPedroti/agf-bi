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

const Margin: React.FC = () => {
  const { data } = useFetch<Data[]>(
    'fat?filial=0101&ano=2020,%202021&devolution=no',
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
          <h1>Margem dos Produtos</h1>
        </HeaderMeta>
      </Header>
      <PivotTable
        data={data}
        rows={['PRODUTO']}
        cols={['ANO', 'MES']}
        aggregatorName="Average"
        vals={['MARGEM']}
      />
    </Container>
  );
};

export default Margin;
