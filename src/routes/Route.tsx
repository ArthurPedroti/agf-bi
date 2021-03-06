import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouterProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouterProps extends ReactDOMRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

/**
 * Private Routes Boolean Logic:
 * isPrivate/IsSigned
 * true/true = OK
 * true/false = redirect to login
 * false/true = redirect to dashboard
 * false/true = OK
 */

const Route: React.FC<RouterProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { logged } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        switch (isPrivate) {
          case !!logged:
            return <Component />;
          case false:
            return <Component />;
          default:
            return (
              <Redirect
                to={{
                  pathname: isPrivate ? '/' : `/menu`,
                  state: { from: location },
                }}
              />
            );
        }
      }}
    />
  );
};

export default Route;
