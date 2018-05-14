import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Row, Col, PageHeader } from 'react-bootstrap';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';
import qs from 'qs'

import axios from '../../Server';


// Styles
import '../../../styles/_layout.css';
import '../../../styles/_buttons.css';
import '../../../styles/_updateclient.css';

const columns =  [{ 
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
        dataField: 'gender', 
        text: 'Gender', 
        filter: textFilter({caseSensitive: true}) 
      }, { 
        dataField: 'civstate', 
        text: 'Civil State' 
      }, { 
        dataField: 'birthDate', 
        text: 'Birth Date' 
      }, { 
        dataField: 'country', 
        text: 'Country' 
      }, { 
        dataField: 'twitterHandle', 
        text: 'Twitter Handle' 
      }]

const RemoteAll = ({data, page, sizePerPage, onTableChange, totalSize, selectRow, afterSaveCell, columns}) => (
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
      cellEdit={ cellEditFactory({
       mode: 'click',
       afterSaveCell: (oldValue, newValue, row, column) => {afterSaveCell(oldValue, newValue, row, column);}
     }) }
      selectRow={ selectRow }
    />
  </div>
);

RemoteAll.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired
};


class ShowClients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns,
      userTable: [],
      data: [],
      page: 1,
      data: [],
      totalSize: 0,
      sizePerPage: 25,
      cursor: 0,
      tphotoLink: 'https://pbs.twimg.com/profile_images/455870091138056193/UH1r-I-e_200x200.jpeg',
      tname: 'Twitter User',
      tfavs: '0',
      ttweets: '0',
      tfollowers: '0',
      tfollows: '0',
      tlasttweets: [],
      redirectToProfile: false
    };

    // Get first page
    this.initTable();
  }

  initTable = async () => {
    let url = '/clients?count=25'
    try{
      let response = await axios.get(url, {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('cbm_token')}
      });
      this.setState({
        totalSize: response.data.count,
        data: response.data.data
      });
    }catch(error) {
      console.error(error);
    }
  }

  async refreshTable(page, filters) {
    let url = '/clients?count=25'
    if (this.state.cursor !== 0) {
      url += '&cursor=' + this.state.cursor;
    }
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
        page: page,
        totalSize: response.data.count,
        data: result
      });
    }catch(error) {
      console.error(error);
    }
  }


  handleTableChange = (type, { page, sizePerPage, filters }) => {
    // Get values from backend again
    this.refreshTable(page, filters);
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
    var csv = this.convertArrayOfObjectsToCSV({
      data: this.state.userTable
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

  showProfile = async () => {
    var selectedRow = JSON.parse(localStorage.getItem('selectedRowShow'));
    if (selectedRow !== null) {
      var twitterHandle = selectedRow.twitterHandle;
      console.log(twitterHandle);
      // hacer un request a la api con el twitterHandle que devuelva:
      // foto, nombre, descripcion, #favs, #tweets, #followers, #follows, array con los ultimos 30 tweets
      // cambiar el valor del selectedRowShow


      // API REQEUEST, TODO 
      // Concatenate with the real twitter handle, NOTE: @ must be included
      let url = '/twitterprofile?handle=@jorocuva'
      let response = await axios.get(url, {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('cbm_token')}
      });

      // PRINTING Twitter INFO
      console.log('Twitter INFO', response.data.data);
      localStorage.setItem('selectedRowShow', null);

      // luego del request, cambiar los valores del state correspondientes con los resultados del request
      // y luego guardarlos en un objeto y guardarlo en localStorage

      // el id en esto es un id solo para poder ordenar la tabla y que no truene react, igual se tiene que devolver
      var lastTweets = [
        {
          id: 0,
          tweet: "example of tweet"
        },
        {
          id: 1,
          tweet: "other tweet"
        }
      ]

      var twitterInfo = {
        tphotoLink: this.state.tphotoLink,
        tname: this.state.tname,
        tfavs: this.state.tfavs,
        ttweets: this.state.ttweets,
        tfollowers: this.state.tfollowers,
        tfollows: this.state.tfollows,
        tlasttweets: lastTweets,
      }

      localStorage.setItem('twitterInfo', JSON.stringify(twitterInfo));

      // y cambiar el estado de redirect a true:
      this.setState({ redirectToProfile: true });

    } else {
      alert("No user selected")
    }
  }

  nothing() {
    console.log('no click yet');
  }



  render() {
    const _this = this;
    const selectRow ={
      mode: 'radio',
      hideSelectColumn: true,
      clickToSelect: true,
      style: { backgroundColor: '#c8e6c9' },
      onSelect: (row, isSelect, rowIndex, e) => {
        localStorage.setItem('selectedRowShow', JSON.stringify(row));
      }
    };

    const redirect = this.state.redirectToProfile;
    console.log('redirect is', redirect);

    if (redirect === true) {
      return <Redirect to='/dashboard/social/clients-twitter' />;
    }

    return (
      <div className="layout-scene-wrapper">
        <PageHeader className="layout-pageheader">
          Clients
        </PageHeader>;
        <Grid>
          <Row>
            <Col xs={6} sm={6} md={6} lg={12}>
              <div className="updateclient-tablecontainer">
                <div className="updateclient-instr-title">
                  <b>Search clients:</b>
                  <hr />
                </div>
                <div className="updateclient-instr-text">
                  Filter each column in the table by a search query per colum: search by name, email or sex.
                </div>
                <div className="updateclient-instr-title" id="last">
                  <b>Reports:</b>
                  <hr />
                </div>
                <div className="updateclient-instr-text">
                  You can <b> export your data to a CSV file </b> using the button <b>EXPORT CSV</b>.
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col xs={6} sm={6} md={6} lg={12}>
              <div className="updateclient-tablecontainer">
                <div className="updateclient-buttons-container">
                  <div className="updateclient-buttons-container" id="left">
                     <Button
                        bsStyle="success"
                        className="button-size button-override-font"
                        onClick={ () => this.downloadCSV({ filename: "clients.csv" }) }
                        block>
                          Export CSV
                      </Button>
                  </div>
                  <div className="updateclient-buttons-container" id="right">
                     <Button
                        bsStyle="info"
                        className="button-size button-override-font"
                        onClick={ () => this.showProfile() }
                        block
                        type="submit">
                          Show Twitter Profile
                      </Button>

                  </div>
                </div>
                <RemoteAll
                  data={ this.state.data }
                  page={ this.state.page }
                  sizePerPage={ this.state.sizePerPage }
                  totalSize={ this.state.totalSize }
                  onTableChange={ this.handleTableChange }
                  selectRow={ selectRow }
                  afterSaveCell={ this.updateUserTable }
                  columns={ this.state.columns }
                />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(ShowClients);
