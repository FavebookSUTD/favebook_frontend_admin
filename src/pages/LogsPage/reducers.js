import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  logs: [],
  totalLogsCount: 0,
  currentLogsPageNum: 0,
  searchQuery: '',
  searchLogs: [],
  totalSearchLogsCount: 0,
  currentSearchLogsPageNum: 0,
  loading: false,
  error: '',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_INIT_LOGS:
    case ACTIONS.FETCH_NEXT_LOGS:
    case ACTIONS.SEARCH_LOGS:
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

    case ACTIONS.SEARCH_LOGS_SUCCESS:
      return state
        .set('searchQuery', action.payload.query)
        .update('searchLogs', logs => logs.merge(fromJS(action.payload.data.logs)))
        .set('totalSearchLogsCount', action.payload.data.total_count)
        .set('currentSearchLogsPageNum', action.payload.pageNum)
        .set('loading', false)
        .set('error', '');

    case ACTIONS.SEARCH_LOGS_FAILURE:
      return state.set('loading', false).set('error', action.payload.toString());

    case ACTIONS.RESET_SEARCH_LOGS:
      return state
        .set('searchQuery', '')
        .set('searchLogs', fromJS([]))
        .set('totalSearchLogsCount', 0)
        .set('currentSearchLogsPageNum', 0);

    default:
      return state;
  }
}
