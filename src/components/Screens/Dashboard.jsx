import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PieChart } from 'react-d3-components';
import { PageHeader } from 'react-bootstrap';

import UserInfo from './_ui_components/dashboard/UserInfo';
import ClientsCountries from './_ui_components/dashboard/ClientsCountries';

import '../../styles/_layout.css';
import '../../styles/_dashboard.css';
import MostUsedWords from "./_ui_components/dashboard/MostUsedWords";
import NumberOfProjects from "./_ui_components/dashboard/NumberOfProject";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="layout-scene-wrapper">
        <PageHeader className="layout-pageheader">
          Dashboard
        </PageHeader>;
        <UserInfo />
        <ClientsCountries />
        <MostUsedWords />
        <NumberOfProjects />
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(Dashboard);
