import { select, selectToJS } from '@utils/selectorUtils';
import { initialState } from './reducers';

const selectClustersPage = state => state.get('ClustersPage', initialState);

export {};
