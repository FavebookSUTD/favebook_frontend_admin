import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function fetchPearsonJobStatus() {
  return api.get({
    url: apiConfig.analytics.jobStatus,
    query: { job: 'pearson' },
    needAuthenticate: true,
  });
}

export function fetchPearson() {
  return api.get({
    url: apiConfig.analytics.pearson,
    needAuthenticate: true,
  });
}
