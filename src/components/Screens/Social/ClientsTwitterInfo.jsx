import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Row, Col, PageHeader, Image } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

// Styles
import '../../../styles/_layout.css';
import '../../../styles/_buttons.css';
import '../../../styles/_updateclient.css';

class ClientsTwitterInfo extends Component {
  constructor(props) {
    super(props);
    var twitterInfo = JSON.parse(localStorage.twitterInfo || null) || {};
    localStorage.setItem('twitterInfo', null);
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

      columns: [{
        dataField: 'id',
        text: 'id',
        hidden: true
      },{
        dataField: 'tweet',
        text: 'Tweets',
        filter: textFilter()
      }],
    }
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
