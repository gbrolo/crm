import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Row, Col, PageHeader, Image, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import overlayFactory from 'react-bootstrap-table2-overlay';
import paginationFactory from 'react-bootstrap-table2-paginator';

// Styles
import '../../../styles/_layout.css';
import '../../../styles/_buttons.css';
import '../../../styles/_updateclient.css';

import axios from '../../Server';


const RemoteAll = ({data, onTableChange, afterSaveCell, columns}) => (
  <div>
    <BootstrapTable
      striped
      hover
      condensed
      keyField="id"
      data={ data }
      columns={ columns }
      pagination={ paginationFactory() }
      onTableChange={ onTableChange }
      overlay={ overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.3)' }) }
    />
  </div>
);

RemoteAll.propTypes = {
  data: PropTypes.array.isRequired,
  onTableChange: PropTypes.func.isRequired
};

class ClientsTwitterInfo extends Component {
  constructor(props) {
    super(props);
    var twitterInfo = JSON.parse(localStorage.twitterInfo || null) || {};
    //localStorage.setItem('twitterInfo', null);
    var lastTweetsArray = [];

    var i = 0;
    twitterInfo.lastTweets.forEach(function(element) {
      var e = {
        id: i,
        tweet: element
      }

      lastTweetsArray.push(e);
      i = i + 1;
    });

    console.log('lastTweetsArray', lastTweetsArray);

    localStorage.setItem('twitterInfo', null);
    console.log('twitter info', twitterInfo);
    this.state = {
      tphotoLink: twitterInfo.profilePicture,
      tname: twitterInfo.userName,
      tfavs: twitterInfo.favs,
      ttweets: twitterInfo.totalTweets,
      tfollowers: twitterInfo.followers,
      tfollows: twitterInfo.following,
      tlasttweets: lastTweetsArray,

      searchText: '',
      tsearchResult: [],

      columns: [{
        dataField: 'id',
        text: 'id',
        hidden: true
      },{
        dataField: 'tweet',
        text: 'Tweets',
        filter: textFilter()
      }],

      searchResultCols: [{
        dataField: 'id',
        text: 'id',
        hidden: true
      },{
        dataField: 'tweet',
        text: 'Tweets'
      }],
    }
  }

  async searchQuery() {
      // Get twitter username
      var username = this.state.tname;
      var searchWord = this.state.searchText;

      // Query here
      try {
        let url = '/searchontweets?word='+searchWord+'&twitterUserName='+username;
        let response = await axios.get(url, {
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('cbm_token')}
        });

        // Display tweets
        var lastTweetsArray = [];
        var i = 0;
        response.data.data.forEach(function(element) {
            var e = {
                id: i,
                tweet: element
            };

            lastTweetsArray.push(e);
            i = i + 1;
        });

        this.setState({tsearchResult: lastTweetsArray});

      }catch(error) {
      }

    var x = document.getElementById('tw-results');
    x.style.display = "block";
  }

  async refreshTable() {
    // request and change state
  }

  render() {
    return (
      <div className="layout-scene-wrapper">
        <PageHeader className="layout-pageheader">
          {this.state.tname}
        </PageHeader>;
        <Grid>
          <Row>
            <Col xs={6} sm={6} md={6} lg={12}>
              <div className="updateclient-tablecontainer">

                <div className="updateclient-image">
                  <Image
                    className="updateclient-actual-image"
                    src={this.state.tphotoLink}
                    width={200}
                    height={200}
                    circle
                    responsive />
                </div>

                <div className="updateclient-instr-title" id="last">
                  <b>Favs:</b>
                  <hr />
                </div>
                <div className="updateclient-instr-text">
                  <b>{this.state.tfavs}</b> Favorites.
                </div>

                <div className="updateclient-instr-title" id="last">
                  <b>Tweets:</b>
                  <hr />
                </div>
                <div className="updateclient-instr-text">
                  <b>{this.state.ttweets}</b> Tweets.
                </div>

                <div className="updateclient-instr-title" id="last">
                  <b>Followers:</b>
                  <hr />
                </div>
                <div className="updateclient-instr-text">
                  <b>{this.state.tfollowers}</b> Followers.
                </div>

                <div className="updateclient-instr-title" id="last">
                  <b>Follows:</b>
                  <hr />
                </div>
                <div className="updateclient-instr-text">
                  <b>{this.state.tfollows}</b> Follows.
                </div>

              </div>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col xs={6} sm={6} md={6} lg={12}>
              <div className="updateclient-tablecontainer">
                <div className="updateclient-instr-title">
                  <b>Latest tweets</b>
                  <hr />
                </div>
                <BootstrapTable
                  striped
                  hover
                  condensed
                  keyField='id'
                  data={ this.state.tlasttweets }
                  columns ={this.state.columns}
                  filter={ filterFactory() }
                  pagination={ paginationFactory() }/>

                  <div className="layout-input-search-container">
                    <div className="updateclient-instr-title">
                      <b>Search tweets:</b>
                      <hr />
                    </div>
                    <FormGroup>
                       <InputGroup>
                         <FormControl type="text" placeholder="Search tweets here"
                         onChange={(event) => this.setState({searchText: event.target.value})}
                         required/>
                         <InputGroup.Button>
                            <Button onClick={() => this.searchQuery()}><b>Search</b></Button>
                         </InputGroup.Button>
                       </InputGroup>
                    </FormGroup>
                  </div>

                  <div className="layout-tw-results" id="tw-results">
                    <RemoteAll
                      data={ this.state.tsearchResult }
                      onTableChange={ this.refreshTable }
                      columns={ this.state.searchResultCols }
                    />
                  </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(ClientsTwitterInfo);
