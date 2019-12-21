// import React
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router-dom';
import { RouterGuard } from 'react-router-guard';
import { connect } from 'react-redux';
import { compose } from 'redux';

// import actions
import { loadPrevPath, clearPrevPath } from '../../actions';

// import page component
import AddBookPage from '@pages/AddBookPage';
import LogsPage from '@pages/LogsPage';
import ClusterPage from '@pages/ClustersPage';
import TFIDFPage from '@pages/TFIDFPage';
import PearsonPage from '@pages/PearsonPage';

const Routers = ({ history, loadPrevPath, clearPrevPath }) => {
  const savePrevPath = () => {
    const {
      location: { pathname },
    } = history;
    loadPrevPath(pathname);
    return Promise.resolve();
  };

  const shouldRoute = () => {
    const { sessionStorage } = window;
    const user = sessionStorage.getItem('user');
    if (user) {
      const { username, access_token } = JSON.parse(sessionStorage.getItem('user'));
      return new Promise(resolve => {
        if (username && access_token) {
          clearPrevPath();
          return resolve();
        }
        return resolve(history.replace('/authenticate'));
      });
    }

    return Promise.resolve(history.replace('/authenticate'));
  };
  return (
    <Switch>
      <RouterGuard
        config={[
          {
            path: '/',
            exact: true,
            component: LogsPage,
            canActivate: [savePrevPath, shouldRoute],
          },
          {
            path: '/add-book',
            exact: true,
            component: AddBookPage,
            canActivate: [savePrevPath, shouldRoute],
          },
          {
            path: '/logs',
            exact: true,
            component: LogsPage,
            canActivate: [savePrevPath, shouldRoute],
          },
          {
            path: '/clusters',
            exact: true,
            component: ClusterPage,
            canActivate: [savePrevPath, shouldRoute],
          },
          {
            path: '/analytics/tfidf',
            exact: true,
            component: TFIDFPage,
            canActivate: [savePrevPath, shouldRoute],
          },
          {
            path: '/analytics/pearson',
            exact: true,
            component: PearsonPage,
            canActivate: [savePrevPath, shouldRoute],
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

Routers.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    replace: PropTypes.func.isRequired,
  }).isRequired,
  loadPrevPath: PropTypes.func.isRequired,
  clearPrevPath: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  loadPrevPath,
  clearPrevPath,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(Routers);
