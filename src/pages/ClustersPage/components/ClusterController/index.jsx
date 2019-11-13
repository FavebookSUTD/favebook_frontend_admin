// import React
import React from 'react';
import PropTypes from 'prop-types';

// import local components

// import lodash

// import local styling
import './index.scss';

// import Antd
import { Typography, Select, Button } from 'antd';

// Extract antd components
const { Title } = Typography;
const { Option } = Select;

const ClusterController = () => {
  return (
    <div className="cluster-controller__container">
      <Title className="cluster-controller-title" level={4}>
        NUMBER OF CLUSTERS
      </Title>
      <div className="cluster-controller">
        <Select
          className="cluster-controller__select"
          dropdownClassName="cluster-controller__select-option"
          defaultValue={2}
        >
          <Option value={2}>2</Option>
          <Option value={4}>4</Option>
          <Option value={6}>6</Option>
          <Option value={8}>8</Option>
          <Option value={16}>16</Option>
        </Select>
        <Button className="spark-btn" type="primary" shape="round">
          Run Spark Job
        </Button>
      </div>
    </div>
  );
};

ClusterController.propTypes = {};

export default ClusterController;
