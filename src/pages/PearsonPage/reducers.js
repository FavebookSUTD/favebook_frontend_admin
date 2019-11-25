import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  pearsonJobStatus: 'running',
  coefficient: 0,
  reviewsAndPrices: [],
  totalCount: 0,
  loading: false,
  error: '',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_PEARSON_JOB_STATUS:
      return state.set('pearsonJobStatus', 'running').set('loading', true);

    case ACTIONS.FETCH_PEARSON_JOB_STATUS_SUCCESS:
      return state
        .set('pearsonJobStatus', action.payload.data.status)
        .set('loading', false)
        .set('error', '');

    case ACTIONS.FETCH_PEARSON_JOB_STATUS_FAILURE:
      return state
        .set('pearsonJobStatus', 'fail')
        .set('loading', false)
        .set('error', action.payload.toString());

    case ACTIONS.FETCH_PEARSON:
      return state.set('loading', true);

    case ACTIONS.FETCH_PEARSON_SUCCESS:
      return state
        .set('reviewsAndPrices', fromJS(action.payload.data.reviewsAndPrices))
        .set('coefficient', action.payload.data.pearsonCoefficient)
        .set('totalCount', action.payload.data.totalCount)
        .set('loading', false)
        .set('error', '');

    case ACTIONS.FETCH_PEARSON_FAILURE:
      return state.set('loading', false).set('error', action.payload.toString());

    default:
      return state;
  }
}
