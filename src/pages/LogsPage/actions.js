const ACTIONS = {
  FETCH_LOGS: '@pages/LogsPage/FETCH_LOGS',
  FETCH_LOGS_SUCCESS: '@pages/LogsPage/FETCH_LOGS_SUCCESS',
  FETCH_LOGS_FAILURE: '@pages/LogsPage/FETCH_LOGS_FAILURE',
  SEARCH_LOGS: '@pages/LogsPage/SEARCH_LOGS',
  SEARCH_LOGS_SUCCESS: '@pages/LogsPage/SEARCH_LOGS_SUCCESS',
  SEARCH_LOGS_FAILURE: '@pages/LogsPage/SEARCH_LOGS_FAILURE',
  RESET_SEARCH_LOGS: '@pages/LogsPage/RESET_SEARCH_LOGS',
};

export default ACTIONS;

export const fetchLogs = (pageNum, pageSize) => ({
  type: ACTIONS.FETCH_LOGS,
  payload: { pageNum, pageSize },
});

export const fetchSearchLogs = (sessionID, pageNum, pageSize) => ({
  type: ACTIONS.SEARCH_LOGS,
  payload: { sessionID, pageNum, pageSize },
});

export const resetSearchLogs = () => ({
  type: ACTIONS.RESET_SEARCH_LOGS,
});
