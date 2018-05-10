import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Row, Col } from 'react-bootstrap';

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
    this.state = {
      columns: [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'name',
        text: 'Name',
        filter: textFilter()
      }, {
        dataField: 'email',
        text: 'Email',
        filter: textFilter({caseSensitive: true})
      }, {
        dataField: 'handle',
        text: 'Twitter handle',
        filter: textFilter({caseSensitive: true})
      }, {
        dataField: 'tweets',
        text: 'Number of tweets'
      }, {
        dataField: 'mentions',
        text: 'Number of mentions'
      }],

      userTable: [
        {
          id: 0,
          name: "Juan Gonzalez",
          email: "jgonzalez@cusbromenlabs.com",
          handle: "jgonz",
          tweets: 2500,
          mentions: 54
        },

        {
          id: 1,
          name: "Erickkk Mendoza",
          email: "erickkk@cusbromenlabs.com",
          handle: "erickkk",
          tweets: 4500,
          mentions: 150
        },

        {
          id: 2,
          name: "El manco",
          email: "mancus@cusbromenlabs.com",
          handle: "manquete",
          tweets: 100,
          mentions: 2
        },
      ]
    }
  }

  render() {
    return (
      <div className="layout-scene-wrapper">
        <Grid>
          <Row>
            <Col xs={6} sm={6} md={6} lg={12}>
              <div className="updateclient-tablecontainer">
                <div className="updateclient-instr-title">
                  <b>Basic Twitter information:</b>
                  <hr />
                </div>
                <div className="updateclient-instr-text">
                  This is the basic Twitter information taken for each client that has a Twitter user.
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col xs={6} sm={6} md={6} lg={12}>
              <div className="updateclient-tablecontainer">
                <BootstrapTable
                  striped
                  hover
                  condensed
                  keyField='id'
                  data={ this.state.userTable }
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
