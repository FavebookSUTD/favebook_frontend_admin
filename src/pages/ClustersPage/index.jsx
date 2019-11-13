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
import {} from './actions';

// import selector
import {} from './selectors';

// import local components

// import local styling
import './index.scss';

// import Antd
import { Layout, Typography } from 'antd';

// Extract antd components
const { Content } = Layout;
const { Title } = Typography;

class ClustersPage extends PureComponent {
  componentDidMount() {}

  render() {
    return (
      <Content className="logs-page__container">
        <Title className="logs-page-title">Clusters</Title>
      </Content>
    );
  }
}

ClustersPage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {};

const withReducer = injectReducer({ key: 'ClustersPage', reducer });
const withSaga = injectSaga({ key: 'ClustersPage', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ClustersPage);
