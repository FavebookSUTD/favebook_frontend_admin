import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  TFITF: {},
  totalTFITFCount: 0,
  searchQuery: {},
  searchTFITF: {},
  totalSearchTFITFCount: 0,
  currentPageNum: 1,
  pageSize: 50,
  loading: false,
  error: '',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_TFITF:
    case ACTIONS.SEARCH_TFITF:
      return state.set('loading', true).set('currentPageNum', action.payload.pageNum);

    case ACTIONS.FETCH_TFITF_SUCCESS:
      return state
        .setIn(['TFITF', action.payload.pageNum], fromJS(action.payload.data.reviews))
        .set('totalTFITFCount', action.payload.data.totalCount)
        .set('loading', false)
        .set('error', '');

    case ACTIONS.FETCH_TFITF_FAILURE:
      return state.set('loading', false).set('error', action.payload.toString());

    case ACTIONS.SEARCH_TFITF_SUCCESS:
      return state
        .set('searchQuery', fromJS(action.payload.query))
        .setIn(['searchTFITF', action.payload.pageNum], fromJS(action.payload.data.reviews))
        .set('totalSearchTFITFCount', action.payload.data.totalCount)
        .set('loading', false)
        .set('error', '');

    case ACTIONS.SEARCH_TFITF_FAILURE:
      return state.set('loading', false).set('error', action.payload.toString());

    case ACTIONS.RESET_SEARCH_TFITF:
      return state
        .set('searchQuery', fromJS({}))
        .set('searchTFITF', fromJS({}))
        .set('totalSearchTFITFCount', 0)
        .set('currentPageNum', 1);

    default:
      return state;
  }
}
