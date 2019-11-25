import { all, takeLatest } from 'redux-saga/effects';

import saga from '@sagas/commonSagas';

import ACTIONS from '../actions';
import { fetchTFITF } from './api';

export default function* watchTFITFPage() {
  yield all([
    takeLatest(
      ACTIONS.FETCH_TFITF,
      saga,
      ACTIONS.FETCH_TFITF_SUCCESS,
      ACTIONS.FETCH_TFITF_FAILURE,
      fetchTFITF,
    ),
    takeLatest(
      ACTIONS.SEARCH_TFITF,
      saga,
      ACTIONS.SEARCH_TFITF_SUCCESS,
      ACTIONS.SEARCH_TFITF_FAILURE,
      fetchTFITF,
    ),
  ]);
}
