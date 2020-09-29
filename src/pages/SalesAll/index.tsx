import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, TableWrap, TableCell, Header, HeaderMeta } from './styles';
import { useFetch } from '../../hooks/useFetch';
import PivotTable from '../../components/PivotTable/index.js';

export interface Data {
  PRODUTO: string;
  ANO: string;
  MES: string;
  QTD: number;
}

const SalesAll: React.FC = () => {
  const { data: rompedores } = useFetch<Data[]>(
    'fat?filial=0101&grupo=0010&ano=2019,%202020',
  );
  const { data: geradores } = useFetch<Data[]>(
    'fat?filial=0101&grupo=0500&ano=2019,%202020',
  );
  const { data: mfs } = useFetch<Data[]>(
    'fat?filial=0101&grupo=0510&ano=2019,%202020',
  );
  const { data: outros } = useFetch<Data[]>(
    'fat?filial=0101&grupo=0050,%200060,%200070,%200090,%200094,%200501,%200502,%200503,%200520,%200530,%200540,%200550,%200560,%200570&ano=2019,%202020',
  );

  if (!rompedores || !geradores || !mfs || !outros) {
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
          <h1>Vendas</h1>
        </HeaderMeta>
      </Header>
      <TableWrap>
        <TableCell>
          <h1>Rompedores</h1>
          <PivotTable
            data={rompedores}
            rows={['PRODUTO']}
            cols={['ANO', 'MES']}
            aggregatorName="Sum"
            vals={['QTD']}
          />
        </TableCell>
        <TableCell>
          <h1>Outros</h1>
          <PivotTable
            data={outros}
            rows={['PRODUTO']}
            cols={['ANO', 'MES']}
            aggregatorName="Sum"
            vals={['QTD']}
          />
        </TableCell>
        <TableCell>
          <h1>Máquinas à fio</h1>
          <PivotTable
            data={mfs}
            rows={['PRODUTO']}
            cols={['ANO', 'MES']}
            aggregatorName="Sum"
            vals={['QTD']}
          />
        </TableCell>
        <TableCell>
          <h1>Geradores</h1>
          <PivotTable
            data={geradores}
            rows={['PRODUTO']}
            cols={['ANO', 'MES']}
            aggregatorName="Sum"
            vals={['QTD']}
          />
        </TableCell>
      </TableWrap>
    </Container>
  );
};

export default SalesAll;
