import { select, selectToJS } from '@utils/selectorUtils';
import { initialState } from './reducers';

const selectTFIDFPage = state => state.get('TFIDFPage', initialState);

const selectTFIDFJobStatus = select(selectTFIDFPage, 'TFIDFJobStatus');

const selectTFIDF = selectToJS(selectTFIDFPage, 'TFIDF');

const selectTotalTFIDFCount = select(selectTFIDFPage, 'totalTFIDFCount');

const selectSearchQuery = selectToJS(selectTFIDFPage, 'searchQuery');

const selectSearchTFIDF = selectToJS(selectTFIDFPage, 'searchTFIDF');

const selectTotalSearchTFIDFCount = select(selectTFIDFPage, 'totalSearchTFIDFCount');

const selectCurrentPageNum = select(selectTFIDFPage, 'currentPageNum');

const selectPageSize = select(selectTFIDFPage, 'pageSize');

const selectLoading = select(selectTFIDFPage, 'loading');

const selectError = select(selectTFIDFPage, 'error');

export {
  selectTFIDFJobStatus,
  selectTFIDF,
  selectTotalTFIDFCount,
  selectSearchQuery,
  selectSearchTFIDF,
  selectTotalSearchTFIDFCount,
  selectCurrentPageNum,
  selectPageSize,
  selectLoading,
  selectError,
};
