import { put } from 'redux-saga/effects';

export function* openModalHandler(openModelAction) {
  yield put({
    type: openModelAction,
  });
}
