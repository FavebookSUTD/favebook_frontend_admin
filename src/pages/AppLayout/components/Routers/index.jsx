// import React
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router-dom';
import { RouterGuard } from 'react-router-guard';
import { connect } from 'react-redux';
import { compose } from 'redux';

// import actions

// import page component
import LogsPage from '@pages/LogsPage';
import ClusterPage from '@pages/ClustersPage';

const Routers = ({ history }) => {
  return (
    <Switch>
      <RouterGuard
        config={[
          {
            path: '/',
            exact: true,
            component: LogsPage,
          },
          {
            path: '/logs',
            exact: true,
            component: LogsPage,
          },
          {
            path: '/clusters',
            exact: true,
            component: ClusterPage,
          },
          {
            path: '/*',
            redirect: '/',
          },
        ]}
        history={history}
      />
    </Switch>
  );
};

Routers.propTypes = {};

const mapDispatchToProps = {};

const withConnect = connect();

export default compose(
  withRouter,
  withConnect,
)(Routers);
