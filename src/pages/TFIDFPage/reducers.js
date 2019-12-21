import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  TFIDFJobStatus: 'running',
  TFIDF: {},
  totalTFIDFCount: 0,
  searchQuery: {},
  searchTFIDF: {},
  totalSearchTFIDFCount: 0,
  currentPageNum: 1,
  pageSize: 50,
  loading: false,
  error: '',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_TFIDF_JOB_STATUS:
      return state.set('TFIDFJobStatus', 'running').set('loading', true);

    case ACTIONS.FETCH_TFIDF:
    case ACTIONS.SEARCH_TFIDF:
      return state.set('loading', true).set('currentPageNum', action.payload.pageNum);

    case ACTIONS.FETCH_TFIDF_JOB_STATUS_SUCCESS:
      return state
        .set('TFIDFJobStatus', action.payload.data.status)
        .set('loading', false)
        .set('error', '');

    case ACTIONS.FETCH_TFIDF_JOB_STATUS_FAILURE:
      return state
        .set('TFIDFJobStatus', 'fail')
        .set('loading', false)
        .set('error', action.payload.toString());

    case ACTIONS.FETCH_TFIDF_SUCCESS:
      return state
        .setIn(['TFIDF', action.payload.pageNum], fromJS(action.payload.data.reviews))
        .set('totalTFIDFCount', action.payload.data.totalCount)
        .set('loading', false)
        .set('error', '');

    case ACTIONS.FETCH_TFIDF_FAILURE:
      return state.set('loading', false).set('error', action.payload.toString());

    case ACTIONS.SEARCH_TFIDF_SUCCESS:
      return state
        .set('searchQuery', fromJS(action.payload.query))
        .setIn(['searchTFIDF', action.payload.pageNum], fromJS(action.payload.data.reviews))
        .set('totalSearchTFIDFCount', action.payload.data.totalCount)
        .set('loading', false)
        .set('error', '');

    case ACTIONS.SEARCH_TFIDF_FAILURE:
      return state.set('loading', false).set('error', action.payload.toString());

    case ACTIONS.RESET_SEARCH_TFIDF:
      return state
        .set('searchQuery', fromJS({}))
        .set('searchTFIDF', fromJS({}))
        .set('totalSearchTFIDFCount', 0)
        .set('currentPageNum', 1);

    default:
      return state;
  }
}
