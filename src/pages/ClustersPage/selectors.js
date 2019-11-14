import { select, selectToJS } from '@utils/selectorUtils';
import { initialState } from './reducers';

const selectClustersPage = state => state.get('ClustersPage', initialState);

const selectLoading = select(selectClustersPage, 'loading');

const selectError = select(selectClustersPage, 'error');

const selectClusters = selectToJS(selectClustersPage, 'clusters');

const selectTotalClusterNum = select(selectClustersPage, 'totalClusterNum');

export { selectLoading, selectError, selectClusters, selectTotalClusterNum };
