import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowClients extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        ShowClients
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(ShowClients);
