import React, { useEffect, useState } from 'react';

import PivotGrid, { FieldChooser } from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { Container } from 'react-bootstrap';
import { Container as Cont } from './styles';
import { useFetch } from '../../hooks/useFetch';
import Header from '../../components/Header';

export interface Data {
  PEDIDO: string;
  PRODUTO: string;
  DESCRICAO: string;
  SALDO: number;
  OBS: string;
  QTD: number;
}

const Breakers: React.FC = () => {
  const { data } = useFetch<Data[]>(
    `pcs?filial=0101&grupo=0010&legenda=PENDENTE','ATENDIDO%20PARCIALMENTE`,
  );
  const { data: data2 } = useFetch<Data[]>(
    'estoques?filial=0101&grupo=0010&armazem=01,06',
  );
  const [dataSource, setDataSource] = useState<PivotGridDataSource>();
  const dataFiltered2 = data2
    .reduce((acc: any, item: any) => {
      if (acc.some((e: any) => e.PRODUTO === item.PRODUTO)) {
        const itemIndex = acc.findIndex((e: any) => e.PRODUTO === item.PRODUTO);
        const itemFinded = acc.find((e: any) => e.PRODUTO === item.PRODUTO);
        const newItem = {
          ...itemFinded,
          SALDO: itemFinded.SALDO + item.SALDO,
        };
        const newAcc = acc.map((item2: any, index: any) => {
          return index === itemIndex ? newItem : item2;
        });

        return newAcc;
      }
      acc.push(item);
      return acc;
    }, [])
    .map((item: any) => {
      return {
        PEDIDO: '*SALDO*',
        ITEM: '',
        APROVADO: '',
        EMISSAO: '',
        PRODUTO: item.PRODUTO,
        DESCRICAO: '',
        UM: '',
        QTD: 0,
        QTD_ENT: 0,
        SALDO: item.SALDO,
        PRECO: 0,
        NUMSC: '',
        OBS: '',
        FORN: '',
        ESTOQUE: 0,
        LEGENDA: '',
        ENTREGA: '',
        DESC_FORN: '',
        CNPJ: '',
      };
    });

  const dataSource2 = new PivotGridDataSource({
    fields: [
      {
        caption: 'PRODUTO',
        width: 120,
        dataField: 'PRODUTO',
        showTotals: false,
        area: 'row',
      },
      {
        caption: 'DESCRIÇÃO',
        width: 120,
        dataField: 'DESCRICAO',
        area: 'row',
        headerFilter: {
          allowSearch: true,
        },
      },
      {
        dataField: 'ESTOQUE',
        area: 'row',
      },
      {
        dataField: 'PEDIDO',
        area: 'column',
      },
      {
        dataField: 'OBS',
        area: 'column',
      },
      {
        caption: 'SALDO',
        dataField: 'SALDO',
        dataType: 'number',
        format(item: any) {
          return `${item}`;
        },
        summaryType: 'sum',
        area: 'data',
      },
    ],
    store: [...dataFiltered2, ...data],
  });

  useEffect(() => {
    setDataSource(dataSource2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data && !data2) {
    return (
      <Container>
        <h1>Carregando...</h1>
      </Container>
    );
  }

  return (
    <Cont>
      <Header title="Ordens Rompedores" />

      <div id="pivot">
        <PivotGrid
          id="sales"
          dataSource={dataSource}
          allowSortingBySummary
          allowSorting
          allowFiltering
          allowExpandAll
          showBorders
        >
          <FieldChooser enabled />
        </PivotGrid>
      </div>
    </Cont>
  );
};

export default Breakers;
