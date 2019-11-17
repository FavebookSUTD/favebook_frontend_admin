// import React
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// import reducer and saga
import reducer from './reducers';
import saga from './saga';
import injectReducer from '@utils/core/injectReducer';
import injectSaga from '@utils/core/injectSaga';

// import actions
import { toggleSiderOpenState, loginFromStorage } from './actions';

// import selector
import { selectSiderOpenState, selectUserInfo } from './selectors';

// import local components
import HeaderMenu from './components/HeaderMenu';
import SiderMenu from './components/SiderMenu';
import Routers from './components/Routers';

// import local styling
import './index.scss';

// import Antd
import { Layout } from 'antd';

class AppLayout extends PureComponent {
  componentDidMount() {
    const { loginFromStorage } = this.props;
    loginFromStorage();
  }

  render() {
    const {
      location: { pathname },
      siderOpenState,
      toggleSiderOpenState,
    } = this.props;

    return (
      <Layout className="app-layout__container">
        <HeaderMenu siderOpenState={siderOpenState} toggleSiderHandler={toggleSiderOpenState} />
        <Layout className="app-layout__content" hasSider>
          <SiderMenu
            path={pathname}
            siderOpenState={siderOpenState}
            toggleSiderHandler={toggleSiderOpenState}
          />
          <Routers />
        </Layout>
      </Layout>
    );
  }
}

AppLayout.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  siderOpenState: PropTypes.bool.isRequired,
  userInfo: PropTypes.shape({
    username: PropTypes.string,
    access_token: PropTypes.string,
  }).isRequired,

  toggleSiderOpenState: PropTypes.func.isRequired,
  loginFromStorage: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  siderOpenState: selectSiderOpenState,
  userInfo: selectUserInfo,
});

const mapDispatchToProps = {
  toggleSiderOpenState,
  loginFromStorage,
};

const withReducer = injectReducer({ key: 'AppLayout', reducer });
const withSaga = injectSaga({ key: 'AppLayout', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(AppLayout);
