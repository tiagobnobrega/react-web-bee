import React from 'react';
// import classnames from 'classnames';

// import './style.css';

export default class Home extends React.Component {
  static propTypes = {};
  static defaultProps = {};
  state = {};

  render() {
    const { ...props } = this.props;
    console.log("Home.js");
    return (
      <div>
        <h1>
         Home!!!
        </h1>
      </div>
    );
  }
}