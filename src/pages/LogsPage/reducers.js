import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  logs: [],
  totalLogsCount: 0,
  currentLogsPageNum: 0,
  loading: false,
  error: '',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_INIT_LOGS:
    case ACTIONS.FETCH_NEXT_LOGS:
      return state.set('loading', true);

    case ACTIONS.FETCH_INIT_LOGS_SUCCESS:
      return state
        .set('logs', fromJS(action.payload.data.logs))
        .set('totalLogsCount', action.payload.data.total_count)
        .set('currentLogsPageNum', action.payload.pageNum)
        .set('loading', false)
        .set('error', '');

    case ACTIONS.FETCH_INIT_LOGS_FAILURE:
      return state
        .set('logs', fromJS([]))
        .set('loading', false)
        .set('error', action.payload.toString());

    case ACTIONS.FETCH_NEXT_LOGS_SUCCESS:
      return state
        .update('logs', logs => logs.merge(fromJS(action.payload.data.logs)))
        .set('totalLogsCount', action.payload.data.total_count)
        .set('currentLogsPageNum', action.payload.pageNum)
        .set('loading', false)
        .set('error', '');

    case ACTIONS.FETCH_NEXT_LOGS_FAILURE:
      return state.set('loading', false);

    default:
      return state;
  }
}
