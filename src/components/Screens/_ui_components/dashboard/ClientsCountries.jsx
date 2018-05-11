import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BarChart } from 'react-d3-components';

import '../../../../styles/_layout.css';
import '../../../../styles/_dashboard.css';

class ClientsCountries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesChartData: {
        label: 'Clients country distribution',
        values: [{x: 'Guatemala', y: 60}, {x: 'USA', y: 40}]
      }
    }
  }

  render() {
    return (
      <div className="dashboard-userpiechart-container">
        <div className="dashboard-titletoplabel">
          Clients countries
        </div>
        <BarChart
          data = { this.state.countriesChartData }
          width = { 400 }
          height = { 350 }
          margin={{top: 30, bottom: 50, left: 75, right: 75}}
        />
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(ClientsCountries);
