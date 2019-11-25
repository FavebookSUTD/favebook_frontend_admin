import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function fetchTFITF({ payload }) {
  const { searchValue, searchKey, pageNum, pageSize } = payload;

  const query = {
    'pg-num': pageNum,
    'pg-size': pageSize,
  };

  query[searchKey] = searchValue;
  query.filter = searchKey;

  const { data } = require('./mock/mockTFITFData.json');

  return new Promise(resolve =>
    setTimeout(() => resolve({ data, pageNum, query: { searchValue, searchKey } }), 1000),
  );

  // return api
  //   .get({
  //     url: apiConfig.analytics.tfitf,
  //     query,
  //     needAuthenticate: true,
  //   })
  //   .then(({ data }) => ({ data, pageNum, query: { searchValue, searchKey } }));
}
