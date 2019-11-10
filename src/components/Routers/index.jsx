// import React
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import page component
import AppLayout from '@pages/AppLayout';

const Routers = () => {
  return (
    <Switch>
      <Route path="/" render={() => <AppLayout />} />
    </Switch>
  );
};

export default Routers;
