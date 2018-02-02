import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './style.css';
import Sidebar from './Sidebar';
import Header from './Header';
import axios from 'axios';

import NotFound from '../../containers/NotFound';
import Home from '../../containers/Home';
import About from '../../containers/About';
import EmployeesList from '../../containers/Employees/List';
import EmployeesEdit from '../../containers/Employees/Edit';
import EmployeesAdd from '../../containers/Employees/Add';

class App extends Component {
  constructor() {
    super();
    this.state = { status: null };
  }

  componentDidMount() {
    axios
      .get('/health')
      .then(resp => {
        console.log(resp);
      })
      .catch(err =>
        console.error(
          'Error  requesting status node server might not be running',
          err
        )
      );
  }

  render() {
    return (
      <div className="App" id="app-outer-container">
        <Sidebar />
        <div className="app-content-container">
          <Header />
          <main>
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/employee" component={EmployeesList} />
              <Route exact path="/employee/add" component={EmployeesAdd} />
              <Route exact path="/employee/:id" component={EmployeesEdit} />

              <Redirect exact from="/" to="/home" />
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
