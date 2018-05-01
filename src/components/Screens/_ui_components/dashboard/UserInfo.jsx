import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PieChart } from 'react-d3-components';

import '../../../../styles/_layout.css';
import '../../../../styles/_dashboard.css';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sexChartData: {
        label: 'Client sex distribution',
        values: [{x: 'Men', y: 60}, {x: 'Women', y: 40}]
      }
    }
  }

  render() {
    return (
      <div>
        <div className="dashboard-userpiechart-container">
          <div className="dashboard-titletoplabel">
            Clients info
          </div>
          <PieChart
            data = { this.state.sexChartData }
            width = { 400 }
            height = { 250 }
            margin={{top: 10, bottom: 10, left: 75, right: 75}}
            sort = { null }
          />
          <div className="dashboard-userinfo">
            <b>Total clients: </b> 100
          </div>
          <div className="dashboard-userinfo">
            <b>Men: </b> 60
          </div>
          <div className="dashboard-userinfo">
            <b>Woman: </b> 40
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(UserInfo);
