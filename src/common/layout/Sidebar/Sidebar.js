import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { slide as Menu } from 'react-burger-menu';

class AppSidebar extends React.Component {
  doNotNavigate(event) {
    event.preventDefault();
    alert('Should not change context!');
  }

  render() {
    const { ...props } = this.props;
    return (
      <Menu>
        <Link className="menu-item" to="/home">
          Home
        </Link>
        <Link className="menu-item" to="/about">
          About
        </Link>
        <Link className="menu-item" to="/employee">
          Employees
        </Link>
        <Link className="menu-item" to="/notDefinedRoute">
          Not Found
        </Link>
        <a onClick={this.doNotNavigate} className="menu-item--small" href="">
          No Navigation
        </a>
        <button
          onClick={() => props.changePage('home')}
          className="menu-item--small"
        >
          Home via redux
        </button>
      </Menu>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: route => push(`/${route}`),
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AppSidebar);
