import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  loading: false,
  error: '',
  clusters: [],
  totalClusterNum: 0,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_CLUSTER_STATS:
    case ACTIONS.UPDATE_CLUSTER:
      return state.set('loading', true);

    case ACTIONS.FETCH_CLUSTER_STATS_SUCCESS:
      return state
        .set('clusters', fromJS(action.payload.data.clusters))
        .set('totalClusterNum', action.payload.data.cluster_count)
        .set('loading', false)
        .set('error', '');

    case ACTIONS.FETCH_CLUSTER_STATS_FAILURE:
      return state
        .set('clusters', fromJS([]))
        .set('loading', false)
        .set('error', action.payload.toString());

    case ACTIONS.UPDATE_CLUSTER_SUCCESS:
      return state.set('loading', false).set('error', '');

    case ACTIONS.UPDATE_CLUSTER_FAILURE:
      return state.set('loading', false).set('error', action.payload.toString());

    default:
      return state;
  }
}
