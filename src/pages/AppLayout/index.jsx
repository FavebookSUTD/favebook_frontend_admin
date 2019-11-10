// import React
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// import reducer and saga
import reducer from './reducers';
import saga from './saga';
import injectReducer from '@utils/core/injectReducer';
import injectSaga from '@utils/core/injectSaga';

// import actions
import { toggleSiderOpenState } from './actions';

// import selector
import { selectSiderOpenState } from './selectors';

// import local components
import HeaderMenu from './components/HeaderMenu';
import SiderMenu from './components/SiderMenu';
import Routers from './components/Routers';

// import local styling
import './index.scss';

// import Antd
import { Layout } from 'antd';

class AppLayout extends PureComponent {
  render() {
    const { siderOpenState, toggleSiderOpenState } = this.props;
    return (
      <Layout className="app-layout__container">
        <HeaderMenu siderOpenState={siderOpenState} toggleSiderHandler={toggleSiderOpenState} />
        <SiderMenu siderOpenState={siderOpenState} toggleSiderHandler={toggleSiderOpenState} />
        <Routers />
      </Layout>
    );
  }
}

AppLayout.propTypes = {
  siderOpenState: PropTypes.bool.isRequired,
  toggleSiderOpenState: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  siderOpenState: selectSiderOpenState,
});

const mapDispatchToProps = {
  toggleSiderOpenState,
};

const withReducer = injectReducer({ key: 'AppLayout', reducer });
const withSaga = injectSaga({ key: 'AppLayout', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppLayout);
