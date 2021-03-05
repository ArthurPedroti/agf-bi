import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
  margin-bottom: 32px;
  background: ${props => props.theme.colors.background};

  h1 {
    font-size: 24px;
    margin-bottom: 0;
    margin-left: 16px;
    margin-right: auto;
  }

  div {
    display: flex;
    justify-content: center;

    img {
      width: 52px;
    }

    h2 {
      margin-bottom: 0;
      background-image: linear-gradient(90deg, #fdd000, #e58a00);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;

export const HeaderMeta = styled.div`
  max-width: 980px;
  margin: auto;
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
