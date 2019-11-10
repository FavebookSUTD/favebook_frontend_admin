import { select } from '@utils/selectorUtils';
import { initialState } from './reducers';

const selectAppLayout = state => state.get('AppLayout', initialState);

const selectSiderOpenState = select(selectAppLayout, 'siderOpenState');

export { selectSiderOpenState };
