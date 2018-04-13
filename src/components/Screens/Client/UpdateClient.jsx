import React, { Component } from 'react';
import { connect } from 'react-redux';

class UpdateClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        UpdateClient
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(UpdateClient);
