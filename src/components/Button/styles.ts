import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;
  margin-top: 10px;
  color: ${props => props.theme.colors.text};
  font-size: 20px;
  font-weight: bold;
  transition: all 200ms ease-in 0s;
  background: ${props => props.theme.colors.backgroundLight};
  padding: 12px 15px;
  border-width: 2px;
  border-style: solid;
  border-color: ${props => props.theme.colors.primary};
  border-image: initial;
  border-radius: 5px;

  &:hover {
    transition: all 200ms ease-in 0s;
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.backgroundLight};
  }
`;
