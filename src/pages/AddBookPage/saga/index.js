import { all, takeLatest } from 'redux-saga/effects';

import saga from '@sagas/commonSagas';
import { openModalHandler } from './sagas';
import notificationsHandler from '@sagas/notificationsHandler';
import modalSubmitHandler from '@sagas/modalSubmitHandler';

import ACTIONS from '../actions';
import { fetchBookHistory, searchBook, addBook } from './api';

export default function* watchLogsPage() {
  yield all([
    takeLatest(
      ACTIONS.FETCH_BOOK_HISTORY,
      saga,
      ACTIONS.FETCH_BOOK_HISTORY_SUCCESS,
      ACTIONS.FETCH_BOOK_HISTORY_FAILURE,
      fetchBookHistory,
    ),
    takeLatest(
      ACTIONS.SEARCH_BOOK,
      saga,
      ACTIONS.SEARCH_BOOK_SUCCESS,
      ACTIONS.SEARCH_BOOK_FAILURE,
      searchBook,
    ),
    takeLatest(ACTIONS.SEARCH_BOOK_SUCCESS, openModalHandler, ACTIONS.OPEN_MODAL),
    takeLatest(
      ACTIONS.SEARCH_BOOK_FAILURE,
      notificationsHandler,
      'error',
      'Unable to find any book.',
    ),
    takeLatest(
      ACTIONS.ADD_BOOK,
      modalSubmitHandler,
      ACTIONS.ADD_BOOK_SUCCESS,
      ACTIONS.ADD_BOOK_FAILURE,
      ACTIONS.CLOSE_MODAL,
      addBook,
    ),
    takeLatest(
      ACTIONS.ADD_BOOK_SUCCESS,
      notificationsHandler,
      'success',
      'Successfully added the book.',
    ),
    takeLatest(ACTIONS.ADD_BOOK_FAILURE, notificationsHandler, 'error', 'Failed to add the book.'),
  ]);
}
