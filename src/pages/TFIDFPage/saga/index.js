import { all, takeLatest } from 'redux-saga/effects';

import saga from '@sagas/commonSagas';

import ACTIONS from '../actions';
import { fetchTFIDFJobStatus, fetchTFIDF } from './api';

export default function* watchTFIDFPage() {
  yield all([
    takeLatest(
      ACTIONS.FETCH_TFIDF_JOB_STATUS,
      saga,
      ACTIONS.FETCH_TFIDF_JOB_STATUS_SUCCESS,
      ACTIONS.FETCH_TFIDF_JOB_STATUS_FAILURE,
      fetchTFIDFJobStatus,
    ),
    takeLatest(
      ACTIONS.FETCH_TFIDF,
      saga,
      ACTIONS.FETCH_TFIDF_SUCCESS,
      ACTIONS.FETCH_TFIDF_FAILURE,
      fetchTFIDF,
    ),
    takeLatest(
      ACTIONS.SEARCH_TFIDF,
      saga,
      ACTIONS.SEARCH_TFIDF_SUCCESS,
      ACTIONS.SEARCH_TFIDF_FAILURE,
      fetchTFIDF,
    ),
  ]);
}
