// import React
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import lodash
import isEqual from 'lodash/isEqual';

// import local styling
import './index.scss';

// import Antd
import { Typography, Select, Button } from 'antd';

// Extract antd components
const { Title } = Typography;
const { Option } = Select;

const ClusterController = ({ loading, clusterCount, updateHandler, refreshHandler }) => {
  const [selectValue, setSelectValue] = useState(clusterCount);
  const [trigger, setTrigger] = useState('');

  useEffect(() => {
    if (isEqual(selectValue, 0)) {
      setSelectValue(clusterCount);
    }
  }, [selectValue, clusterCount]);

  return (
    <div className="cluster-controller__container">
      <Title className="cluster-controller-title" level={4}>
        NUMBER OF CLUSTERS
      </Title>
      <div className="cluster-controller">
        <Select
          className="cluster-controller__select"
          dropdownClassName="cluster-controller__select-option"
          loading={loading}
          value={loading ? '' : selectValue}
          onSelect={setSelectValue}
        >
          <Option value={2}>2</Option>
          <Option value={4}>4</Option>
          <Option value={6}>6</Option>
          <Option value={8}>8</Option>
          <Option value={16}>16</Option>
        </Select>
        <Button
          className="spark-btn"
          type="primary"
          shape="round"
          loading={isEqual(trigger, 'spark') && loading}
          onClick={() => {
            setTrigger('spark');
            updateHandler(selectValue);
          }}
        >
          Run Spark Job
        </Button>
        <Button
          className="refresh-btn"
          icon="reload"
          type="primary"
          shape="round"
          loading={isEqual(trigger, 'refresh') && loading}
          onClick={() => {
            setTrigger('refresh');
            refreshHandler();
          }}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
};

ClusterController.propTypes = {
  loading: PropTypes.bool.isRequired,
  clusterCount: PropTypes.number.isRequired,
  updateHandler: PropTypes.func.isRequired,
  refreshHandler: PropTypes.func.isRequired,
};

export default ClusterController;
