// import React
import React from 'react';
import PropTypes from 'prop-types';

// import local components

// import lodash

// import local styling
import './index.scss';

// import Antd
import { Input } from 'antd';

// Extract antd components
const { Search } = Input;

const LogsFilter = () => {
  return (
    <div className="logs-filter__container">
      <Search
        className="logs-filter__search-container"
        placeholder="Session ID"
        enterButton
        allowClear
        onSearch={value => console.log(value)}
      />
    </div>
  );
};

LogsFilter.propTypes = {};

export default LogsFilter;
