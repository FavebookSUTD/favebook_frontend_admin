import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function fetchLogs({ payload }) {
  const { pageNum, pageSize } = payload;

  return api
    .get({
      url: apiConfig.logs,
      query: {
        'pg-num': pageNum,
        'pg-size': pageSize,
      },
    })
    .then(({ data }) => ({ data, pageNum }));
}
