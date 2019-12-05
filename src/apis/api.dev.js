const config = {
  logs: 'http://localhost:5000/logs',
  auth: {
    signIn: 'http://localhost:5000/auth/login',
    logout: 'http://localhost:5000/auth/logout',
  },
  analytics: {
    jobStatus: 'http://localhost:5000/analytics/status',
    tfidf: 'http://localhost:5000/analytics/tfidf_result',
    pearson: 'http://localhost:5000/analytics/pearson_result',
    sparkJob: 'http://localhost:5000/analytics/start',
    clusterHealth: 'http://localhost:5000/analytics/cluster_health',
  },
};

export default config;
