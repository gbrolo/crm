import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import NavBar from './Navigation/NavBar';
import Dashboard from './Screens/Dashboard';
import AddClient from './Screens/Client/AddClient';
import UpdateClient from './Screens/Client/UpdateClient';
import ShowClients from './Screens/Info/ShowClients';
import ShowCatalogue from './Screens/Info/ShowCatalogue';
import Search from './Screens/Social/Search';
import ClientsTwitterInfo from './Screens/Social/ClientsTwitterInfo';

// Styles
import '../styles/_navigation-bar.css';
import '../styles/_layout.css';

// Screen view
const Main = () => (
  <div>
    <Switch>
      <Route exact path='/' render={() => (<Dashboard />)} />
      <Route path='/clients/add' render={() => (<AddClient />)} />
      <Route path='/clients/update' render={() => (<UpdateClient />)} />
      <Route path='/info/show/clients' render={() => (<ShowClients />)} />
      <Route path='/info/show/catalogue' render={() => (<ShowCatalogue />)} />
      <Route path='/social/clients-twitter' render={() => (<ClientsTwitterInfo />)} />
      <Route path='/social/search' render={() => (<Search />)} />
    </Switch>
  </div>
)

// Full container
class MainActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="layout-full">
        <div className="layout-navbar-container">
          <NavBar />
        </div>
        <div className="layout-screen-view">
          <Main />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(MainActivity);
