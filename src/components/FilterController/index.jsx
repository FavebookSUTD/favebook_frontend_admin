// import React
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import lodash
import map from 'lodash/map';
import filter from 'lodash/filter';
import get from 'lodash/get';

// import local styling
import './index.scss';

// import Antd
import { Input, Select, Typography } from 'antd';

// Extract antd components
const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const renderOptions = options =>
  map(options, ({ key, displayValue }) => <Option key={key}>{displayValue}</Option>);

const getDefaultKey = options => get(filter(options, ['default', true]), '[0].key');

const FilterController = ({ searchHandler, resetHandler, options }) => {
  const [filterOption, setFilterOption] = useState(getDefaultKey(options));

  return (
    <div className="filter-controller__container">
      <Search
        className="filter-controller__search-container"
        placeholder="Filter Value"
        allowClear
        onSearch={value => {
          if (value) {
            searchHandler(value, filterOption);
          } else {
            resetHandler();
          }
        }}
      />
      <Text className="filter-controller__filter-title">Filter By</Text>
      <Select
        className="filter-controller__select-container"
        dropdownClassName="filter-controller__option-container"
        defaultValue={getDefaultKey(options)}
        onSelect={value => setFilterOption(value)}
      >
        {renderOptions(options)}
      </Select>
    </div>
  );
};

FilterController.propTypes = {
  searchHandler: PropTypes.func.isRequired,
  resetHandler: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      displayValue: PropTypes.string.isRequired,
      default: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default FilterController;
