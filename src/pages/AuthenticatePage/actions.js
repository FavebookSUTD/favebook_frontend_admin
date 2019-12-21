const ACTIONS = {
  SIGNIN_FROM_API: '@pages/AuthenticatePage/SIGNIN_FROM_API',
  SIGNIN_FROM_API_SUCCESS: '@pages/AuthenticatePage/SIGNIN_FROM_API_SUCCESS',
  SIGNIN_FROM_API_FAILURE: '@pages/AuthenticatePage/SIGNIN_FROM_API_FAILURE',
};

export default ACTIONS;

export const signInFromAPI = (username, password) => ({
  type: ACTIONS.SIGNIN_FROM_API,
  payload: { username, password },
});
