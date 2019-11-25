// import React
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import lodash
import map from 'lodash/map';
import set from 'lodash/set';

// import local styling
import './index.scss';

// import Antd
import { Table } from 'antd';

const TableDisplay = ({
  loading,
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

  const currentPageLogs = pagination ? data[pageNum || internalPageNum] : data;

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
          }
          fetchPageHandler(page, pageSize);
        },
      }
    : false;

  const scrollSettings = infiniteScroll ? { y: true } : false;

  return (
    <div className="table-display__container">
      <Table
        className="table-display"
        columns={columns}
        dataSource={currentPageLogs}
        loading={loading}
        rowKey={record => record._id || record.id}
        pagination={paginationSettings}
        scroll={scrollSettings}
      />
    </div>
  );
};

TableDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
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
  pageNum: null,
  pageSize: 10,
  fetchPageHandler: () => {},
  infiniteScroll: false,
  pagination: true,
  ellipsis: true,
};

export default TableDisplay;
