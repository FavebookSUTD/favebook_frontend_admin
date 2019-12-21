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
import { fetchTFIDFJobStatus, fetchTFIDF, fetchSearchTFIDF, resetSearchTFIDF } from './actions';

// import selector
import {
  selectTFIDFJobStatus,
  selectTFIDF,
  selectTotalTFIDFCount,
  selectSearchQuery,
  selectSearchTFIDF,
  selectTotalSearchTFIDFCount,
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
import join from 'lodash/join';
import capitalize from 'lodash/capitalize';
import isEqual from 'lodash/isEqual';

// import local styling
import './index.scss';

// import Antd
import { Layout, Typography, Result, Button, Spin } from 'antd';

// Extract antd components
const { Content } = Layout;
const { Title } = Typography;

class TFIDFPage extends PureComponent {
  columns = [
    { title: 'Review ID', dataIndex: 'reviewId', width: 150 },
    { title: 'Review', dataIndex: 'reviewText' },
    { title: 'Features', dataIndex: 'featureLength', width: 150 },
    { title: 'Term Indices', dataIndex: 'featureIndices', render: text => join(text, ', ') },
    { title: 'Term Weights', dataIndex: 'featureWeights', render: text => join(text, ', ') },
    { title: 'Sentiment', dataIndex: 'sentiment', width: 150, render: capitalize },
  ];

  filterOptions = [
    { key: 'reviewId', displayValue: 'Review ID', default: true },
    { key: 'reviewText', displayValue: 'Review Text', default: false },
    { key: 'featureLength', displayValue: 'Feature Length', default: false },
  ];

  componentDidMount() {
    const { fetchTFIDFJobStatus, resetSearchTFIDF } = this.props;
    fetchTFIDFJobStatus();
    resetSearchTFIDF();
  }

  componentDidUpdate(prevProps) {
    const { TFIDFJobStatus } = prevProps;
    const { TFIDFJobStatus: currentStatus, pageSize } = this.props;
    if (isEqual(TFIDFJobStatus, 'running') && isEqual(currentStatus, 'success')) {
      this.fetchTFIDFHandler(1, pageSize);
    }
  }

  fetchTFIDFHandler = (pageNum, pageSize) => {
    // Used for pagination
    const { searchQuery, loading, fetchTFIDF, fetchSearchTFIDF } = this.props;
    if (!loading) {
      if (!isEmpty(searchQuery)) {
        fetchSearchTFIDF(searchQuery.searchValue, searchQuery.searchKey, pageNum, pageSize);
      } else {
        fetchTFIDF(pageNum, pageSize);
      }
    }
  };

  searchLogsHandler = (searchValue, searchKey) => {
    const { pageSize, fetchSearchTFIDF } = this.props;
    fetchSearchTFIDF(searchValue, searchKey, 1, pageSize);
  };

  resetSearchHandler = () => {
    const { resetSearchTFIDF } = this.props;
    resetSearchTFIDF();
  };

  render() {
    const {
      TFIDFJobStatus,
      TFIDF,
      totalTFIDFCount,
      searchQuery,
      searchTFIDF,
      totalSearchTFIDFCount,
      currentPageNum,
      pageSize,
      loading,
      error,
      fetchTFIDFJobStatus,
    } = this.props;

    const sparkRunning = isEqual(TFIDFJobStatus, 'running');

    return (
      <Content className="TFIDF-page__container">
        <Title className="TFIDF-page-title">TFIDF</Title>
        {error || isEqual(TFIDFJobStatus, 'fail') ? (
          <Result status="500" title="Something went wrong in the server." />
        ) : (
          <>
            <div className="TFIDF-page__controller-container">
              <FilterController
                searchHandler={this.searchLogsHandler}
                resetHandler={this.resetSearchHandler}
                options={this.filterOptions}
              />
              <Button
                className="reload-button"
                type="primary"
                shape="round"
                icon="reload"
                loading={loading}
                onClick={fetchTFIDFJobStatus}
              >
                Reload
              </Button>
            </div>
            <Spin
              wrapperClassName="TFIDF-page__table-spin-wrapper"
              tip={<span className="spark-pending-text">Checking Spark Job ...</span>}
              spinning={sparkRunning}
            >
              <TableDisplay
                className="TFIDF-page__table"
                loading={loading && !sparkRunning}
                rowKey="reviewId"
                data={!isEmpty(searchQuery) ? searchTFIDF : TFIDF}
                titles={this.columns}
                total={!isEmpty(searchQuery) ? totalSearchTFIDFCount : totalTFIDFCount}
                pageNum={currentPageNum}
                pageSize={pageSize}
                fetchPageHandler={this.fetchLogsHandler}
                infiniteScroll
                ellipsis={false}
              />
            </Spin>
          </>
        )}
      </Content>
    );
  }
}

TFIDFPage.propTypes = {
  TFIDFJobStatus: PropTypes.string.isRequired,
  TFIDF: PropTypes.shape({}).isRequired,
  totalTFIDFCount: PropTypes.number.isRequired,
  searchQuery: PropTypes.shape({
    searchValue: PropTypes.string,
    searchKey: PropTypes.string,
  }).isRequired,
  searchTFIDF: PropTypes.shape({}).isRequired,
  totalSearchTFIDFCount: PropTypes.number.isRequired,
  currentPageNum: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,

  fetchTFIDFJobStatus: PropTypes.func.isRequired,
  fetchTFIDF: PropTypes.func.isRequired,
  fetchSearchTFIDF: PropTypes.func.isRequired,
  resetSearchTFIDF: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  TFIDFJobStatus: selectTFIDFJobStatus,
  TFIDF: selectTFIDF,
  totalTFIDFCount: selectTotalTFIDFCount,
  searchQuery: selectSearchQuery,
  searchTFIDF: selectSearchTFIDF,
  totalSearchTFIDFCount: selectTotalSearchTFIDFCount,
  currentPageNum: selectCurrentPageNum,
  pageSize: selectPageSize,
  loading: selectLoading,
  error: selectError,
});

const mapDispatchToProps = {
  fetchTFIDFJobStatus,
  fetchTFIDF,
  fetchSearchTFIDF,
  resetSearchTFIDF,
};

const withReducer = injectReducer({ key: 'TFIDFPage', reducer });
const withSaga = injectSaga({ key: 'TFIDFPage', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TFIDFPage);
