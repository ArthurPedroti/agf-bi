import React from 'react';
import { Switch } from 'react-router-dom';

import styled from 'styled-components';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';
import { useAuth } from '../hooks/auth';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Loader = styled.div`
  border: 4px solid ${props => props.theme.colors.text}; /* Light grey */
  border-top: 4px solid ${props => props.theme.colors.primary}; /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Routes: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <Container>
        <h1 style={{ marginBottom: 16 }}>Carregando...</h1>
        <Loader />
      </Container>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
