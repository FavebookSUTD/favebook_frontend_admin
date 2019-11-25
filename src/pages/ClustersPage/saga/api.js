import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function fetchClusterStat() {
  const mockData = require('./mock/mockClusterStats.json');

  return new Promise(resolve => setTimeout(() => resolve(mockData), 1000));

  // return api.get({
  //   url: apiConfig.analytics.clusterHealth,
  //   needAuthenticate: true,
  // });
}

export function startSparkJob({ payload }) {
  const { clusterNum, job } = payload;

  return new Promise(resolve => setTimeout(() => resolve({ data: clusterNum }), 1000));

  // return api
  //   .post({
  //     url: apiConfig.analytics.sparkJob,
  //     body: {
  //       job,
  //       nodes: clusterNum,
  //     },
  //     needAuthenticate: true,
  //   })
  //   .then(() => ({ data: clusterNum }));
}
