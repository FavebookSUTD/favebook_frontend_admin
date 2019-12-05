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
import { fetchBookHistory, searchBook, resetSearch, addBook } from './actions';

// import selector
import {
  selectBooks,
  selectTotalCount,
  selectPageNum,
  selectPageSize,
  selectSearchResult,
  selectVisible,
  selectLoading,
  selectError,
} from './selectors';

// import local components
import TableDisplay from '@components/TableDisplay';

// import lodash

// import local styling
import './index.scss';

// import Antd
import { Layout, Typography, Result } from 'antd';

// Extract antd components
const { Content } = Layout;
const { Title } = Typography;

class AddBookPage extends PureComponent {
  columns = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Author', dataIndex: 'author' },
    { title: 'Category', dataIndex: 'genres' },
    { title: 'Date Added', dataIndex: 'time_added' },
    { title: 'Added By', dataIndex: 'added_by' },
  ];

  componentDidMount() {
    const { pageSize, resetSearch } = this.props;
    this.fetchBookHandler(1, pageSize);
    resetSearch();
  }

  fetchBookHandler = (pageNum, pageSize) => {
    const {
      loading: { books: booksLoading },
      fetchBookHistory,
    } = this.props;

    if (!booksLoading) {
      fetchBookHistory(pageNum, pageSize);
    }
  };

  render() {
    const {
      books,
      totalCount,
      pageNum,
      pageSize,
      loading: { books: booksLoading },
      error: { books: booksError },
    } = this.props;

    return (
      <Content className="add-book-page__container">
        <Title className="add-book-page-title">Add Books</Title>
        {booksError ? (
          <Result status="500" title="Something went wrong in the server." />
        ) : (
          <>
            <TableDisplay
              loading={booksLoading}
              rowKey="_id"
              data={books}
              titles={this.columns}
              total={totalCount}
              pageNum={pageNum}
              pageSize={pageSize}
              fetchPageHandler={this.fetchBookHandler}
              infiniteScroll
              ellipsis={false}
            />
          </>
        )}
      </Content>
    );
  }
}

AddBookPage.propTypes = {
  books: PropTypes.shape({}).isRequired,
  totalCount: PropTypes.number.isRequired,
  pageNum: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  searchResult: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.shape({
    books: PropTypes.bool.isRequired,
    search: PropTypes.bool.isRequired,
    addBook: PropTypes.bool.isRequired,
  }).isRequired,
  error: PropTypes.shape({
    books: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    addBook: PropTypes.string.isRequired,
  }).isRequired,

  fetchBookHistory: PropTypes.func.isRequired,
  searchBook: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  books: selectBooks,
  totalCount: selectTotalCount,
  pageNum: selectPageNum,
  pageSize: selectPageSize,
  searchResult: selectSearchResult,
  visible: selectVisible,
  loading: selectLoading,
  error: selectError,
});

const mapDispatchToProps = {
  fetchBookHistory,
  searchBook,
  resetSearch,
  addBook,
};

const withReducer = injectReducer({ key: 'AddBookPage', reducer });
const withSaga = injectSaga({ key: 'AddBookPage', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddBookPage);
