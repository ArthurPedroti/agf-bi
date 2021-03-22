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
