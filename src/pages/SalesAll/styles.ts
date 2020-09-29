import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-bottom: 16px;
`;

export const TableWrap = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  justify-items: center;
`;

export const TableCell = styled.div`
  padding: 16px;
  text-align: center;

  h1 {
    margin-bottom: 12px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
  margin-bottom: 32px;
  background: ${props => props.theme.colors.background};

  h1 {
    font-size: 24px;
    margin-left: 16px;
  }
`;

export const HeaderMeta = styled.div`
  max-width: 980px;
  padding: 16px;
  display: flex;
  flex: 1;
  align-items: center;

  a {
    color: ${props => props.theme.colors.text};
    display: flex;
    align-items: center;
  }
`;
