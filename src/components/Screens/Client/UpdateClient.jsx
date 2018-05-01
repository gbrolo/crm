import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Row, Col } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

// Styles
import '../../../styles/_layout.css';
import '../../../styles/_buttons.css';
import '../../../styles/_updateclient.css';

const selectRow ={
  mode: 'radio',
  hideSelectColumn: true,
  clickToSelect: true,
  clickToEdit: true,
  style: { backgroundColor: '#c8e6c9' },
  onSelect: (row, isSelect, rowIndex, e) => {
    localStorage.setItem('selectedRow', JSON.stringify(row));
  }
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

class UpdateClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'name',
        text: 'Name',
        validator: (newValue, row, column) => {
          if (newValue === "") {
            alert('Field must not be empty');
            return {
              valid: false,
              message: 'Field must not be empty'
            };
          }
          if (isNaN(typeof parseInt(newValue)) === false) {
            alert('Field must have a text value');
            return {
              valid: false,
              message: 'Field must have a text value'
            };
          }
          return true;
        }
      }, {
        dataField: 'email',
        text: 'Email',
        validator: (newValue, row, column) => {
          if (newValue === "") {
            alert('Field must not be empty');
            return {
              valid: false,
              message: 'Field must not be empty'
            };
          }
          if (isNaN(typeof parseInt(newValue)) === false) {
            alert('Field must have a text value');
            return {
              valid: false,
              message: 'Field must have a text value'
            };
          } else if (validateEmail(newValue) === false) {
            alert('Please enter a valid email');
            return {
              valid: false,
              message: 'Please enter a valid email'
            };
          }
          return true;
        }
      }, {
        dataField: 'sex',
        text: 'Sex',
        validator: (newValue, row, column) => {
          if (newValue === "") {
            return {
              valid: false,
              message: 'Field must not be empty'
            };
          }
          if (isNaN(typeof parseInt(newValue)) === false) {
            return {
              valid: false,
              message: 'Field must have a text value'
            };
          }
          return true;
        }
      }, {
        dataField: 'civstate',
        text: 'Civil State',
        validator: (newValue, row, column) => {
          if (newValue === "") {
            return {
              valid: false,
              message: 'Field must not be empty'
            };
          }
          if (isNaN(typeof parseInt(newValue)) === false) {
            return {
              valid: false,
              message: 'Field must have a text value'
            };
          }
          return true;
        }
      }, {
        dataField: 'birthDate',
        text: 'Birth Date',
        validator: (newValue, row, column) => {
          if (newValue === "") {
            return {
              valid: false,
              message: 'Field must not be empty'
            };
          }
          if (isNaN(typeof parseInt(newValue)) === false) {
            return {
              valid: false,
              message: 'Field must have a text value'
            };
          }
          return true;
        }
      }, {
        dataField: 'country',
        text: 'Country',
        validator: (newValue, row, column) => {
          if (newValue === "") {
            return {
              valid: false,
              message: 'Field must not be empty'
            };
          }
          if (isNaN(typeof parseInt(newValue)) === false) {
            return {
              valid: false,
              message: 'Field must have a text value'
            };
          }
          return true;
        }
      }],

      userTable: [
        {
          id: 0,
          name: "Juan Gonzalez",
          email: "jgonzalez@cusbromenlabs.com",
          sex: "M",
          civstate: "single",
          birthDate: "1997-02-02",
          country: "Guatemala"
        },
        {
          id: 1,
          name: "Alvaro Arzu",
          email: "irigoyen@cusbromenlabs.com",
          sex: "M",
          civstate: "single",
          birthDate: "1750-02-02",
          country: "Guatemala"
        },
        {
          id: 2,
          name: "Naruto Uzumaki",
          email: "uzumaki@cusbromenlabs.com",
          sex: "M",
          civstate: "married",
          birthDate: "1997-05-02",
          country: "Japan"
        }
      ]
    }
  }

  updateUserTable(oldValue, newValue, row, column) {
    // load row to exclude from localStorage
    var oldRow = JSON.parse(localStorage.getItem('selectedRow'));
    var uTable = this.state.userTable;
    var userTable = uTable.map(element => {
      if (element.id === row.id) {
        return row;
      } else {
        return element;
      }
    });

    this.setState({ userTable });

    // set just a row to update
    localStorage.setItem('rowToUpdate', JSON.stringify(row));
  }

  sendData() {
    var rowToSend = JSON.parse(localStorage.getItem('rowToUpdate'));
    console.log('row is', rowToSend);
  }

  render() {
    return (
      <div className="layout-scene-wrapper">
        <Grid>
          <Row>
            <Col xs={6} sm={6} md={6} lg={12}>
              <div className="updateclient-tablecontainer">
                <div className="updateclient-buttons-container">
                  <div className="updateclient-buttons-container" id="left">
                     <Button className="button-prim button-size" onClick={ () => this.sendData() } block>Update user</Button>
                  </div>
                  <div className="updateclient-buttons-container" id="right">
                     <Button className="button-danger btn-danger button-size"  block>Delete user</Button>
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
                  cellEdit={ cellEditFactory({
                    mode: 'click',
                    afterSaveCell: (oldValue, newValue, row, column) => { this.updateUserTable(oldValue, newValue, row, column); }
                  }) }/>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(UpdateClient);
