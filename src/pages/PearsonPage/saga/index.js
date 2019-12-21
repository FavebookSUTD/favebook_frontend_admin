import { all, takeLatest } from 'redux-saga/effects';

import saga from '@sagas/commonSagas';

import ACTIONS from '../actions';
import { fetchPearsonJobStatus, fetchPearson } from './api';

export default function* watchPearsonPage() {
  yield all([
    takeLatest(
      ACTIONS.FETCH_PEARSON_JOB_STATUS,
      saga,
      ACTIONS.FETCH_PEARSON_JOB_STATUS_SUCCESS,
      ACTIONS.FETCH_PEARSON_JOB_STATUS_FAILURE,
      fetchPearsonJobStatus,
    ),
    takeLatest(
      ACTIONS.FETCH_PEARSON,
      saga,
      ACTIONS.FETCH_PEARSON_SUCCESS,
      ACTIONS.FETCH_PEARSON_FAILURE,
      fetchPearson,
    ),
  ]);
}
