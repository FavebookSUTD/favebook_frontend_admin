const ACTIONS = {
  FETCH_CLUSTER_STATS: '@pages/ClustersPage/FETCH_CLUSTER_STATS',
  FETCH_CLUSTER_STATS_SUCCESS: '@pages/ClustersPage/FETCH_CLUSTER_STATS_SUCCESS',
  FETCH_CLUSTER_STATS_FAILURE: '@pages/ClustersPage/FETCH_CLUSTER_STATS_FAILURE',
  START_SPARK_JOB: '@pages/ClustersPage/START_SPARK_JOB',
  START_SPARK_JOB_SUCCESS: '@pages/ClustersPage/START_SPARK_JOB_SUCCESS',
  START_SPARK_JOB_FAILURE: '@pages/ClustersPage/START_SPARK_JOB_FAILURE',
};

export default ACTIONS;

export const fetchClusterStats = () => ({
  type: ACTIONS.FETCH_CLUSTER_STATS,
});

export const startSparkJob = (clusterNum, job) => ({
  type: ACTIONS.START_SPARK_JOB,
  payload: { clusterNum, job },
});
