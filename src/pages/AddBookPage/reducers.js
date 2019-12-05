import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  books: {},
  totalCount: 0,
  pageNum: 1,
  pageSize: 50,
  searchResult: [],
  visible: false,
  loading: {
    books: false,
    search: false,
    addBook: false,
  },
  error: {
    books: '',
    search: '',
    addBook: '',
  },
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_BOOK_HISTORY:
      return state
        .setIn(['loading', 'books'], true)
        .set('pageNum', action.payload.pageNum)
        .set('pageSize', action.payload.pageSize);

    case ACTIONS.FETCH_BOOK_HISTORY_SUCCESS:
      return state
        .setIn(['books', action.payload.pageNum], fromJS(action.payload.data.books))
        .set('totalCount', action.payload.data.num_books)
        .setIn(['loading', 'books'], false)
        .setIn(['error', 'books'], '');

    case ACTIONS.FETCH_BOOK_HISTORY_FAILURE:
      return state
        .setIn(['loading', 'books'], false)
        .setIn(['error', 'books'], action.payload.toString());

    case ACTIONS.SEARCH_BOOK:
      return state.set('searchResult', fromJS([])).setIn(['loading', 'search'], true);

    case ACTIONS.SEARCH_BOOK_SUCCESS:
      return state
        .set('searchResult', fromJS(action.payload.data))
        .setIn(['loading', 'search'], false)
        .setIn(['error', 'search'], '');

    case ACTIONS.SEARCH_BOOK_FAILURE:
      return state
        .setIn(['loading', 'search'], false)
        .setIn(['error', 'search'], action.payload.toString());

    case ACTIONS.RESET_SEARCH_BOOK:
      return state.set('searchResult', fromJS([]));

    case ACTIONS.ADD_BOOK:
      return state.setIn(['loading', 'addBook'], true);

    case ACTIONS.ADD_BOOK_SUCCESS:
      return state.setIn(['loading', 'addBook'], false);

    case ACTIONS.ADD_BOOK_FAILURE:
      return state
        .setIn(['loading', 'addBook'], false)
        .setIn(['error', 'addBook'], action.payload.toString());

    case ACTIONS.OPEN_MODAL:
      return state.set('visible', true);

    case ACTIONS.CLOSE_MODAL:
      return state.set('visible', false);

    default:
      return state;
  }
}
