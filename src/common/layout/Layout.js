import React, { Component } from 'react';
import './style.css';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => (
  <div className="App" id="app-outer-container">
    <Sidebar />
    <div className="app-content-container">
      <Header />
      <main>{this.props.children}</main>
    </div>
  </div>
);

export default Layout;
