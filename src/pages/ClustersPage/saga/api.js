import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function fetchClusterStat() {
  const mockData = require('./mock/mockClusterStats.json');

  return new Promise(resolve => setTimeout(() => resolve(mockData), 1000));
}

export function updateCluster({ payload }) {
  const { clusterNum } = payload;

  return new Promise(resolve => setTimeout(() => resolve({ data: clusterNum }), 1000));
}
