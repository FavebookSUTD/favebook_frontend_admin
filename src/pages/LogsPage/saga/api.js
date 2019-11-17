import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function fetchLogs({ payload }) {
  const { sessionID, pageNum, pageSize } = payload;

  const query = {
    'pg-num': pageNum,
    'pg-size': pageSize,
  };

  if (sessionID) {
    query.session_id = sessionID;
    query.filter = 'session_id';
  }

  return api
    .get({
      url: apiConfig.logs,
      query,
      needAuthenticate: true,
    })
    .then(({ data }) => ({ data, pageNum, query: sessionID || '' }));
}
