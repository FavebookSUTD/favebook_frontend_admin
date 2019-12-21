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
import { fetchClusterStats, startSparkJob } from './actions';

// import selector
import { selectLoading, selectError, selectClusters, selectTotalClusterNum } from './selectors';

// import local components
import ClusterController from './components/ClusterController';
import TableDisplay from '@components/TableDisplay';

// import local styling
import './index.scss';

// import Antd
import { Layout, Typography } from 'antd';

// Extract antd components
const { Content } = Layout;
const { Title } = Typography;

class ClustersPage extends PureComponent {
  componentDidMount() {
    const { fetchClusterStats } = this.props;
    fetchClusterStats();
  }

  startSparkJobHandler = clusterNum => {
    const { startSparkJob } = this.props;
    startSparkJob(clusterNum, 'tfidf');
    startSparkJob(clusterNum, 'pearson');
  };

  render() {
    const { loading, clusters, totalClusterNum, fetchClusterStats } = this.props;
    const tableTitles = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
      {
        title: 'Status',
        dataIndex: 'status',
      },
      {
        title: 'Cores',
        dataIndex: 'cores',
      },
      {
        title: 'Memory',
        dataIndex: 'memoryMB',
      },
    ];

    return (
      <Content className="clusters-page__container">
        <Title className="clusters-page-title">Clusters</Title>
        <ClusterController
          loading={loading}
          clusterCount={totalClusterNum}
          updateHandler={this.startSparkJobHandler}
          refreshHandler={fetchClusterStats}
        />
        <TableDisplay
          rowKey=""
          loading={loading}
          data={clusters}
          titles={tableTitles}
          total={totalClusterNum}
          infiniteScroll
          pagination={false}
        />
      </Content>
    );
  }
}

ClustersPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  clusters: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalClusterNum: PropTypes.number.isRequired,

  fetchClusterStats: PropTypes.func.isRequired,
  startSparkJob: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  error: selectError,
  clusters: selectClusters,
  totalClusterNum: selectTotalClusterNum,
});

const mapDispatchToProps = {
  fetchClusterStats,
  startSparkJob,
};

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
