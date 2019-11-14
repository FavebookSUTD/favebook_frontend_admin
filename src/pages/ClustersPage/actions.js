const ACTIONS = {
  FETCH_CLUSTER_STATS: '@pages/ClustersPage/FETCH_CLUSTER_STATS',
  FETCH_CLUSTER_STATS_SUCCESS: '@pages/ClustersPage/FETCH_CLUSTER_STATS_SUCCESS',
  FETCH_CLUSTER_STATS_FAILURE: '@pages/ClustersPage/FETCH_CLUSTER_STATS_FAILURE',
  UPDATE_CLUSTER: '@pages/ClustersPage/UPDATE_CLUSTER',
  UPDATE_CLUSTER_SUCCESS: '@pages/ClustersPage/UPDATE_CLUSTER_SUCCESS',
  UPDATE_CLUSTER_FAILURE: '@pages/ClustersPage/UPDATE_CLUSTER_FAILURE',
};

export default ACTIONS;

export const fetchClusterStats = () => ({
  type: ACTIONS.FETCH_CLUSTER_STATS,
});

export const updateCluster = clusterNum => ({
  type: ACTIONS.UPDATE_CLUSTER,
  payload: { clusterNum },
});
