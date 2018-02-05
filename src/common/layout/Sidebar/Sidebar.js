import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Sidebar, Menu, Segment, Icon } from 'semantic-ui-react';

const menuItems = [
  { name: 'home', label: 'Home', to: '/home', iconName: 'home' },
  { name: 'about', label: 'About', to: '/about' },
  { name: 'employee', label: 'Employee', to: '/employee' },
  { name: 'notDefined', label: 'Not Defined', to: '/notDefined' },
];

class AppSidebar extends Component {
  render() {
    const { visible, children } = this.props;
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="scale down"
          width="thin"
          visible={visible}
          icon="labeled"
          vertical
          inverted
        >
          {menuItems.map(e => (
            <Menu.Item as={Link} to={e.to || ''} key={e.name}>
              {e.icon && <Icon name={e.iconName} />}
              {e.label}
            </Menu.Item>
          ))}
        </Sidebar>
        <Sidebar.Pusher>{children}</Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: route => push(`${route}`),
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AppSidebar);
