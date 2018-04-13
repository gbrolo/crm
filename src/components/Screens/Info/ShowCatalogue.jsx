import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowCatalogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        ShowCatalogue
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(ShowCatalogue);
