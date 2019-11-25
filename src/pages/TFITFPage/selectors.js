import { select, selectToJS } from '@utils/selectorUtils';
import { initialState } from './reducers';

const selectTFITFPage = state => state.get('TFITFPage', initialState);

const selectTFITF = selectToJS(selectTFITFPage, 'TFITF');

const selectTotalTFITFCount = select(selectTFITFPage, 'totalTFITFCount');

const selectSearchQuery = selectToJS(selectTFITFPage, 'searchQuery');

const selectSearchTFITF = selectToJS(selectTFITFPage, 'searchTFITF');

const selectTotalSearchTFITFCount = select(selectTFITFPage, 'totalSearchTFITFCount');

const selectCurrentPageNum = select(selectTFITFPage, 'currentPageNum');

const selectPageSize = select(selectTFITFPage, 'pageSize');

const selectLoading = select(selectTFITFPage, 'loading');

const selectError = select(selectTFITFPage, 'error');

export {
  selectTFITF,
  selectTotalTFITFCount,
  selectSearchQuery,
  selectSearchTFITF,
  selectTotalSearchTFITFCount,
  selectCurrentPageNum,
  selectPageSize,
  selectLoading,
  selectError,
};
