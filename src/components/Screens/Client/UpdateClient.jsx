import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Row, Col, Alert, PageHeader, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

// Styles
import '../../../styles/_layout.css';
import '../../../styles/_buttons.css';
import '../../../styles/_updateclient.css';

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

function validateDate(date) {
    var re = /(\d{4})-(\d{2})-(\d{2})/;
    return re.test(String(date).toLowerCase());
};

class UpdateClient extends Component {
  constructor(props) {
    super(props);

    const selectedArray = [];
    localStorage.setItem('selectedArray', JSON.stringify(selectedArray));

    this.state = {
      columns: [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'name',
        text: 'Name',
        filter: textFilter(),
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
        filter: textFilter({caseSensitive: true}),
        validator: (newValue, row, column) => {
          if (newValue === "") {
            alert('Field must not be empty');
            return {
              valid: false,
              message: 'Field must not be empty'
            };
          }
          if (validateEmail(newValue) === false) {
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
        filter: textFilter({caseSensitive: true}),
        validator: (newValue, row, column) => {
          if (newValue === "") {
            alert('Field must not be empty');
            return {
              valid: false,
              message: 'Field must not be empty'
            };
          }
          if (newValue.toLowerCase() === "m" || newValue.toLowerCase() === "f") {
            // do nothing
          } else {
            alert('Only valid inputs are M for male and F for female');
            return {
              valid: false,
              message: 'Only valid inputs are M for male and F for female'
            };
          }
          return true;
        }
      }, {
        dataField: 'civstate',
        text: 'Civil State',
        validator: (newValue, row, column) => {
          if (newValue === "") {
            alert('Field must not be empty');
            return {
              valid: false,
              message: 'Field must not be empty'
            };
          }
          if (newValue.toLowerCase() === "single" || newValue.toLowerCase() === "married"
                || newValue.toLowerCase() === "widow" || newValue.toLowerCase() === "divorced") {
            // do nothing
          } else {
            alert('Only valid inputs are single, married, widow or divorced');
            return {
              valid: false,
              message: 'Only valid inputs are single, married, widow or divorced'
            };
          }
          return true;
        }
      }, {
        dataField: 'birthDate',
        text: 'Birth Date',
        validator: (newValue, row, column) => {
          if (newValue === "") {
            alert('Field must not be empty');
            return {
              valid: false,
              message: 'Field must not be empty'
            };
          }
          if (validateDate(newValue) === false) {
            alert('Please enter a date in format YYYY-MM-DD');
            return {
              valid: false,
              message: 'Please enter a date in format YYYY-MM-DD'
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
      }, {
        dataField: 'twitterHandle',
        text: 'Twitter Handle',
        filter: textFilter(),
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

      update: []
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
    //localStorage.setItem('rowToUpdate', JSON.stringify(row));

    // add to update array
    this.addToUpdate(row);
  }

  updateData() {
    //var rowToSend = JSON.parse(localStorage.getItem('rowToUpdate'));
    //console.log('row is', rowToSend);

    // this is the update array to send to api
    console.log('update array is ', this.state.update);
  }

  addToUpdate(row) {
    var toUpdate = this.state.update;
    var found = false;
    var update = toUpdate.map(element => {
      if (element.id === row.id) {
        found = true;
        return row;
      } else {
        return element;
      }
    });

    if (found === false) {
      update.push(row);
    }

    this.setState({ update });
  }

  handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      let selectedArray = JSON.parse(localStorage.getItem('selectedArray'));

      if (!selectedArray.includes(row.id)) {
        selectedArray.push(row.id);
      }

      localStorage.setItem('selectedArray', JSON.stringify(selectedArray));
    } else {
      let selectedArray = JSON.parse(localStorage.getItem('selectedArray'));
      let newSelected = selectedArray.filter(id => id !== row.id);

      localStorage.setItem('selectedArray', JSON.stringify(newSelected));
    }
  }

  deleteUsers() {
    console.log("ids to delete", JSON.parse(localStorage.getItem('selectedArray')));
  }

  showAlertUpdate() {
    var alert = document.getElementById("alert-updateclient");
    alert.style.display = "block";
  }

  hideAlertUpdate() {
    var alert = document.getElementById("alert-updateclient");
    alert.style.display = "none";
  }

  showAlertDelete() {
    var alert = document.getElementById("alert-deleteclient");
    alert.style.display = "block";
  }

  hideAlertDelete() {
    var alert = document.getElementById("alert-deleteclient");
    alert.style.display = "none";
  }

  showAlertNewColumn() {
    var alert = document.getElementById("alert-addnewcolumn");
    alert.style.display = "block";
  }

  hideAlertNewColumn() {
    var alert = document.getElementById("alert-addnewcolumn");
    alert.style.display = "none";
  }

  addNewColumn() {

  }

  render() {
    const selectRow ={
      mode: 'checkbox',
      hideSelectColumn: true,
      clickToSelect: true,
      clickToEdit: true,
      style: { backgroundColor: '#c8e6c9' },
      onSelect: (row, isSelect, rowIndex, e) => {
        localStorage.setItem('selectedRow', JSON.stringify(row));
        this.handleOnSelect(row, isSelect);
      }
    };

    return (
      <div className="layout-scene-wrapper">
        <PageHeader className="layout-pageheader">
          Edit clients
        </PageHeader>;

        <Grid>
          <Row>
            <Col xs={6} sm={6} md={6} lg={12}>
              <div className="updateclient-tablecontainer">
                <div className="updateclient-instr-title">
                  <b>Update clients:</b>
                  <hr />
                </div>
                <div className="updateclient-instr-text">
                  To update clients, click on a valid editable field <b>(ID can't be edited)</b> and input a new value.
                  After you finished editing all the fields from all the clients you want to edit, click the button
                  <b> UPDATE CLIENTS</b>.
                </div>
                <div className="updateclient-instr-title" id="last">
                  <b>Delete clients:</b>
                  <hr />
                </div>
                <div className="updateclient-instr-text">
                  To delete clients, select (click) clients from table <b>(one click until row is green)</b>.
                  Then, click the button <b>DELETE CLIENTS</b>. To unselect a client you don't want to delete anymore,
                  select (click) that client again, and the row will change color to normal.
                </div>
                <div className="updateclient-instr-title" id="last">
                  <b>Search clients:</b>
                  <hr />
                </div>
                <div className="updateclient-instr-text">
                  Filter each column in the table by a search query per colum: search by name, email or sex.
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
                     <Button className="button-prim button-size" onClick={ () => this.showAlertUpdate() } block>Update clients</Button>
                  </div>
                  <div className="updateclient-buttons-container" id="right">
                     <Button className="button-danger btn-danger button-size" onClick={ () => this.showAlertDelete() } block>Delete clients</Button>
                  </div>
                  <div className="updateclient-buttons-container" id="right">
                     <Button bsStyle="info" className="button-override-font button-size button-fillpadding" onClick={ () => this.showAlertNewColumn() } block>Add New Column</Button>
                  </div>

                  <Alert bsStyle="warning" className="layout-confirm-box" id="alert-updateclient">
                     <p>Are you sure you want to <b>update client(s)</b> with given information? </p>
                     <p>
                       <Button
                           bsStyle="success"
                           className="button-override-font"
                           onClick={() => this.updateData()}
                           block>Yes</Button>
                       <Button
                           bsStyle="primary"
                           className="button-override-font"
                           onClick={() => this.hideAlertUpdate()}
                           block>No</Button>
                     </p>
                  </Alert>

                  <Alert bsStyle="warning" className="layout-confirm-box" id="alert-deleteclient">
                     <p>Are you sure you want to <b>delete selected client(s)</b>? </p>
                     <p>
                       <Button
                           bsStyle="success"
                           className="button-override-font"
                           onClick={() => this.deleteUsers()}
                           block>Yes</Button>
                       <Button
                           bsStyle="primary"
                           className="button-override-font"
                           onClick={() => this.hideAlertDelete()}
                           block>No</Button>
                     </p>
                  </Alert>

                  <Alert bsStyle="info" className="layout-confirm-box" id="alert-addnewcolumn">
                     <p>Please specify <b>column name</b> and <b>type</b>.</p>
                     <p>
                       <form>
                         <FormGroup>
                            <InputGroup className="addclient-form-input-element">
                              <FormControl type="text" placeholder="Name"
                              onChange={(event) => this.setState({ newColName: event.target.value })}
                              required
                              />
                            </InputGroup>
                         </FormGroup>
                         <FormGroup>
                            <InputGroup className="addclient-form-input-element">
                              <FormControl type="text" placeholder="Type"
                              onChange={(event) => this.setState({ newColType: event.target.value })}
                              required
                              />
                            </InputGroup>
                         </FormGroup>
                       </form>
                     </p>
                     <p>
                       <Button
                           bsStyle="success"
                           className="button-override-font"
                           onClick={() => this.addNewColumn()}
                           block>Create</Button>
                       <Button
                           bsStyle="primary"
                           className="button-override-font"
                           onClick={() => this.hideAlertNewColumn()}
                           block>Cancel</Button>
                     </p>
                  </Alert>

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
                  pagination={ paginationFactory() }
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
