import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Row, Col, Tab, Nav, NavItem, PageHeader } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

// Styles
import '../../../styles/_layout.css';
import '../../../styles/_buttons.css';
import '../../../styles/_updateclient.css';

class ShowCatalogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstColumns: [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'name',
        text: 'Name',
        filter: textFilter()
      }],

      secondColumns: [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'name',
        text: 'Name',
        filter: textFilter()
      }],

      thirdColumns: [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'name',
        text: 'Name',
        filter: textFilter()
      }],

      fourthColumns: [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'name',
        text: 'Name',
        filter: textFilter()
      }],

      firstTable: [
        {
          id: 0,
          name: "product 1 table 1 name"
        },
        {
          id: 1,
          name: "product 2 table 1 name"
        },
        {
          id: 2,
          name: "product 3 table 1 name"
        }
      ],

      secondTable: [
        {
          id: 0,
          name: "product 1 table 2 name"
        },
        {
          id: 1,
          name: "product 2 table 2 name"
        },
        {
          id: 2,
          name: "product 3 table 2 name"
        }
      ],

      thirdTable: [
        {
          id: 0,
          name: "product 1 table 3 name"
        },
        {
          id: 1,
          name: "product 2 table 3 name"
        },
        {
          id: 2,
          name: "product 3 table 3 name"
        }
      ],

      fourthTable: [
        {
          id: 0,
          name: "product 1 table 4 name"
        },
        {
          id: 1,
          name: "product 2 table 4 name"
        },
        {
          id: 2,
          name: "product 3 table 4 name"
        }
      ]
    }
  }

  showTable(toShow) {
    var cat1 = document.getElementById("cat-1");
    var cat2 = document.getElementById("cat-2");
    var cat3 = document.getElementById("cat-3");
    var cat4 = document.getElementById("cat-4");

    if (toShow === 1) {
      cat1.style.display = "block";
      cat2.style.display = "none";
      cat3.style.display = "none";
      cat4.style.display = "none";
    } else if (toShow === 2) {
      cat1.style.display = "none";
      cat2.style.display = "block";
      cat3.style.display = "none";
      cat4.style.display = "none";
    } else if (toShow === 3) {
      cat1.style.display = "none";
      cat2.style.display = "none";
      cat3.style.display = "block";
      cat4.style.display = "none";
    } else if (toShow === 4) {
      cat1.style.display = "none";
      cat2.style.display = "none";
      cat3.style.display = "none";
      cat4.style.display = "block";
    }
  }

  render() {
    return (
      <div className="layout-scene-wrapper">
        <PageHeader className="layout-pageheader">
          Catalogue
        </PageHeader>;
        <Grid>
          <Row>
            <Col xs={6} sm={6} md={6} lg={12}>
              <div className="updateclient-tablecontainer">
                <div className="updateclient-instr-title">
                  <b>Catalogue tables:</b>
                  <hr />
                </div>
                <div className="updateclient-instr-text">
                  Select one of the 4 catalogue tables and filter each column in the table by a search query per colum.
                </div>
                <div className="updateclient-buttons-container">
                  <div className="updateclient-buttons-container" id="left">
                     <Button
                        className="button-size-sm button-prim"
                        onClick={ () => this.showTable(1) }
                        block>
                          Table 1
                      </Button>
                  </div>
                  <div className="updateclient-buttons-container" id="left">
                     <Button
                        className="button-size-sm button-prim"
                        onClick={ () => this.showTable(2) }
                        block>
                          Table 2
                      </Button>
                  </div>
                  <div className="updateclient-buttons-container" id="left">
                     <Button
                        className="button-size-sm button-prim"
                        onClick={ () => this.showTable(3) }
                        block>
                          Table 3
                      </Button>
                  </div>
                  <div className="updateclient-buttons-container" id="left">
                     <Button
                        className="button-size-sm button-prim"
                        onClick={ () => this.showTable(4) }
                        block>
                          Table 4
                      </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>

        <Grid id="cat-1" className="updateclient-cat-initial-first">
          <Row>
            <Col xs={6} sm={6} md={6} lg={12}>
              <div className="updateclient-tablecontainer">
                <div className="updateclient-instr-title">
                  <b>Table 1:</b>
                  <hr id="cat"/>
                </div>
                <BootstrapTable
                  striped
                  hover
                  condensed
                  keyField='id'
                  data={ this.state.firstTable }
                  columns ={this.state.firstColumns}
                  filter={ filterFactory() }
                  pagination={ paginationFactory() }/>
              </div>
            </Col>
          </Row>
        </Grid>

        <Grid id="cat-2" className="updateclient-cat-initial">
          <Row>
            <Col xs={6} sm={6} md={6} lg={12}>
              <div className="updateclient-tablecontainer">
                <div className="updateclient-instr-title">
                  <b>Table 2:</b>
                  <hr id="cat"/>
                </div>
                <BootstrapTable
                  striped
                  hover
                  condensed
                  keyField='id'
                  data={ this.state.secondTable }
                  columns ={this.state.secondColumns}
                  filter={ filterFactory() }
                  pagination={ paginationFactory() }/>
              </div>
            </Col>
          </Row>
        </Grid>

        <Grid id="cat-3" className="updateclient-cat-initial">
          <Row>
            <Col xs={6} sm={6} md={6} lg={12}>
              <div className="updateclient-tablecontainer">
                <div className="updateclient-instr-title">
                  <b>Table 3:</b>
                  <hr id="cat"/>
                </div>
                <BootstrapTable
                  striped
                  hover
                  condensed
                  keyField='id'
                  data={ this.state.thirdTable }
                  columns ={this.state.thirdColumns}
                  filter={ filterFactory() }
                  pagination={ paginationFactory() }/>
              </div>
            </Col>
          </Row>
        </Grid>

        <Grid id="cat-4" className="updateclient-cat-initial">
          <Row>
            <Col xs={6} sm={6} md={6} lg={12}>
              <div className="updateclient-tablecontainer">
                <div className="updateclient-instr-title">
                  <b>Table 4:</b>
                  <hr id="cat"/>
                </div>
                <BootstrapTable
                  striped
                  hover
                  condensed
                  keyField='id'
                  data={ this.state.fourthTable }
                  columns ={this.state.fourthColumns}
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
export default connect(mapStateToProps, null)(ShowCatalogue);
