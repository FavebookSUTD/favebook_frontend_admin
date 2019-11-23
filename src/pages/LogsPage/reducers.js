import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  logs: {},
  totalLogsCount: 0,
  searchQuery: '',
  searchLogs: {},
  totalSearchLogsCount: 0,
  currentPageNum: 1,
  pageSize: 50,
  loading: false,
  error: '',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_LOGS:
    case ACTIONS.SEARCH_LOGS:
      return state.set('loading', true).set('currentPageNum', action.payload.pageNum);

    case ACTIONS.FETCH_LOGS_SUCCESS:
      return state
        .setIn(['logs', action.payload.pageNum], fromJS(action.payload.data.logs))
        .set('totalLogsCount', action.payload.data.total_count)
        .set('loading', false)
        .set('error', '');

    case ACTIONS.FETCH_LOGS_FAILURE:
      return state.set('loading', false).set('error', action.payload.toString());

    case ACTIONS.SEARCH_LOGS_SUCCESS:
      return state
        .set('searchQuery', action.payload.query)
        .setIn(['searchLogs', action.payload.pageNum], fromJS(action.payload.data.logs))
        .set('totalSearchLogsCount', action.payload.data.total_count)
        .set('loading', false)
        .set('error', '');

    case ACTIONS.SEARCH_LOGS_FAILURE:
      return state.set('loading', false).set('error', action.payload.toString());

    case ACTIONS.RESET_SEARCH_LOGS:
      return state
        .set('searchQuery', '')
        .set('searchLogs', fromJS({}))
        .set('totalSearchLogsCount', 0)
        .set('currentPageNum', 1);

    default:
      return state;
  }
}
