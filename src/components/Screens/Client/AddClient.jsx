import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        AddClient
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(AddClient);
