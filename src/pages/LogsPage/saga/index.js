import { all, takeLatest } from 'redux-saga/effects';

import saga from '@sagas/commonSagas';

import ACTIONS from '../actions';
import { fetchLogs } from './api';

export default function* watchLogsPage() {
  yield all([
    takeLatest(
      ACTIONS.FETCH_LOGS,
      saga,
      ACTIONS.FETCH_LOGS_SUCCESS,
      ACTIONS.FETCH_LOGS_FAILURE,
      fetchLogs,
    ),
    takeLatest(
      ACTIONS.SEARCH_LOGS,
      saga,
      ACTIONS.SEARCH_LOGS_SUCCESS,
      ACTIONS.SEARCH_LOGS_FAILURE,
      fetchLogs,
    ),
  ]);
}
