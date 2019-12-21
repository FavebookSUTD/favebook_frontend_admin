import { select, selectToJS } from '@utils/selectorUtils';
import { initialState } from './reducers';

const selectAddBookPage = state => state.get('AddBookPage', initialState);

const selectBooks = selectToJS(selectAddBookPage, 'books');

const selectTotalCount = select(selectAddBookPage, 'totalCount');

const selectPageNum = select(selectAddBookPage, 'pageNum');

const selectPageSize = select(selectAddBookPage, 'pageSize');

const selectSearchResult = selectToJS(selectAddBookPage, 'searchResult');

const selectVisible = select(selectAddBookPage, 'visible');

const selectLoading = selectToJS(selectAddBookPage, 'loading');

const selectError = selectToJS(selectAddBookPage, 'error');

export {
  selectBooks,
  selectTotalCount,
  selectPageNum,
  selectPageSize,
  selectSearchResult,
  selectVisible,
  selectLoading,
  selectError,
};
