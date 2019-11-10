// import React
import React from 'react';
import PropTypes from 'prop-types';

// import local styling
import './index.scss';

// import Antd
import { Layout, Icon, Typography } from 'antd';

// Extract antd components
const { Header } = Layout;
const { Title } = Typography;

const HeaderMenu = ({ siderOpenState, toggleSiderHandler }) => {
  return (
    <Header className="header-menu__container">
      <Icon
        className="hambuger-icon"
        type={siderOpenState ? 'menu-fold' : 'menu-unfold'}
        onClick={toggleSiderHandler}
      />
      <Title className="app-name">Favebook</Title>
    </Header>
  );
};

HeaderMenu.propTypes = {
  siderOpenState: PropTypes.bool.isRequired,
  toggleSiderHandler: PropTypes.func.isRequired,
};

export default HeaderMenu;
