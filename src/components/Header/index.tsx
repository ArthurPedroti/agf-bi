import React from 'react';
import { Link } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import { Container, HeaderMeta } from './styles';

import logoImg from '../../assets/logo.svg';

interface HeaderProps {
  title: string;
  className?: string;
}
const Header: React.FC<HeaderProps> = ({ children, title, ...rest }) => (
  <Container {...rest}>
    <HeaderMeta>
      <Link to="/menu">
        <FiArrowLeft size={20} />
      </Link>
      <h1>{title}</h1>
      {children}
      <div>
        <img src={logoImg} alt="AGF" />
        <h2>Bi</h2>
      </div>
    </HeaderMeta>
  </Container>
);

export default Header;
