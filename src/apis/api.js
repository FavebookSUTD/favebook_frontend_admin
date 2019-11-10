import axios from 'axios';
import queryString from 'querystring';

const buildHeader = headers => {
  return {
    Accept: 'application/json, text/html',
    'Content-Type': 'application/json',
    ...headers,
  };
};

const request = (props, method) => {
  const { url, needAuthenticate, headers, query, body } = props;

  const strQuery = queryString.stringify(query);
  const apiURL = `${url}?${strQuery}`;

  const configureJWT = headers => {
    if (needAuthenticate) {
      const { access_token } = JSON.parse(window.sessionStorage.getItem('user'));
      return {
        ...headers,
        Authorization: `Bearer ${access_token}`,
      };
    }
    return headers;
  };

  const handleResponse = response => {
    return response.data;
  };

  const handleError = error => {
    return Promise.reject(error);
  };

  const axiosOptions = {
    url: apiURL,
    method,
    // withCredentials: needAuthenticate,
    headers: buildHeader(configureJWT(headers)),
    data: body,
  };

  return axios(axiosOptions)
    .then(response => handleResponse(response))
    .catch(error => handleError(error));
};

const API = {
  get: props => request(props, 'GET'),
  post: props => request(props, 'POST'),
  put: props => request(props, 'PUT'),
  delete: props => request(props, 'DELETE'),
};

export default API;
