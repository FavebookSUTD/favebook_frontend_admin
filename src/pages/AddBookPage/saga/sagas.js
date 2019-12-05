import { put, select } from 'redux-saga/effects';

export function* openModalHandler(openModelAction) {
  yield put({
    type: openModelAction,
  });
}

export function* updateBooksHanlder(fetchBookAction) {
  const payload = yield select(state => {
    const pageNum = state.getIn(['AddBookPage', 'pageNum']);
    const pageSize = state.getIn(['AddBookPage', 'pageSize']);

    return { pageNum, pageSize };
  });

  yield put({
    type: fetchBookAction,
    payload,
  });
}
