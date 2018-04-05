import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom'

import Home from './Screens/Home';

const Main = () => (
  <div>
    <Switch>
      <Route exact path='/' render={() => (<Home/>)} />
    </Switch>
  </div>
)

class MainActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <div>
          <Main />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(MainActivity);
