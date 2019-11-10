// import React
import React from 'react';
import PropTypes from 'prop-types';

// import local styling
import './index.scss';

// import Antd
import { Layout, Menu, Icon } from 'antd';

// Extract antd components
const { Sider } = Layout;

const SiderMenu = ({ siderOpenState, toggleSiderHandler }) => {
  return (
    <Layout className="sider-menu__container" hasSider>
      <Sider
        className="sider-menu__content"
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
        <Menu className="sider-menu" theme="dark" mode="inline" defaultSelectedKeys={['logs']}>
          <Menu.Item key="logs">
            <Icon className="menu-icon" type="bars" />
            <span>Logs</span>
          </Menu.Item>
          <Menu.Item key="clusters">
            <Icon className="menu-icon" type="cluster" />
            <span>Clusters</span>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

SiderMenu.propTypes = {
  siderOpenState: PropTypes.bool.isRequired,
  toggleSiderHandler: PropTypes.func.isRequired,
};

export default SiderMenu;
