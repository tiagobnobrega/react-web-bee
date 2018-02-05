import React, { Component } from 'react';
import './style.css';
import Sidebar from 'common/layout/Sidebar/Sidebar';
import Header from 'common/layout/Header/Header';

class Layout extends Component {
  state = { sidebarVisible: false };

  toggleMenu = () => {
    this.setState({ sidebarVisible: !this.state.sidebarVisible });
  };

  render() {
    const { sidebarVisible } = this.state;
    const { children } = this.props;
    return (
      <div className="App" id="app-outer-container">
        <Header
          onToggleMenu={this.toggleMenu}
          sidebarVisible={sidebarVisible}
        />
        <Sidebar visible={sidebarVisible}>{children}</Sidebar>
      </div>
    );
  }
}
export default Layout;
