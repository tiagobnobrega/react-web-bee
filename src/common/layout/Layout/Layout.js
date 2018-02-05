import React, { Component } from 'react';
import './Layout.css';
import Sidebar from 'common/layout/Sidebar/Sidebar';
import Header from 'common/layout/Header/Header';

const Layout = ({ children }) => (
  <div className="App" id="app-outer-container">
    <Sidebar />
    <div className="app-content-container">
      <Header />
      <main>{children}</main>
    </div>
  </div>
);

export default Layout;
