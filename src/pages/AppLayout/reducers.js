import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  siderOpenState: true,
  user: {},
  loading: false,
  error: '',
  prevPath: '',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_SIDER_OPEN_STATE:
      return state.update('siderOpenState', openState => !openState);

    case ACTIONS.LOGIN_FROM_STORAGE:
      return state.set('loading', true);

    case ACTIONS.LOGIN_FROM_STORAGE_SUCCESS:
      return state.set('user', fromJS(action.payload)).set('loading', false);

    case ACTIONS.LOGIN_FROM_STORAGE_FAILURE:
      return state.set('loading', false).set('user', fromJS({}));

    case ACTIONS.LOAD_PREV_PATH:
      return state.set('prevPath', action.payload);

    case ACTIONS.CLEAR_PREV_PATH:
      return state.set('prevPath', '');

    default:
      return state;
  }
}
