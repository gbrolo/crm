import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PieChart } from 'react-d3-components';

import UserInfo from './_ui_components/dashboard/UserInfo';

import '../../styles/_layout.css';
import '../../styles/_dashboard.css';

class Dashboard extends Component {
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
      <div className="layout-scene-wrapper">
        <UserInfo />
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(Dashboard);
