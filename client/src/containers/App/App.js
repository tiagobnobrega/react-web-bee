import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import './style.css';
import Sidebar from './Sidebar';
import Header from './Header';
import axios from 'axios';

import NotFound from '../NotFound';
import Home from '../Home';
import About from '../About';

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
      .catch((err)=>console.error('Error  requesting status node server might not be running' ,err))
  }

  render() {
    const { ...props } = this.props;
    console.log("App.js");
    return (
      <div className="App" id="app-outer-container">
        <Sidebar />
        <div className="app-content-container">
          <Header />
          <main>
            <Switch>
              <Route exact path="/home"  component={Home}/>
              <Route exact path="/about" component={About}/>

              <Redirect exact from="/" to="/home"/>
              <Route component={NotFound}/>
            </Switch>
          </main>
        </div>

      </div>
    );
  }
}

export default App;