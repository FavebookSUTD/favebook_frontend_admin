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
import { fetchInitLogs, fetchNextLogs } from './actions';

// import selector
import {
  selectLogs,
  selectTotalLogsCount,
  selectCurrentLogsPageNum,
  selectLoading,
  selectError,
} from './selectors';

// import local components
import LogsFilter from './components/LogsFilter';
import TableDisplay from '@components/TableDisplay';

// import local styling
import './index.scss';

// import Antd
import { Layout, Typography, Result } from 'antd';

// Extract antd components
const { Content } = Layout;
const { Title } = Typography;

class LogsPage extends PureComponent {
  PAGE_SIZE = 100;

  columns = [
    { title: 'Session ID', dataIndex: 'session_id' },
    { title: 'User ID', dataIndex: 'user_id' },
    { title: 'Timestamp', dataIndex: 'time' },
    { title: 'Request Type', dataIndex: 'request_type' },
    { title: 'Endpoint', dataIndex: 'end_point' },
    { title: 'Status Code', dataIndex: 'status' },
  ];

  componentDidMount() {
    const { fetchInitLogs } = this.props;
    fetchInitLogs(1, this.PAGE_SIZE);
  }

  fetchNextHandler = () => {
    const { currentLogsPageNum, loading, fetchNextLogs } = this.props;

    if (!loading) {
      fetchNextLogs(currentLogsPageNum + 1, this.PAGE_SIZE);
    }
  };

  render() {
    const { logs, totalLogsCount, loading, error } = this.props;

    return (
      <Content className="logs-page__container">
        <Title className="logs-page-title">Logs</Title>
        {error ? (
          <Result status="500" title="Something went wrong in the server." />
        ) : (
          <>
            <LogsFilter />
            <TableDisplay
              loading={loading}
              data={logs}
              titles={this.columns}
              total={totalLogsCount}
              pageSize={Math.round(this.PAGE_SIZE / 2)}
              fetchNextHandler={this.fetchNextHandler}
              infiniteScroll
            />
          </>
        )}
      </Content>
    );
  }
}

LogsPage.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  totalLogsCount: PropTypes.number.isRequired,
  currentLogsPageNum: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,

  fetchInitLogs: PropTypes.func.isRequired,
  fetchNextLogs: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  logs: selectLogs,
  totalLogsCount: selectTotalLogsCount,
  currentLogsPageNum: selectCurrentLogsPageNum,
  loading: selectLoading,
  error: selectError,
});

const mapDispatchToProps = {
  fetchInitLogs,
  fetchNextLogs,
};

const withReducer = injectReducer({ key: 'LogsPage', reducer });
const withSaga = injectSaga({ key: 'LogsPage', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LogsPage);
