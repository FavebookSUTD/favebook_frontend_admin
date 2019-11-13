import { select, selectToJS } from '@utils/selectorUtils';
import { initialState } from './reducers';

const selectLogsPage = state => state.get('LogsPage', initialState);

const selectLogs = selectToJS(selectLogsPage, 'logs');

const selectTotalLogsCount = select(selectLogsPage, 'totalLogsCount');

const selectCurrentLogsPageNum = select(selectLogsPage, 'currentLogsPageNum');

const selectLoading = select(selectLogsPage, 'loading');

const selectError = select(selectLogsPage, 'error');

export { selectLogs, selectTotalLogsCount, selectCurrentLogsPageNum, selectLoading, selectError };
