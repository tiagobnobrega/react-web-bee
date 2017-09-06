import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(){
    super();
    this.state={status:null};
  }

  componentDidMount(){
    axios.get("/health")
      .then((resp)=>{
        console.log(resp);
      })
      .catch((err)=>console.error('Error requesting status',err))
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <img src={process.env.PUBLIC_URL+"img/lais-transp.png"} alt="img"/>
      </div>
    );
  }
}

export default App;
