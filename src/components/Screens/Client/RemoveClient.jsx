import React, { Component } from 'react';
import { connect } from 'react-redux';

class RemoveClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        RemoveClient
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(RemoveClient);
