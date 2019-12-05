let backendURL;
let sparkURL;

if (process && process.env) {
  backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  sparkURL = process.env.REACT_APP_SPARK_URL || 'http://localhost:5000';
}

const config = {
  logs: `${backendURL}/logs`,
  auth: {
    signIn: `${backendURL}/auth/login`,
    logout: `${backendURL}/auth/logout`,
  },
  analytics: {
    jobStatus: `${sparkURL}/analytics/status`,
    tfidf: `${sparkURL}/analytics/tfidf_result`,
    pearson: `${sparkURL}/analytics/pearson_result`,
    sparkJob: `${sparkURL}/analytics/start`,
    clusterHealth: `${sparkURL}/analytics/cluster_health`,
  },
};

export default config;
