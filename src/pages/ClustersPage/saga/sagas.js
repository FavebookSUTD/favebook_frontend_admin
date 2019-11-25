import { put } from 'redux-saga/effects';

export function* updateClusterStatus(triggerAction) {
  yield put({ type: triggerAction });
}
