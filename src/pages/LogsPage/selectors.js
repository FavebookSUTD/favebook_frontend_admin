import { select, selectToJS } from '@utils/selectorUtils';
import { initialState } from './reducers';

const selectLogsPage = state => state.get('LogsPage', initialState);

const selectLogs = selectToJS(selectLogsPage, 'logs');

const selectTotalLogsCount = select(selectLogsPage, 'totalLogsCount');

const selectSearchQuery = selectToJS(selectLogsPage, 'searchQuery');

const selectSearchLogs = selectToJS(selectLogsPage, 'searchLogs');

const selectTotalSearchLogsCount = select(selectLogsPage, 'totalSearchLogsCount');

const selectCurrentPageNum = select(selectLogsPage, 'currentPageNum');

const selectPageSize = select(selectLogsPage, 'pageSize');

const selectLoading = select(selectLogsPage, 'loading');

const selectError = select(selectLogsPage, 'error');

export {
  selectLogs,
  selectTotalLogsCount,
  selectSearchQuery,
  selectSearchLogs,
  selectTotalSearchLogsCount,
  selectCurrentPageNum,
  selectPageSize,
  selectLoading,
  selectError,
};
