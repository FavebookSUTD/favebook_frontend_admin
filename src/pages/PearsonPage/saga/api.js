import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function fetchPearsonJobStatus() {
  return new Promise(resolve =>
    setTimeout(
      () =>
        resolve({
          data: { job: 'pearson', status: 'success' },
        }),
      3000,
    ),
  );
  // return api.get({
  //   url: apiConfig.analytics.jobStatus,
  //   query: { job: 'pearson' },
  //   needAuthenticate: true,
  // });
}

export function fetchPearson() {
  const mockData = require('./mock/mockPearsonData.json');

  return new Promise(resolve => setTimeout(() => resolve(mockData), 1000));

  // return api.get({
  //   url: apiConfig.analytics.pearson,
  //   needAuthenticate: true,
  // });
}
