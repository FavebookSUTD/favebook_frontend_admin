import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function fetchClusterStat() {
  return api.get({
    url: apiConfig.analytics.clusterHealth,
    needAuthenticate: true,
  });
}

export function startSparkJob({ payload }) {
  const { clusterNum, job } = payload;

  return api
    .post({
      url: apiConfig.analytics.sparkJob,
      body: {
        job,
        nodes: clusterNum,
      },
      needAuthenticate: true,
    })
    .then(() => ({ data: clusterNum }));
}
