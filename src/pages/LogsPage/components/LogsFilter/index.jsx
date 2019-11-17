// import React
import React from 'react';
import PropTypes from 'prop-types';

// import local styling
import './index.scss';

// import Antd
import { Input } from 'antd';

// Extract antd components
const { Search } = Input;

const LogsFilter = ({ searchHandler, resetHandler }) => {
  return (
    <div className="logs-filter__container">
      <Search
        className="logs-filter__search-container"
        placeholder="Session ID"
        enterButton
        allowClear
        onSearch={value => {
          if (value) {
            searchHandler(value);
          } else {
            resetHandler();
          }
        }}
      />
    </div>
  );
};

LogsFilter.propTypes = {
  searchHandler: PropTypes.func.isRequired,
  resetHandler: PropTypes.func.isRequired,
};

export default LogsFilter;
