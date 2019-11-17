import { select, selectToJS } from '@utils/selectorUtils';
import { initialState } from './reducers';
import { createSelector } from 'reselect';

const selectAppLayout = state => state.get('AppLayout', initialState);

const selectSiderOpenState = select(selectAppLayout, 'siderOpenState');

const selectUserInfo = selectToJS(selectAppLayout, 'user');

const selectLoggedIn = createSelector(
  selectAppLayout,
  state => {
    const user = state.get('user').toObject();
    const { username, access_token } = user;
    return !!username && !!access_token;
  },
);

const selectLoading = select(selectAppLayout, 'loading');

const selectError = select(selectAppLayout, 'error');

export { selectSiderOpenState, selectUserInfo, selectLoggedIn, selectLoading, selectError };
