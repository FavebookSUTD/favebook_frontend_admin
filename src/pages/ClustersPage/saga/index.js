import { all, takeLatest } from 'redux-saga/effects';

import saga from '@sagas/commonSagas';
import notificationsHandler from '@sagas/notificationsHandler';
import { updateClusterStatus } from './sagas';

import ACTIONS from '../actions';
import { fetchClusterStat, startSparkJob } from './api';

export default function* watchClustersPage() {
  yield all([
    takeLatest(
      ACTIONS.FETCH_CLUSTER_STATS,
      saga,
      ACTIONS.FETCH_CLUSTER_STATS_SUCCESS,
      ACTIONS.FETCH_CLUSTER_STATS_FAILURE,
      fetchClusterStat,
    ),
    takeLatest(
      ACTIONS.START_SPARK_JOB,
      saga,
      ACTIONS.START_SPARK_JOB_SUCCESS,
      ACTIONS.START_SPARK_JOB_FAILURE,
      startSparkJob,
    ),
    takeLatest(ACTIONS.START_SPARK_JOB_SUCCESS, updateClusterStatus, ACTIONS.FETCH_CLUSTER_STATS),
    takeLatest(
      ACTIONS.START_SPARK_JOB_SUCCESS,
      notificationsHandler,
      'success',
      'Successfully start the Spark job.',
    ),
    takeLatest(
      ACTIONS.START_SPARK_JOB_FAILURE,
      notificationsHandler,
      'error',
      'Failed to start the Spark job.',
    ),
  ]);
}
