import { all, takeLatest } from 'redux-saga/effects';

import saga from '@sagas/commonSagas';
import notificationHandler from '@sagas/notificationsHandler';
import { authSuccessHandler } from './sagas';

import ACTIONS from '../actions';
import AppLayoutActions from '@pages/AppLayout/actions';
import { signInFromAPI } from './api';

export default function* watcherAuthForm() {
  yield all([
    takeLatest(
      ACTIONS.SIGNIN_FROM_API,
      saga,
      ACTIONS.SIGNIN_FROM_API_SUCCESS,
      ACTIONS.SIGNIN_FROM_API_FAILURE,
      signInFromAPI,
    ),
    takeLatest(
      ACTIONS.SIGNIN_FROM_API_FAILURE,
      notificationHandler,
      'error',
      'Failed to login! Please verify the form and try again.',
    ),
    takeLatest(
      ACTIONS.SIGNIN_FROM_API_SUCCESS,
      authSuccessHandler,
      AppLayoutActions.CLEAR_PREV_PATH,
    ),
  ]);
}
