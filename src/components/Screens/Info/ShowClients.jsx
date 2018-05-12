import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Row, Col, PageHeader } from 'react-bootstrap';
import { Redirect } from 'react-router'

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

// Styles
import '../../../styles/_layout.css';
import '../../../styles/_buttons.css';
import '../../../styles/_updateclient.css';



class ShowClients extends Component {
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
        dataField: 'sex',
        text: 'Sex',
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
      }],

      userTable: [
        {
          id: 0,
          name: "Juan Gonzalez",
          email: "jgonzalez@cusbromenlabs.com",
          sex: "M",
          civstate: "single",
          birthDate: "1997-02-02",
          country: "Guatemala",
          twitterHandle: "jgonz"
        },
        {
          id: 1,
          name: "Alvaro Arzu",
          email: "irigoyen@cusbromenlabs.com",
          sex: "M",
          civstate: "single",
          birthDate: "1750-02-02",
          country: "Guatemala",
          twitterHandle: "arzu"
        },
        {
          id: 2,
          name: "Naruto Uzumaki",
          email: "uzumaki@cusbromenlabs.com",
          sex: "M",
          civstate: "married",
          birthDate: "1997-05-02",
          country: "Japan",
          twitterHandle: "naruto"
        }
      ],

      tphotoLink: 'https://pbs.twimg.com/profile_images/455870091138056193/UH1r-I-e_200x200.jpeg',
      tname: 'Twitter User',
      tfavs: '0',
      ttweets: '0',
      tfollowers: '0',
      tfollows: '0',
      tlasttweets: [],

      redirectToProfile: false
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

  showProfile() {
    var selectedRow = JSON.parse(localStorage.getItem('selectedRowShow'));
    if (selectedRow !== null) {
      var twitterHandle = selectedRow.twitterHandle;
      console.log(twitterHandle);
      // hacer un request a la api con el twitterHandle que devuelva:
      // foto, nombre, descripcion, #favs, #tweets, #followers, #follows, array con los ultimos 30 tweets
      // cambiar el valor del selectedRowShow
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
      return <Redirect to='/social/clients-twitter' />;
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
                <BootstrapTable
                  striped
                  hover
                  condensed
                  keyField='id'
                  data={ this.state.userTable }
                  columns ={this.state.columns}
                  selectRow = { selectRow }
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
export default connect(mapStateToProps, null)(ShowClients);
