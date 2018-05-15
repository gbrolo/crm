import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Row, Col, Tab, Nav, NavItem, PageHeader } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

import overlayFactory from 'react-bootstrap-table2-overlay';


// Styles
import '../../../styles/_layout.css';
import '../../../styles/_buttons.css';
import '../../../styles/_updateclient.css';


import axios from '../../Server';

const RemoteAll = ({data, page, sizePerPage, onTableChange, totalSize, columns}) => (
  <div>
    <BootstrapTable
      remote={ { pagination: true } }
      keyField="id"
      data={ data }
      columns={ columns }
      filter={ filterFactory() }
      pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
      onTableChange={ onTableChange }
      overlay={ overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.3)' }) }
    />
  </div>
);


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
      }, {
        dataField: 'userEmail',
        text: 'Owner email',
        filter: textFilter()
      }, {
        dataField: 'technology',
        text: 'Technology',
        filter: textFilter()
      }, {
        dataField: 'state',
        text: 'Project state',
        filter: textFilter()
      }, {
        dataField: 'startDate',
        text: 'Start date',
        filter: textFilter()
      }, {
        dataField: 'delivery',
        text: 'Delivery',
        filter: textFilter()
      }],

      secondColumns: [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'gender',
        text: 'Gender',
        filter: textFilter()
      }],

      thirdColumns: [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'country',
        text: 'Country',
        filter: textFilter()
      }],

      fourthColumns: [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'civilState',
        text: 'Civil State',
        filter: textFilter()
      }],

      firstTable: [],
      firstPage: 1,
      sizePerPage: 200,
      firstTotalSize: 0,
      secondTable: [],
      secondPage: 1,
      secondTotalSize: 0,
      thirdTable: [],
      thirdPage: 1,
      thirdTotalSize: 0,
      fourthTable: [],
      fourthPage: 1,
      fourthTotalSize: 0
    }

    this.initProjectTable();
    this.initGenderTable();
    this.initCountryTable();
    this.initCivilStateTable();
  }

  initProjectTable = async () => {
    let url = '/projects?count=25'
    try{
      let response = await axios.get(url, {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('cbm_token')}
      });
      this.setState({
        firstTotalSize: response.data.count,
        firstTable: response.data.data
      });

    }catch(error) {
      console.error(error);
    }
  };

  initGenderTable = async () => {
    let url = '/genders'
    try{
      let response = await axios.get(url, {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('cbm_token')}
      });
      this.setState({
        secondTotalSize: response.data.count,
        secondTable: response.data.data
      });

    }catch(error) {
      console.error(error);
    }
  };

  initCountryTable = async () => {
    let url = '/countries'
    try{
      let response = await axios.get(url, {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('cbm_token')}
      });
      console.log(response);
      this.setState({
        thirdTotalSize: response.data.count,
        thirdTable: response.data.data
      });

    }catch(error) {
      console.error(error);
    }
  };

  initCivilStateTable = async () => {
    let url = '/civilstates'
    try{
      let response = await axios.get(url, {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('cbm_token')}
      });
      console.log(response);
      this.setState({
        fourthTotalSize: response.data.count,
        fourthTable: response.data.data
      });

    }catch(error) {
      console.error(error);
    }
  };

  async refreshProjects(page, filters) {
    let url = '/projects?count=200'
    // if (this.state.cursor !== 0) {
    //   url += '&cursor=' + this.state.cursor;
    // }
    try{
      this.state.filters = filters;
      let response = await axios.get(url, {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('cbm_token')}
      });
      const result = response.data.data.filter((row) => {
        let valid = true;
        for (const dataField in filters) {
          const { filterVal, filterType, comparator } = filters[dataField];
          if (filterType === 'TEXT') {
            if (comparator === Comparator.LIKE) {
              valid = row[dataField].toString().indexOf(filterVal) > -1;
            } else {
              valid = row[dataField] === filterVal;
            }
          }
          if (!valid) break;
        }
        return valid;
      });

      this.setState({
        firstPage: page,
        firstTotalSize: response.data.count,
        firstTable: result
      });
    }catch(error) {
      console.error(error);
    }
  }


  handleProjectTable = (type, { page, sizePerPage, filters }) => {
    // Get values from backend again
    this.refreshProjects(page, filters);
  }

  async refreshGenders(page, filters) {
    let url = '/genders'
    // if (this.state.cursor !== 0) {
    //   url += '&cursor=' + this.state.cursor;
    // }
    try{
      this.state.filters = filters;
      let response = await axios.get(url, {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('cbm_token')}
      });
      const result = response.data.data.filter((row) => {
        let valid = true;
        for (const dataField in filters) {
          const { filterVal, filterType, comparator } = filters[dataField];
          if (filterType === 'TEXT') {
            if (comparator === Comparator.LIKE) {
              valid = row[dataField].toString().indexOf(filterVal) > -1;
            } else {
              valid = row[dataField] === filterVal;
            }
          }
          if (!valid) break;
        }
        return valid;
      });

      this.setState({
        secondPage: page,
        secondTotalSize: response.data.count,
        secondTable: result
      });
    }catch(error) {
      console.error(error);
    }
  }

  handleGenderTable = (type, { page, sizePerPage, filters }) => {
    // Get values from backend again
    this.refreshGenders(page, filters);
  }

  async refreshCountries(page, filters) {
    let url = '/countries'
    // if (this.state.cursor !== 0) {
    //   url += '&cursor=' + this.state.cursor;
    // }
    try{
      this.state.filters = filters;
      let response = await axios.get(url, {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('cbm_token')}
      });
      const result = response.data.data.filter((row) => {
        let valid = true;
        for (const dataField in filters) {
          const { filterVal, filterType, comparator } = filters[dataField];
          if (filterType === 'TEXT') {
            if (comparator === Comparator.LIKE) {
              valid = row[dataField].toString().indexOf(filterVal) > -1;
            } else {
              valid = row[dataField] === filterVal;
            }
          }
          if (!valid) break;
        }
        return valid;
      });

      this.setState({
        thirdPage: page,
        thirdTotalSize: response.data.count,
        thirdTable: result
      });
    }catch(error) {
      console.error(error);
    }
  }

  handleCountryTable = (type, { page, sizePerPage, filters }) => {
    // Get values from backend again
    this.refreshCountries(page, filters);
  }

  async refreshCivilStates(page, filters) {
    let url = '/civilstates'
    // if (this.state.cursor !== 0) {
    //   url += '&cursor=' + this.state.cursor;
    // }
    try{
      this.state.filters = filters;
      let response = await axios.get(url, {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('cbm_token')}
      });
      const result = response.data.data.filter((row) => {
        let valid = true;
        for (const dataField in filters) {
          const { filterVal, filterType, comparator } = filters[dataField];
          if (filterType === 'TEXT') {
            if (comparator === Comparator.LIKE) {
              valid = row[dataField].toString().indexOf(filterVal) > -1;
            } else {
              valid = row[dataField] === filterVal;
            }
          }
          if (!valid) break;
        }
        return valid;
      });

      this.setState({
        fourthPage: page,
        fourthTotalSize: response.data.count,
        fourthTable: result
      });
    }catch(error) {
      console.error(error);
    }
  }

  handleCivilStateTable = (type, { page, sizePerPage, filters }) => {
    // Get values from backend again
    this.refreshCivilStates(page, filters);
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

  convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
      return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
      ctr = 0;
      keys.forEach(function(key) {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  downloadCSV(args) {

    var data, filename, link;
    console.log('args', args.dataTable);
    var csv = this.convertArrayOfObjectsToCSV({
      data: args.dataTable
    });
    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();

  }

  printReport(div) {
    var input = document.getElementById(div);
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'landscape'});
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        var n = div + ".pdf"
        pdf.save(n);
      })
    ;
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
                        Projects
                      </Button>
                  </div>
                  <div className="updateclient-buttons-container" id="left">
                     <Button
                        className="button-size-sm button-prim"
                        onClick={ () => this.showTable(2) }
                        block>
                        Gender
                      </Button>
                  </div>
                  <div className="updateclient-buttons-container" id="left">
                     <Button
                        className="button-size-sm button-prim"
                        onClick={ () => this.showTable(3) }
                        block>
                        Country
                      </Button>
                  </div>
                  <div className="updateclient-buttons-container" id="left">
                     <Button
                        className="button-size-sm button-prim"
                        onClick={ () => this.showTable(4) }
                        block>
                        Civil State
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
                  <b>Projects :</b>
                  <hr id="cat"/>
                </div>
                <div className="updateclient-buttons-container">
                  <div className="updateclient-buttons-container" id="left">
                     <Button
                        bsStyle="success"
                        className="button-size button-override-font"
                        onClick={ () => this.downloadCSV({ filename: "catalogue_1.csv", dataTable: this.state.firstTable}) }
                        block>
                          Generate Report
                      </Button>
                  </div>
                  <div className="updateclient-buttons-container" id="right">
                     <Button bsStyle="danger"
                     className="button-size button-override-font" onClick={ () => this.printReport('projects-cat') } block>Generate PDF Report</Button>
                  </div>
                </div>

                <div className="clients-table-container" id="projects-cat">
                  <RemoteAll
                    data={ this.state.firstTable }
                    page={ this.state.firstPage }
                    sizePerPage={ this.state.sizePerPage }
                    totalSize={ this.state.firstTotalSize }
                    onTableChange={ this.handleProjectTable }
                    columns={ this.state.firstColumns }
                  />
                  </div>
                </div>
            </Col>
          </Row>
        </Grid>

        <Grid id="cat-2" className="updateclient-cat-initial">
          <Row>
            <Col xs={6} sm={6} md={6} lg={12}>
              <div className="updateclient-tablecontainer">
                <div className="updateclient-instr-title">
                  <b>Gender :</b>
                  <hr id="cat"/>
                </div>
                <div className="updateclient-buttons-container">
                  <div className="updateclient-buttons-container" id="left">
                     <Button
                        bsStyle="success"
                        className="button-size button-override-font"
                        onClick={ () => this.downloadCSV({ filename: "catalogue_2.csv", dataTable: this.state.secondTable}) }
                        block>
                          Generate Report
                      </Button>
                  </div>
                  <div className="updateclient-buttons-container" id="right">
                     <Button bsStyle="danger"
                     className="button-size button-override-font" onClick={ () => this.printReport('gender-cat') } block>Generate PDF Report</Button>
                  </div>
                </div>

                <div className="clients-table-container" id="gender-cat">

                <RemoteAll
                  data={ this.state.secondTable}
                  page={ this.state.secondPage}
                  sizePerPage={ this.state.sizePerPage }
                  totalSize={ this.state.secondTotalSize}
                  onTableChange={ this.handleGenderTable }
                  columns={ this.state.secondColumns }
                />
                </div>
              </div>
            </Col>
          </Row>
        </Grid>

        <Grid id="cat-3" className="updateclient-cat-initial">
          <Row>
            <Col xs={6} sm={6} md={6} lg={12}>
              <div className="updateclient-tablecontainer">
                <div className="updateclient-instr-title">
                  <b>Country:</b>
                  <hr id="cat"/>
                </div>
                <div className="updateclient-buttons-container">
                  <div className="updateclient-buttons-container" id="left">
                     <Button
                        bsStyle="success"
                        className="button-size button-override-font"
                        onClick={ () => this.downloadCSV({ filename: "catalogue_3.csv", dataTable: this.state.thirdTable}) }
                        block>
                          Generate Report
                      </Button>
                  </div>
                  <div className="updateclient-buttons-container" id="right">
                     <Button bsStyle="danger"
                     className="button-size button-override-font" onClick={ () => this.printReport('country-cat') } block>Generate PDF Report</Button>
                  </div>
                </div>

                <div className="clients-table-container" id="country-cat">

                <RemoteAll
                  data={ this.state.thirdTable}
                  page={ this.state.thirdPage}
                  sizePerPage={ this.state.sizePerPage }
                  totalSize={ this.state.thirdTotalSize}
                  onTableChange={ this.handleCountryTable}
                  columns={ this.state.thirdColumns}
                />
                </div>
              </div>
            </Col>
          </Row>
        </Grid>

        <Grid id="cat-4" className="updateclient-cat-initial">
          <Row>
            <Col xs={6} sm={6} md={6} lg={12}>
              <div className="updateclient-tablecontainer">
                <div className="updateclient-instr-title">
                  <b>Civil State:</b>
                  <hr id="cat"/>
                </div>
                <div className="updateclient-buttons-container">
                  <div className="updateclient-buttons-container" id="left">
                     <Button
                        bsStyle="success"
                        className="button-size button-override-font"
                        onClick={ () => this.downloadCSV({ filename: "catalogue_4.csv", dataTable: this.state.fourthTable}) }
                        block>
                          Generate Report
                      </Button>
                  </div>
                  <div className="updateclient-buttons-container" id="right">
                     <Button bsStyle="danger"
                     className="button-size button-override-font" onClick={ () => this.printReport('civstate-cat') } block>Generate PDF Report</Button>
                  </div>
                </div>

                <div className="clients-table-container" id="civstate-cat">
                <RemoteAll
                  data={ this.state.fourthTable}
                  page={ this.state.fourthPage}
                  sizePerPage={ this.state.sizePerPage }
                  totalSize={ this.state.fourthTotalSize}
                  onTableChange={ this.handleCivilStateTable}
                  columns={ this.state.fourthColumns}
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
export default connect(mapStateToProps, null)(ShowCatalogue);
