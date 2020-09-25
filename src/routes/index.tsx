import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';

import Dashboard from '../pages/Dashboard';
import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();
  console.log(loading);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      {/* <Route path="/" exact component={SignIn} /> */}
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />

      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
};

export default Routes;
