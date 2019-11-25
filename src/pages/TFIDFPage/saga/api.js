import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function fetchTFIDFJobStatus() {
  return new Promise(resolve =>
    setTimeout(() => resolve({ data: { job: 'tfidf', status: 'success' } }), 3000),
  );
  // return api.get({
  //   url: apiConfig.analytics.tfitf,
  //   query: { job: 'tfidf' },
  //   needAuthenticate: true,
  // });
}

export function fetchTFIDF({ payload }) {
  const { searchValue, searchKey, pageNum, pageSize } = payload;

  const query = {
    'pg-num': pageNum,
    'pg-size': pageSize,
  };

  if (searchValue && searchKey) {
    query[searchKey] = searchValue;
    query.filter = searchKey;
  }

  const { data } = require('./mock/mockTFIDFData.json');

  return new Promise(resolve =>
    setTimeout(() => resolve({ data, pageNum, query: { searchValue, searchKey } }), 1000),
  );

  // return api
  //   .get({
  //     url: apiConfig.analytics.tfidf,
  //     query,
  //     needAuthenticate: true,
  //   })
  //   .then(({ data }) => ({ data, pageNum, query: { searchValue, searchKey } }));
}
