const ACTIONS = {
  FETCH_BOOK_HISTORY: '@pages/AddBookPage/FETCH_BOOK_HISTORY',
  FETCH_BOOK_HISTORY_SUCCESS: '@pages/AddBookPage/FETCH_BOOK_HISTORY_SUCCESS',
  FETCH_BOOK_HISTORY_FAILURE: '@pages/AddBookPage/FETCH_BOOK_HISTORY_FAILURE',
  SEARCH_BOOK: '@pages/AddBookPage/SEARCH_BOOK',
  SEARCH_BOOK_SUCCESS: '@pages/AddBookPage/SEARCH_BOOK_SUCCESS',
  SEARCH_BOOK_FAILURE: '@pages/AddBookPage/SEARCH_BOOK_FAILURE',
  ADD_BOOK: '@pages/AddBookPage/ADD_BOOK',
  ADD_BOOK_SUCCESS: '@pages/AddBookPage/ADD_BOOK_SUCCESS',
  ADD_BOOK_FAILURE: '@pages/AddBookPage/ADD_BOOK_FAILURE',
  OPEN_MODAL: '@pages/AddBookPage/OPEN_MODAL',
  CLOSE_MODAL: '@pages/AddBookPage/CLOSE_MODAL',
};

export default ACTIONS;

export const fetchBookHistory = (pageNum, pageSize) => ({
  type: ACTIONS.FETCH_BOOK_HISTORY,
  payload: { pageNum, pageSize },
});

export const searchBook = (bookTitle, bookAuthor) => ({
  type: ACTIONS.SEARCH_BOOK,
  payload: { bookTitle, bookAuthor },
});

export const addBook = (asin, author, description, genres, imUrl, title) => ({
  type: ACTIONS.ADD_BOOK,
  payload: { asin, author, description, genres, imUrl, title },
});

export const openModal = () => ({
  type: ACTIONS.OPEN_MODEL,
});

export const closeModal = () => ({
  type: ACTIONS.CLOSE_MODAL,
});
