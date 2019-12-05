// import React
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// import local styling
import './index.scss';

// import Antd
import { Input, Typography, Button } from 'antd';

// Extract antd components
const { Text } = Typography;

const BookSearch = ({ loading, searchHandler }) => {
  const titleContainer = useRef(null);
  const authorContainer = useRef(null);

  const onSearch = () => {
    const title = titleContainer.current.input.value;
    const author = authorContainer.current.input.value;
    if (title) {
      searchHandler(title, author);
    }
  };

  return (
    <div className="book-search__container">
      <Input
        className="book-search__title-container"
        placeholder="Title (Required)"
        allowClear
        ref={titleContainer}
        onPressEnter={onSearch}
      />
      <Text className="book-search__written-title">Written By</Text>
      <Input
        className="book-search__author-container"
        placeholder="Author (Optional)"
        allowClear
        ref={authorContainer}
        onPressEnter={onSearch}
      />
      <Button
        className="search-btn"
        shape="circle"
        icon="search"
        loading={loading}
        onClick={onSearch}
      />
    </div>
  );
};

BookSearch.propTypes = {
  loading: PropTypes.bool.isRequired,
  searchHandler: PropTypes.func.isRequired,
};

export default BookSearch;
