import api from '@apis/api';
import apiConfig from '@apis/apiConfig';

export function signInFromAPI({ payload }) {
  const { username, password } = payload;

  return api
    .post({
      url: apiConfig.auth.signIn,
      body: { username, password },
    })
    .then(response => {
      window.sessionStorage.setItem('user', JSON.stringify(response.data));
      return response;
    });
}
