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
import { fetchTFITF, fetchSearchTFITF, resetSearchTFITF } from './actions';

// import selector
import {
  selectTFITF,
  selectTotalTFITFCount,
  selectSearchQuery,
  selectSearchTFITF,
  selectTotalSearchTFITFCount,
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

// import local styling
import './index.scss';

// import Antd
import { Layout, Typography, Result } from 'antd';

// Extract antd components
const { Content } = Layout;
const { Title } = Typography;

class TFITFPage extends PureComponent {
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
    const { pageSize, resetSearchTFITF } = this.props;
    this.fetchTFITFHandler(1, pageSize);
    resetSearchTFITF();
  }

  fetchTFITFHandler = (pageNum, pageSize) => {
    // Used for pagination
    const { searchQuery, loading, fetchTFITF, fetchSearchTFITF } = this.props;
    if (!loading) {
      if (!isEmpty(searchQuery)) {
        fetchSearchTFITF(searchQuery.searchValue, searchQuery.searchKey, pageNum, pageSize);
      } else {
        fetchTFITF(pageNum, pageSize);
      }
    }
  };

  searchLogsHandler = (searchValue, searchKey) => {
    const { pageSize, fetchSearchTFITF } = this.props;
    fetchSearchTFITF(searchValue, searchKey, 1, pageSize);
  };

  resetSearchHandler = () => {
    const { resetSearchTFITF } = this.props;
    resetSearchTFITF();
  };

  render() {
    const {
      TFITF,
      totalTFITFCount,
      searchQuery,
      searchTFITF,
      totalSearchTFITFCount,
      currentPageNum,
      pageSize,
      loading,
      error,
    } = this.props;

    return (
      <Content className="TFITF-page__container">
        <Title className="TFITF-page-title">TFITF</Title>
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
              rowKey="reviewId"
              data={!isEmpty(searchQuery) ? searchTFITF : TFITF}
              titles={this.columns}
              total={!isEmpty(searchQuery) ? totalSearchTFITFCount : totalTFITFCount}
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

TFITFPage.propTypes = {
  TFITF: PropTypes.shape({}).isRequired,
  totalTFITFCount: PropTypes.number.isRequired,
  searchQuery: PropTypes.shape({
    searchValue: PropTypes.string,
    searchKey: PropTypes.string,
  }).isRequired,
  searchTFITF: PropTypes.shape({}).isRequired,
  totalSearchTFITFCount: PropTypes.number.isRequired,
  currentPageNum: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,

  fetchTFITF: PropTypes.func.isRequired,
  fetchSearchTFITF: PropTypes.func.isRequired,
  resetSearchTFITF: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  TFITF: selectTFITF,
  totalTFITFCount: selectTotalTFITFCount,
  searchQuery: selectSearchQuery,
  searchTFITF: selectSearchTFITF,
  totalSearchTFITFCount: selectTotalSearchTFITFCount,
  currentPageNum: selectCurrentPageNum,
  pageSize: selectPageSize,
  loading: selectLoading,
  error: selectError,
});

const mapDispatchToProps = {
  fetchTFITF,
  fetchSearchTFITF,
  resetSearchTFITF,
};

const withReducer = injectReducer({ key: 'TFITFPage', reducer });
const withSaga = injectSaga({ key: 'TFITFPage', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TFITFPage);
