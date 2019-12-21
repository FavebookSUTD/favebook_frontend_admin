import { fromJS } from 'immutable';
import ACTIONS from './actions';
import size from 'lodash/size';

export const initialState = fromJS({
  loading: false,
  error: '',
  clusters: [],
  totalClusterNum: 0,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_CLUSTER_STATS:
    case ACTIONS.START_SPARK_JOB:
      return state.set('loading', true);

    case ACTIONS.FETCH_CLUSTER_STATS_SUCCESS:
      return state
        .set('clusters', fromJS(action.payload.data))
        .set('totalClusterNum', size(action.payload.data))
        .set('loading', false)
        .set('error', '');

    case ACTIONS.FETCH_CLUSTER_STATS_FAILURE:
      return state
        .set('clusters', fromJS([]))
        .set('totalClusterNum', 0)
        .set('loading', false)
        .set('error', action.payload.toString());

    case ACTIONS.START_SPARK_JOB_SUCCESS:
      return state
        .set('totalClusterNum', action.payload.data)
        .set('loading', false)
        .set('error', '');

    case ACTIONS.START_SPARK_JOB_FAILURE:
      return state.set('loading', false).set('error', action.payload.toString());

    default:
      return state;
  }
}
