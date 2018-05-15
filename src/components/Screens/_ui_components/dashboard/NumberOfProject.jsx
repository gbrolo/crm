import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BarChart } from 'react-d3-components';

import '../../../../styles/_layout.css';
import '../../../../styles/_dashboard.css';

import axios from '../../../Server';

class NumberOfProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectsChartData: {
                label: 'Number of projects on CRM',
                values: [{x: 'Projects', y: 0}]
            }
        }
        this.updateProjectsInfo();
    }

    updateProjectsInfo = async () => {
        let url = '/projects?count=25';
        try {
            let response = await axios.get(url, {
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('cbm_token')}
            });

            console.log(response);

            let countryData = response.data.data;
            let values = [];
            for (var i = 0; i < countryData.length; i++) {
                values.push({x: 'Projects', y: response.data.count})
            }
            this.state.projectsChartData.values = values;

            this.setState({
                wordsChartData: this.state.projectsChartData
            });
        }catch(error) {
            console.error(error)
        }

    }

    render() {
        return (
            <div className="dashboard-userpiechart-container">
                <div className="dashboard-titletoplabel">
                    Total number of projects
                </div>
                <BarChart
                    data = { this.state.projectsChartData }
                    width = { 400 }
                    height = { 350 }
                    margin={{top: 30, bottom: 50, left: 75, right: 75}}
                />
            </div>
        )
    }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(NumberOfProject);
