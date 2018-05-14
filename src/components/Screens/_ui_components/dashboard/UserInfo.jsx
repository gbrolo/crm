import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PieChart } from 'react-d3-components';

import '../../../../styles/_layout.css';
import '../../../../styles/_dashboard.css';

import axios from '../../../Server';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sexChartData: {
        label: 'Client sex distribution',
        values: [{x: 'Men', y: 60}, {x: 'Women', y: 40}]
      },
      maleCount: 1,
      womenCount: 1,
      otherCount: 1,
    }
    // this.props.updateUserInfo = this.updateUserInfo;

    this.updateUserInfo();
  }

  updateUserInfo = async () => {
    try {
      let response = await axios.get('/usersinfo', {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('cbm_token')}
      });
      this.state.sexChartData.values = [
        {x: 'Men', y: response.data.data.maleCount},
        {x: 'Women', y: response.data.data.femaleCount},
        {x: 'Other', y: response.data.data.otherCount}];

      this.setState({
        sexChartData: this.state.sexChartData,
        maleCount: response.data.data.maleCount,
        womenCount: response.data.data.femaleCount,
        otherCount: response.data.data.otherCount
      });
    }catch(error) {
      console.error(error)
    }

  }

  render() {
    return (
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
          <b>Total clients: </b> {this.state.maleCount + this.state.womenCount}
        </div>
        <div className="dashboard-userinfo">
          <b>Men: </b> {this.state.maleCount}
        </div>
        <div className="dashboard-userinfo">
          <b>Woman: </b> {this.state.womenCount}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(UserInfo);
