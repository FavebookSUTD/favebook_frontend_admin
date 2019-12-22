let backendURL;
let sparkURL;

if (process && process.env) {
  backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  sparkURL = process.env.REACT_APP_SPARK_URL || 'http://localhost:5000';
  console.log(process.env.REACT_APP_SPARK_URL);
}

const config = {
  logs: `${backendURL}/logs`,
  auth: {
    signIn: `${backendURL}/auth/login`,
    logout: `${backendURL}/auth/logout`,
  },
  books: {
    add: `${backendURL}/books/add`,
    history: `${backendURL}/books/add/history`,
    search: `${backendURL}/books/add/search`,
  },

};

export default config;
