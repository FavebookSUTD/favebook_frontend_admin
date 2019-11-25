// import React
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid4 from 'uuid/v4';

// import lodash
import map from 'lodash/map';
import set from 'lodash/set';

// import local styling
import './index.scss';

// import Antd
import { Table } from 'antd';

const TableDisplay = ({
  className,
  loading,
  rowKey,
  data,
  titles,
  total,
  pageNum,
  pageSize,
  fetchPageHandler,
  infiniteScroll,
  pagination,
  ellipsis,
}) => {
  const [internalPageNum, setInternalPageNum] = useState(1);

  const currentPageData = pagination && pageNum ? data[pageNum] : data;

  // Define the column title
  const columns = map(titles, title => {
    set(title, 'className', 'table-display-column');
    set(title, 'ellipsis', ellipsis);
    return title;
  });

  // Define the pagination setting
  const paginationSettings = pagination
    ? {
        current: pageNum || internalPageNum,
        position: 'top',
        hideOnSinglePage: true,
        total,
        pageSize,
        onChange: (page, pageSize) => {
          if (!pageNum) {
            setInternalPageNum(page);
          } else {
            fetchPageHandler(page, pageSize);
          }
        },
      }
    : false;

  const scrollSettings = infiniteScroll ? { y: true } : false;

  return (
    <div className={`table-display__container ${className}`}>
      <Table
        className="table-display"
        columns={columns}
        dataSource={currentPageData}
        loading={loading}
        rowKey={record => record[rowKey] || uuid4()}
        pagination={paginationSettings}
        scroll={scrollSettings}
      />
    </div>
  );
};

TableDisplay.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  rowKey: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf(PropTypes.object)]).isRequired,
  titles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      dataIndex: PropTypes.string,
    }),
  ).isRequired,
  total: PropTypes.number.isRequired,
  pageNum: PropTypes.number,
  pageSize: PropTypes.number,
  fetchPageHandler: PropTypes.func,
  infiniteScroll: PropTypes.bool,
  pagination: PropTypes.bool,
  ellipsis: PropTypes.bool,
};

TableDisplay.defaultProps = {
  className: '',
  pageNum: null,
  pageSize: 10,
  fetchPageHandler: () => {},
  infiniteScroll: false,
  pagination: true,
  ellipsis: true,
};

export default TableDisplay;
