import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BarChart } from 'react-d3-components';

import '../../../../styles/_layout.css';
import '../../../../styles/_dashboard.css';

import axios from '../../../Server';

class MostUsedWords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordsChartData: {
                label: 'Most used words on tweets',
                values: [{x: 'this', y: 60}, {x: 'de', y: 40}]
            }
        }
        this.updateWordsInfo();
    }

    updateWordsInfo = async () => {
        try {
            // Query the words
            let url = '/mostusedwords?count=10';
            let response = await axios.get(url, {
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('cbm_token')}
            });

            let tweetData = response.data.data;
            let values = [];
            for (var i = 0; i < tweetData.length; i++) {
                values.push({x: tweetData[i].key, y: tweetData[i].value})
            }
            this.state.wordsChartData.values = values;

            this.setState({
                wordsChartData: this.state.wordsChartData
            });
        }catch(error) {
            console.error(error)
        }

    }

    render() {
        return (
            <div className="dashboard-userpiechart-container">
                <div className="dashboard-titletoplabel">
                    Most used words on tweets
                </div>
                <BarChart
                    data = { this.state.wordsChartData }
                    width = { 400 }
                    height = { 350 }
                    margin={{top: 30, bottom: 50, left: 75, right: 75}}
                />
            </div>
        )
    }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(MostUsedWords);
