import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function fetchLogs({ payload }) {
  const { searchValue, searchKey, pageNum, pageSize } = payload;

  const query = {
    'pg-num': pageNum,
    'pg-size': pageSize,
  };

  if (searchValue && searchKey) {
    query[searchKey] = searchValue;
    query.filter = searchKey;
  }

  return api
    .get({
      url: apiConfig.logs,
      query,
      needAuthenticate: true,
    })
    .then(({ data }) => ({ data, pageNum, query: { searchValue, searchKey } }));
}
