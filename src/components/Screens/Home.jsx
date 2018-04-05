import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        Home
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(Home);
