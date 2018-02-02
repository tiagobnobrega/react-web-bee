import React from 'react';
import "./style.css";
import logo from './logo.svg';

export default class Header extends React.Component{

  doNotNavigate (event) {
    event.preventDefault();
    alert("Should not change context!");
  }


  render () {
    return (
      <div className="app-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }
};