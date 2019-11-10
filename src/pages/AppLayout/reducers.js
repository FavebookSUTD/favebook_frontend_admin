import { fromJS } from 'immutable';
import ACTIONS from './actions';

export const initialState = fromJS({
  siderOpenState: true,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_SIDER_OPEN_STATE:
      return state.update('siderOpenState', openState => !openState);

    default:
      return state;
  }
}
