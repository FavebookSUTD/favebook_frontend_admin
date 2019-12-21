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
import { fetchPearsonJobStatus, fetchPearson } from './actions';

// import selector
import {
  selectPearsonJobStatus,
  selectCoefficient,
  selectReviewsAndPrices,
  selectTotalCount,
  selectLoading,
  selectError,
} from './selectors';

// import local components
import TableDisplay from '@components/TableDisplay';

// import lodash
import isEqual from 'lodash/isEqual';

// import local styling
import './index.scss';

// import Antd
import { Layout, Typography, Result, Button, Spin } from 'antd';

// Extract antd components
const { Content } = Layout;
const { Title } = Typography;

class PearsonPage extends PureComponent {
  columns = [
    { title: 'Review Length', dataIndex: 'reviewLength' },
    { title: 'Price', dataIndex: 'price' },
  ];

  componentDidMount() {
    const { fetchPearsonJobStatus } = this.props;
    fetchPearsonJobStatus();
  }

  componentDidUpdate(prevProps) {
    const { pearsonJobStatus } = prevProps;
    const { pearsonJobStatus: currentStatus, fetchPearson } = this.props;
    if (isEqual(pearsonJobStatus, 'running') && isEqual(currentStatus, 'success')) {
      fetchPearson();
    }
  }

  render() {
    const {
      pearsonJobStatus,
      coefficient,
      reviewsAndPrices,
      totalCount,
      loading,
      error,
      fetchPearsonJobStatus,
    } = this.props;

    const sparkRunning = isEqual(pearsonJobStatus, 'running');

    return (
      <Content className="pearson-page__container">
        <Title className="pearson-page-title">Pearson Correlation on Review Length and Price</Title>
        {error || isEqual(pearsonJobStatus, 'fail') ? (
          <Result status="500" title="Something went wrong in the server." />
        ) : (
          <>
            <div className="pearson-page__info-container">
              <Title className="pearson-page-coefficient" level={4}>
                {`Pearson Coefficient: ${sparkRunning || loading ? '...' : coefficient}`}
              </Title>
              <Button
                className="reload-button"
                type="primary"
                shape="round"
                icon="reload"
                loading={loading}
                onClick={fetchPearsonJobStatus}
              >
                Reload
              </Button>
            </div>
            <Spin
              wrapperClassName="pearson-page__table-spin-wrapper"
              tip={<span className="spark-pending-text">Checking Spark Job ...</span>}
              spinning={sparkRunning}
            >
              <TableDisplay
                className="pearson-page__table"
                loading={loading && !sparkRunning}
                rowKey=""
                data={reviewsAndPrices}
                titles={this.columns}
                total={totalCount}
                pageSize={50}
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

PearsonPage.propTypes = {
  pearsonJobStatus: PropTypes.string.isRequired,
  coefficient: PropTypes.number.isRequired,
  reviewsAndPrices: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  totalCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,

  fetchPearsonJobStatus: PropTypes.func.isRequired,
  fetchPearson: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pearsonJobStatus: selectPearsonJobStatus,
  coefficient: selectCoefficient,
  reviewsAndPrices: selectReviewsAndPrices,
  totalCount: selectTotalCount,
  loading: selectLoading,
  error: selectError,
});

const mapDispatchToProps = {
  fetchPearsonJobStatus,
  fetchPearson,
};

const withReducer = injectReducer({ key: 'PearsonPage', reducer });
const withSaga = injectSaga({ key: 'PearsonPage', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PearsonPage);
