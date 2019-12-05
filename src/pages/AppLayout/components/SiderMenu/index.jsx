// import React
import React from 'react';
import PropTypes from 'prop-types';

// import lodash
import reverse from 'lodash/reverse';
import join from 'lodash/join';
import split from 'lodash/split';
import trim from 'lodash/trim';

// import utils
import { goto } from '@utils/goto';

// import local styling
import './index.scss';

// import Antd
import { Layout, Menu, Icon } from 'antd';

// Extract antd components
const { Sider } = Layout;
const { SubMenu } = Menu;

const SiderMenu = ({ path, siderOpenState, toggleSiderHandler }) => {
  const menuKeys = split(trim(path, '/'), '/');

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
        defaultOpenKeys={menuKeys}
        selectedKeys={trim(path, '/') ? menuKeys : ['logs']}
        onClick={({ keyPath }) => goto(`/${join(reverse(keyPath), '/')}`)}
      >
        <Menu.Item className="sider-menu-item" key="add-book">
          <Icon className="menu-icon" type="book" />
          <span>Add Books</span>
        </Menu.Item>
        <Menu.Item className="sider-menu-item" key="logs">
          <Icon className="menu-icon" type="bars" />
          <span>Logs</span>
        </Menu.Item>
        <Menu.Item className="sider-menu-item" key="clusters">
          <Icon className="menu-icon" type="cluster" />
          <span>Clusters</span>
        </Menu.Item>
        <SubMenu
          className="sider-submenu"
          key="analytics"
          title={
            <span className="sider-menu-item">
              <Icon className="menu-icon" type="bar-chart" />
              <span>Analytics</span>
            </span>
          }
        >
          <Menu.Item className="sider-menu-item" key="tfidf">
            <span>TFIDF</span>
          </Menu.Item>
          <Menu.Item className="sider-menu-item" key="pearson">
            <span>Pearson</span>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

SiderMenu.propTypes = {
  path: PropTypes.string.isRequired,
  siderOpenState: PropTypes.bool.isRequired,
  toggleSiderHandler: PropTypes.func.isRequired,
};

export default SiderMenu;
