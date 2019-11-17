// import React
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import page component
import AppLayout from '@pages/AppLayout';
import AuthenticatePage from '@pages/AuthenticatePage';

const Routers = () => {
  return (
    <Switch>
      <Route exact path="/authenticate" component={AuthenticatePage} />
      <Route path="/" component={AppLayout} />
    </Switch>
  );
};

export default Routers;
