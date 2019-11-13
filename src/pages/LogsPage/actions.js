const ACTIONS = {
  FETCH_INIT_LOGS: '@pages/LogsPage/FETCH_INIT_LOGS',
  FETCH_INIT_LOGS_SUCCESS: '@pages/LogsPage/FETCH_INIT_LOGS_SUCCESS',
  FETCH_INIT_LOGS_FAILURE: '@pages/LogsPage/FETCH_INIT_LOGS_FAILURE',
  FETCH_NEXT_LOGS: '@pages/LogsPage/FETCH_NEXT_LOGS',
  FETCH_NEXT_LOGS_SUCCESS: '@pages/LogsPage/FETCH_NEXT_LOGS_SUCCESS',
  FETCH_NEXT_LOGS_FAILURE: '@pages/LogsPage/FETCH_NEXT_LOGS_FAILURE',
};

export default ACTIONS;

export const fetchInitLogs = (pageNum, pageSize) => ({
  type: ACTIONS.FETCH_INIT_LOGS,
  payload: { pageNum, pageSize },
});

export const fetchNextLogs = (pageNum, pageSize) => ({
  type: ACTIONS.FETCH_NEXT_LOGS,
  payload: { pageNum, pageSize },
});
