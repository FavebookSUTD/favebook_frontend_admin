// import React
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import lodash
import map from 'lodash/map';
import isEqual from 'lodash/isEqual';

// import local components
import ImageWrapper from '@components/ImageWrapper';

// import local styling
import './index.scss';

// import Antd
import { Modal, Card, Typography, Button } from 'antd';

// Extract antd components
const { Title, Text } = Typography;

const renderOptionCard = (loading, options, selectedOption, setSelectedOption, submitHandler) => {
  return map(options, option => (
    <Card
      className={`option-card__container ${isEqual(selectedOption, option.title) ? 'active' : ''}`}
      key={option.title}
      cover={
        <div className="book-cover-img__container">
          <ImageWrapper
            className="book-cover-img"
            imgSrc={option.imUrl || ''}
            imgAltText={option.title || ''}
          />
        </div>
      }
      hoverable={!loading}
      bordered={false}
      onFocus={() => {
        if (!loading) {
          setSelectedOption(option.title);
        }
      }}
      onMouseOver={() => {
        if (!loading) {
          setSelectedOption(option.title);
        }
      }}
    >
      <div className="book-description__container">
        <Title className="book-title" level={4} ellipsis>
          {option.title}
        </Title>
        <Text className="book-author" ellipsis>
          {option.author || 'No author'}
        </Text>
        <Button
          className={`submit-btn ${isEqual(selectedOption, option.title) ? 'active' : ''}`}
          shape="round"
          size="large"
          loading={loading}
          onClick={() => submitHandler(option)}
        >
          Confirm To Add
        </Button>
      </div>
    </Card>
  ));
};

const BookSelectionModal = ({ visible, loading, options, submitHandler, closeModalHandler }) => {
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <Modal
      className="book-selection-modal__container"
      visible={visible}
      centered
      footer={null}
      destroyOnClose
      onCancel={() => {
        if (!loading) {
          closeModalHandler();
        }
      }}
    >
      <div className="book-select-modal__content-container">
        {renderOptionCard(loading, options, selectedOption, setSelectedOption, submitHandler)}
      </div>
    </Modal>
  );
};

BookSelectionModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      imUrl: PropTypes.string,
      author: PropTypes.string,
    }),
  ).isRequired,
  submitHandler: PropTypes.func.isRequired,
  closeModalHandler: PropTypes.func.isRequired,
};

export default BookSelectionModal;
