import { all, takeLatest } from 'redux-saga/effects';

import saga from '@sagas/commonSagas';

import ACTIONS from '../actions';
import { fetchClusterStat, updateCluster } from './api';

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
      ACTIONS.UPDATE_CLUSTER,
      saga,
      ACTIONS.UPDATE_CLUSTER_SUCCESS,
      ACTIONS.UPDATE_CLUSTER_FAILURE,
      updateCluster,
    ),
  ]);
}
