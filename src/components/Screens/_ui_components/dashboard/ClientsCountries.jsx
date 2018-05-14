import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BarChart } from 'react-d3-components';

import '../../../../styles/_layout.css';
import '../../../../styles/_dashboard.css';

import axios from '../../../Server';

class ClientsCountries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesChartData: {
        label: 'Clients country distribution',
        values: [{x: 'Guatemala', y: 60}, {x: 'USA', y: 40}]
      }
    }
    this.updateCountryInfo();
  }

  updateCountryInfo = async () => {
    try {
      let response = await axios.get('/countryinfo', {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('cbm_token')}
      });
      console.log(response);
      let countryData = response.data.data;
      let values = [];
      for (var i = 0; i < countryData.length; i++) {
        values.push({x: countryData[i].name, y: countryData[i].userCount})
      }
      this.state.countriesChartData.values = values;

      this.setState({
        countriesChartData: this.state.countriesChartData
      });
    }catch(error) {
      console.error(error)
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
