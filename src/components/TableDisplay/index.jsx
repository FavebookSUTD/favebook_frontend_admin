// import React
import React from 'react';
import PropTypes from 'prop-types';

// import lodash
import size from 'lodash/size';
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
  pageSize,
  fetchNextHandler,
  infiniteScroll,
}) => {
  // Define the column title
  const columns = map(titles, title => {
    set(title, 'className', 'table-display-column');
    set(title, 'ellipsis', true);
    return title;
  });

  // Define the pagination setting
  const paginationSetttings = infiniteScroll
    ? false
    : {
        position: 'top',
        hideOnSinglePage: true,
        total,
        pageSize,
        onChange: (page, pageSize) => {
          const currentLogsCount = size(data);
          if (page > 1 && page * pageSize >= currentLogsCount && currentLogsCount < total) {
            fetchNextHandler();
          }
        },
      };

  const scrollSettings = infiniteScroll ? { y: true } : false;

  return (
    <div className="table-display__container">
      <Table
        className="table-display"
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={record => record._id || record.id}
        pagination={paginationSetttings}
        scroll={scrollSettings}
      />
    </div>
  );
};

TableDisplay.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  titles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      dataIndex: PropTypes.string,
    }),
  ).isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  fetchNextHandler: PropTypes.func,
  infiniteScroll: PropTypes.bool,
};

TableDisplay.defaultProps = {
  pageSize: 8,
  fetchNextHandler: () => {},
  infiniteScroll: false,
};

export default TableDisplay;
