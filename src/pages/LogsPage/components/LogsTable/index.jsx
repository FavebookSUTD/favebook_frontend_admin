// import React
import React from 'react';
import PropTypes from 'prop-types';

// import lodash
import size from 'lodash/size';

// import local styling
import './index.scss';

// import Antd
import { Table } from 'antd';

const LogsTable = ({ loading, logs, total, fetchNextHandler }) => {
  // Define the column title
  const columns = [
    {
      title: 'Session ID',
      dataIndex: 'session_id',
      className: 'logs-table-column',
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
      className: 'logs-table-column',
    },
    {
      title: 'Timestamp',
      dataIndex: 'time',
      className: 'logs-table-column',
    },
    {
      title: 'Endpoint',
      dataIndex: 'end_point',
      className: 'logs-table-column',
    },
  ];

  return (
    <div className="logs-table__container">
      <Table
        className="logs-table"
        columns={columns}
        dataSource={logs}
        loading={loading}
        rowKey={record => record._id}
        pagination={{
          position: 'top',
          hideOnSinglePage: true,
          total,
          pageSize: 8,
          onChange: (page, pageSize) => {
            const currentLogsCount = size(logs);
            if (page > 1 && page * pageSize >= currentLogsCount && currentLogsCount < total) {
              fetchNextHandler();
            }
          },
        }}
      />
    </div>
  );
};

LogsTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      session_id: PropTypes.string,
      user_id: PropTypes.string,
      ip: PropTypes.string,
      request_type: PropTypes.string,
      end_point: PropTypes.string,
      time: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
  total: PropTypes.number.isRequired,
  fetchNextHandler: PropTypes.func.isRequired,
};

export default LogsTable;
