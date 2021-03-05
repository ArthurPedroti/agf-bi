import styled from 'styled-components';

export const Header = styled.div`
  div {
    display: flex;
    justify-content: center;

    img {
      width: 150px;
      margin-bottom: 4px;
    }

    h2 {
      font-size: 89px;
      margin-bottom: 0;
      background-image: linear-gradient(90deg, #fdd000, #e58a00);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const Menu = styled.div`
  padding: 16px;
  max-width: 540px;
`;
