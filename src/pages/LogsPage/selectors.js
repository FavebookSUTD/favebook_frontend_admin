import { select, selectToJS } from '@utils/selectorUtils';
import { initialState } from './reducers';

const selectLogsPage = state => state.get('LogsPage', initialState);

const selectLogs = selectToJS(selectLogsPage, 'logs');

const selectTotalLogsCount = select(selectLogsPage, 'totalLogsCount');

const selectCurrentLogsPageNum = select(selectLogsPage, 'currentLogsPageNum');

const selectSearchQuery = select(selectLogsPage, 'searchQuery');

const selectSearchLogs = selectToJS(selectLogsPage, 'searchLogs');

const selectTotalSearchLogsCount = select(selectLogsPage, 'totalSearchLogsCount');

const selectCurrentSearchLogsPageNum = select(selectLogsPage, 'currentSearchLogsPageNum');

const selectLoading = select(selectLogsPage, 'loading');

const selectError = select(selectLogsPage, 'error');

export {
  selectLogs,
  selectTotalLogsCount,
  selectCurrentLogsPageNum,
  selectSearchQuery,
  selectSearchLogs,
  selectTotalSearchLogsCount,
  selectCurrentSearchLogsPageNum,
  selectLoading,
  selectError,
};
