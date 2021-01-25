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
    'fat?filial=0101&grupo=0020,%200030,%200040,%200080,%200091,%200092,%200093,%200095,%200097,%200110,%200120,%200130,%200200,%200201,%200202,%200203,%200204,%200300,%200301,%200350,%200360,%200370,%200375,%200380,%200390,%200400,%200401,%200490,%200590,%200591,%200592,%200593,%200594,%200595,%200596,%200800,%200801,%200802,%200803,%200804,%200805,%200806,%200807,%200808,%200809,%200810,%200811,%200812,%200813,%200814,%200815,%200816,%200817,%200818,%200820,%200880,%200899,%200900,%200901,%200902,%200903,%200904,%200905,%200906,%200907,%200908,%200909,%200910,%200911,%200912,%200913,%200914,%200915,%200916,%200917,%200918,%200999,%203000,%203030,%203031,%203032,%203033,%203034,%203035,%203040,%203041,%203042,%203050,%203060,%203099,%203100,%203200,%203210,%203220,%203230,%203240,%203250,%203300,%203301,%203400,%203500,%203501,%203510,%203600,%205000,%205100,%209000,%209050,%209100,%209150,%209200,%209210,%209250,%209999&ano=2020,%202021&devolution=no',
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
