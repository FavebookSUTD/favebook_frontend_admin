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
import { fetchLogs, fetchSearchLogs, resetSearchLogs } from './actions';

// import selector
import {
  selectLogs,
  selectTotalLogsCount,
  selectSearchQuery,
  selectSearchLogs,
  selectTotalSearchLogsCount,
  selectCurrentPageNum,
  selectPageSize,
  selectLoading,
  selectError,
} from './selectors';

// import local components
import FilterController from '@components/FilterController';
import TableDisplay from '@components/TableDisplay';

// import lodash
import isEmpty from 'lodash/isEmpty';

// import local styling
import './index.scss';

// import Antd
import { Layout, Typography, Result } from 'antd';

// Extract antd components
const { Content } = Layout;
const { Title } = Typography;

class LogsPage extends PureComponent {
  columns = [
    { title: 'Session ID', dataIndex: 'session_id' },
    { title: 'User ID', dataIndex: 'user_id' },
    { title: 'Timestamp', dataIndex: 'time' },
    { title: 'Request Type', dataIndex: 'request_type' },
    { title: 'Endpoint', dataIndex: 'end_point' },
    { title: 'Status Code', dataIndex: 'status' },
  ];

  filterOptions = [
    { key: 'session_id', displayValue: 'Session ID', default: true },
    { key: 'user_id', displayValue: 'User ID', default: false },
    { key: 'end_point', displayValue: 'Endpoint', default: false },
    { key: 'request_type', displayValue: 'Request Type', default: false },
    { key: 'status', displayValue: 'Status Code', default: false },
  ];

  componentDidMount() {
    const { pageSize, resetSearchLogs } = this.props;
    this.fetchLogsHandler(1, pageSize);
    resetSearchLogs();
  }

  fetchLogsHandler = (pageNum, pageSize) => {
    // Used for pagination
    const { searchQuery, loading, fetchLogs, fetchSearchLogs } = this.props;
    if (!loading) {
      if (!isEmpty(searchQuery)) {
        fetchSearchLogs(searchQuery.searchValue, searchQuery.searchKey, pageNum, pageSize);
      } else {
        fetchLogs(pageNum, pageSize);
      }
    }
  };

  searchLogsHandler = (searchValue, searchKey) => {
    const { pageSize, fetchSearchLogs } = this.props;
    fetchSearchLogs(searchValue, searchKey, 1, pageSize);
  };

  resetSearchHandler = () => {
    const { resetSearchLogs } = this.props;
    resetSearchLogs();
  };

  render() {
    const {
      logs,
      totalLogsCount,
      searchQuery,
      searchLogs,
      totalSearchLogsCount,
      currentPageNum,
      pageSize,
      loading,
      error,
    } = this.props;

    return (
      <Content className="logs-page__container">
        <Title className="logs-page-title">Logs</Title>
        {error ? (
          <Result status="500" title="Something went wrong in the server." />
        ) : (
          <>
            <FilterController
              searchHandler={this.searchLogsHandler}
              resetHandler={this.resetSearchHandler}
              options={this.filterOptions}
            />
            <TableDisplay
              loading={loading}
              rowKey="_id"
              data={!isEmpty(searchQuery) ? searchLogs : logs}
              titles={this.columns}
              total={!isEmpty(searchQuery) ? totalSearchLogsCount : totalLogsCount}
              pageNum={currentPageNum}
              pageSize={pageSize}
              fetchPageHandler={this.fetchLogsHandler}
              infiniteScroll
              ellipsis={false}
            />
          </>
        )}
      </Content>
    );
  }
}

LogsPage.propTypes = {
  logs: PropTypes.shape({}).isRequired,
  totalLogsCount: PropTypes.number.isRequired,
  searchQuery: PropTypes.shape({
    searchValue: PropTypes.string,
    searchKey: PropTypes.string,
  }).isRequired,
  searchLogs: PropTypes.shape({}).isRequired,
  totalSearchLogsCount: PropTypes.number.isRequired,
  currentPageNum: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,

  fetchLogs: PropTypes.func.isRequired,
  fetchSearchLogs: PropTypes.func.isRequired,
  resetSearchLogs: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  logs: selectLogs,
  totalLogsCount: selectTotalLogsCount,
  searchQuery: selectSearchQuery,
  searchLogs: selectSearchLogs,
  totalSearchLogsCount: selectTotalSearchLogsCount,
  currentPageNum: selectCurrentPageNum,
  pageSize: selectPageSize,
  loading: selectLoading,
  error: selectError,
});

const mapDispatchToProps = {
  fetchLogs,
  fetchSearchLogs,
  resetSearchLogs,
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
