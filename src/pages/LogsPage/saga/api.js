import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function fetchLogs({ payload }) {
  const { data } = require('./mock/mockLogsData.json');

  const { pageNum, pageSize } = payload;
  return new Promise(resolve => setTimeout(() => resolve({ data, pageNum }), 1000));

  // return api
  //   .get({
  //     url: apiConfig.logs,
  //     query: {
  //       'pg-num': pageNum,
  //       'pg-size': pageSize,
  //     },
  //   })
  //   .then(({ data }) => ({ data, pageNum }));
}
