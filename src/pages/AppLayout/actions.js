const ACTIONS = {
  TOGGLE_SIDER_OPEN_STATE: '@pages/AppLayout/TOGGLE_SIDER_OPEN_STATE',
};

export default ACTIONS;

export const toggleSiderOpenState = () => ({
  type: ACTIONS.TOGGLE_SIDER_OPEN_STATE,
});
