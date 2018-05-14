import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'
import ReactFlagsSelect from 'react-flags-select';
import DatePicker from 'react-date-picker';
import { Button, FormGroup, FormControl, InputGroup, Grid, Row, Col, Alert, PageHeader} from 'react-bootstrap';
import qs from 'qs'

// Styles
import '../../../styles/_layout.css';
import '../../../styles/_buttons.css';
import '../../../styles/_addclient.css';
import 'react-flags-select/css/react-flags-select.css';

import axios from '../../Server';

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      deliveryDate: new Date(),
      name: '',
      technology: '',
      state: '',
      email: '',
      noErrors: true,
      errors: '',
      successMsg: '',
      showError: false
    }

  }

  onChangeStartDate = (startDate) => {
    this.setState({ startDate });
    this.hideAlert();
  };

  onChangeDeliveryDate = (deliveryDate) => {
    this.setState({ deliveryDate });
    this.hideAlert();
  };

  onChangeName = (name) => {
    this.setState({ name });
    this.hideAlert();
  };

  onChangeEmail = (email) => {
    this.setState({ email });
    this.hideAlert();
  };

  onChangeTechnology = (technology) => {
    this.setState({ technology });
    this.hideAlert();
  };

  onChangeState = (state) => {
    this.setState({ state });
    this.hideAlert();
  };

  createProject = () => {
    document.getElementById('register-success-msg').style.display = 'none';  // hide success message
    let noErrors = this.state.noErrors;
    let errorMsg = "";

    if (noErrors){
      // Delete error message box
      document.getElementById('register-error-msg').style.display = 'none';

      // Conect with API to create new client
      this.senData()

    } else {
      // Display error box
      this.setState({errors: errorMsg});
      document.getElementById('register-error-msg').style.display = 'block';

    }
    console.log(this.state);
  };

    senData = async () => {
    const data = {
      name: this.state.name,
      email: this.state.email,
      technology: this.state.technology,
      state: this.state.state,
      startDate: this.state.startDate,
      deliveryDate: this.state.deliveryDate
    };
    try {
      await axios.post('/addproject', qs.stringify(data));
      this.setState({successMsg: 'Succesfully created new project', noError: false});
      document.getElementById('register-success-msg').style.display = 'block';

      // Reset all fields
        document.getElementById('name-input').value = '';
        document.getElementById('email-input').value = '';
        document.getElementById('technology-input').value = '';
        document.getElementById('state-input').value = '';
        document.getElementById('register-error-msg').style.display = 'none';
        document.getElementById("alert-addproject").style.display = 'none';

    } catch(error) {
      console.log(error.response.text);
      this.setState({errors: error.response.statusText, noError: false});
      document.getElementById('register-error-msg').style.display = 'block';
    }

  };

  showAlert = (event) => {
    event.preventDefault();
    var alert = document.getElementById("alert-addproject");
    alert.style.display = "block";
  };

  hideAlert = () => {
    var alert = document.getElementById("alert-addproject");
    alert.style.display = "none";
    document.getElementById('register-success-msg').style.display = 'none';  // hide success message
    document.getElementById('register-error-msg').style.display = 'none';
  }

  render() {
      return (
      <div className="layout-scene-wrapper">
      <PageHeader className="layout-pageheader">
        Add Project
      </PageHeader>

      <form onSubmit = { (event) => this.showAlert(event) }>
        <div className="addclient-fillinfo">
          <Grid>
            <Row>
              <Col xs={6} sm={6} md={6} lg={12} >
                <div className="addclient-form-title">
                  Project Information
                </div>

                <div className="addclient-form-input">
                  Name
                </div>
                <FormGroup>
                   <InputGroup className="addclient-form-input-element">
                     <FormControl type="text" placeholder="Name" className="addclient-form-input-control" id="name-input"
                     onChange={(event) => this.onChangeName(event.target.value)}
                     required
                     />
                   </InputGroup>
                </FormGroup>

                <div className="addclient-form-input">
                  eMail
                </div>
                <FormGroup>
                   <InputGroup className="addclient-form-input-element">
                     <FormControl type="text" placeholder="eMail" className="addclient-form-input-control" id="email-input"
                     onChange={(event) => this.onChangeEmail(event.target.value)}
                     required
                     />
                   </InputGroup>
                </FormGroup>

                <div className="addclient-form-input">
                  Technology
                </div>
                <FormGroup>
                   <InputGroup className="addclient-form-input-element">
                     <FormControl type="text" placeholder="Technology" className="addclient-form-input-control" id="technology-input"
                     onChange={(event) => this.onChangeTechnology(event.target.value)}
                     required
                     />
                   </InputGroup>
                </FormGroup>

                <div className="addclient-form-input">
                  State
                </div>
                <FormGroup>
                   <InputGroup className="addclient-form-input-element">
                     <FormControl componentClass="select" placeholder="Select a state." className="addclient-form-input-control"
                     onChange={(event) => this.onChangeState(event.target.value)}
                     required>
                        <option value="inactive" >Inactive</option>
                        <option value="active" >Active</option>
                        <option value="done" >Done</option>
                     </FormControl>
                   </InputGroup>
                </FormGroup>

                <div className="addclient-form-input">
                  Start Date
                </div>
                <DatePicker
                className = "addclient-form-input-element"
                onChange = { this.onChangeStartDate }
                value = { this.state.startDate }
                required/>

                <div className="addclient-form-input">
                  Delivery Date
                </div>
                <DatePicker
                className = "addclient-form-input-element"
                onChange = { this.onChangeDeliveryDate }
                value = { this.state.deliveryDate }
                required/>

              </Col>
            </Row>
          </Grid>
        </div>

        <div className="addclient-fillinfo">
          <Grid>
            <Row>
              <Col xs={6} sm={6} md={6} lg={12} >
                <div className="addclient-form-title">
                  Confirm data
                </div>

                <div>
                   <div className="error-msg" id="register-error-msg">
                       { this.state.errors }
                   </div>
                   <div className="success-msg" id="register-success-msg">
                       { this.state.successMsg }
                   </div>
                   <Button type="submit" className="button-prim" block>Add Project</Button>
                   <Alert bsStyle="warning" className="layout-confirm-box" id="alert-addproject">
                      <p>Are you sure you want to <b>create a new project</b> with given information? </p>
                      <p>
                        <Button
                            bsStyle="success"
                            className="button-override-font"
                            onClick={() => this.createProject()}
                            block>Yes</Button>
                        <Button
                            bsStyle="primary"
                            className="button-override-font"
                            onClick={() => this.hideAlert()}
                            block>No</Button>
                      </p>
                   </Alert>
                </div>

              </Col>
            </Row>
          </Grid>
        </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(AddProject);
