// import React
import React from 'react';
import PropTypes from 'prop-types';

// import utils
import { goto } from '@utils/goto';

// import local styling
import './index.scss';

// import Antd
import { Layout, Menu, Icon } from 'antd';

// Extract antd components
const { Sider } = Layout;

const SiderMenu = ({ siderOpenState, toggleSiderHandler }) => {
  return (
    <Sider
      className="sider-menu__container"
      theme="dark"
      trigger={null}
      collapsible
      collapsed={!siderOpenState}
      breakpoint="xl"
      onBreakpoint={broken => {
        if (siderOpenState && broken) {
          toggleSiderHandler();
        }
      }}
    >
      <Menu
        className="sider-menu"
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['logs']}
        onClick={({ key }) => goto(key)}
      >
        <Menu.Item className="sider-menu-item" key="logs">
          <Icon className="menu-icon" type="bars" />
          <span>Logs</span>
        </Menu.Item>
        <Menu.Item className="sider-menu-item" key="clusters">
          <Icon className="menu-icon" type="cluster" />
          <span>Clusters</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

SiderMenu.propTypes = {
  siderOpenState: PropTypes.bool.isRequired,
  toggleSiderHandler: PropTypes.func.isRequired,
};

export default SiderMenu;
