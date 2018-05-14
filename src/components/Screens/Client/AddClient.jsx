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

class AddClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthDate: new Date(),
      name: '',
      lastname: '',
      email: '',
      sex: 'Male',
      state: 'Single',
      country: 'GT',
      twitter: '',
      noErrors: true,
      errors: '',
      successMsg: '',
      showError: false,
    }



  }

  onChangeDate = (birthDate) => {
    this.setState({ birthDate });
    this.hideAlert();
  };

  onChangeName = (name) => {
    this.setState({ name });
    this.hideAlert();
  };

  onChangeLastName = (lastname) => {
    this.setState({ lastname });
    this.hideAlert();
  };

  onChangeEmail = (email) => {
    this.setState({ email });
    this.hideAlert();
  };

  onChangeSex = (sex) => {
    this.setState({ sex });
    this.hideAlert();
  };

  onChangeCivilState = (state) => {
    this.setState({ state });
    this.hideAlert();
  };

  onChangeCountry = (country) => {
    this.setState({ country });
    this.hideAlert();
  };

  onChangeTwitterHandle = (twitter) => {
    this.setState({ twitter });
    this.hideAlert();
  };


  createUser = () => {
    document.getElementById('register-success-msg').style.display = 'none';  // hide success message
    let noErrors = this.state.noErrors;
    let errorMsg = "";

    // Validate twitter username
    if (this.state.twitter.charAt(0) !== "@"){
      noErrors = false;
      errorMsg += "Invalid twitter user, please add '@'."
    }

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
      lastName: this.state.lastname,
      email: this.state.email,
      gender: this.state.sex,
      civilState: this.state.state,
      birthDate: this.state.birthDate,
      country: this.state.country,
      twitterHandle: this.state.twitter
    };
    try {
      await axios.post('/addclient', qs.stringify(data));
      this.setState({successMsg: 'Succesfully created new client', noError: false});
      document.getElementById('register-success-msg').style.display = 'block';

      // Reset all fields
        document.getElementById('first-name-input').value = '';
        document.getElementById('last-name-input').value = '';
        document.getElementById('email-input').value = '';
        document.getElementById('register-error-msg').style.display = 'none';
        document.getElementById("alert-addclient").style.display = 'none';

    } catch(error) {
      console.log(error.response.text);
      this.setState({errors: error.response.statusText, noError: false});
      document.getElementById('register-error-msg').style.display = 'block';
    }

  };

  showAlert = (event) => {
    event.preventDefault();
    var alert = document.getElementById("alert-addclient");
    alert.style.display = "block";
  };

  hideAlert = () => {
    var alert = document.getElementById("alert-addclient");
    alert.style.display = "none";
    document.getElementById('register-success-msg').style.display = 'none';  // hide success message
    document.getElementById('register-error-msg').style.display = 'none';
  }

  render() {
      return (
      <div className="layout-scene-wrapper">
      <PageHeader className="layout-pageheader">
        Add Client
      </PageHeader>

      <form onSubmit = { (event) => this.showAlert(event) }>
        <div className="addclient-fillinfo">
          <Grid>
            <Row>
              <Col xs={6} sm={6} md={6} lg={12} >
                <div className="addclient-form-title">
                  Basic Information
                </div>

                <div className="addclient-form-input">
                  Name
                </div>
                <FormGroup>
                   <InputGroup className="addclient-form-input-element">
                     <FormControl type="text" placeholder="Name" className="addclient-form-input-control" id="first-name-input"
                     onChange={(event) => this.onChangeName(event.target.value)}
                     required
                     />
                   </InputGroup>
                </FormGroup>

                <div className="addclient-form-input">
                  Last Name
                </div>
                <FormGroup>
                   <InputGroup className="addclient-form-input-element">
                     <FormControl type="text" placeholder="Last Name" className="addclient-form-input-control" id="last-name-input"
                     onChange={(event) => this.onChangeLastName(event.target.value)}
                     required
                     />
                   </InputGroup>
                </FormGroup>

                <div className="addclient-form-input">
                  E-mail
                </div>
                <FormGroup>
                   <InputGroup className="addclient-form-input-element">
                     <FormControl type="email" placeholder="E-mail" className="addclient-form-input-control" id="email-input"
                     onChange={(event) => this.onChangeEmail(event.target.value)}
                     required
                     />
                   </InputGroup>
                </FormGroup>

                <div className="addclient-form-input">
                  Gender
                </div>
                <FormGroup>
                   <InputGroup className="addclient-form-input-element">
                     <FormControl componentClass="select" placeholder="Select a gender." className="addclient-form-input-control"
                     onChange={(event) => this.onChangeSex(event.target.value)}
                     required>
                        <option value="Male" >Male</option>
                        <option value="Female" >Female</option>
                        <option value="Other" >Other</option>
                     </FormControl>
                   </InputGroup>
                </FormGroup>

                <div className="addclient-form-input">
                  Civil state
                </div>
                <FormGroup>
                   <InputGroup className="addclient-form-input-element">
                     <FormControl componentClass="select" placeholder="Select a civil state." className="addclient-form-input-control"
                     onChange={(event) => this.onChangeCivilState(event.target.value)}
                     required>
                        <option value="Single" >Single</option>
                        <option value="Married" >Married</option>
                        <option value="Divorced" >Divorced</option>
                     </FormControl>
                   </InputGroup>
                </FormGroup>

                <div className="addclient-form-input">
                  Birth Date
                </div>
                <DatePicker
                className = "addclient-form-input-element"
                onChange = { this.onChangeDate }
                value = { this.state.birthDate }
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
                  Region and social
                </div>

                <div className="addclient-form-input">
                  Country
                </div>
                <ReactFlagsSelect
                searchable = {true}
                defaultCountry = "GT"
                className = "addclient-form-input-element"
                onSelect = { this.onChangeCountry }
                required/>

                <div className="addclient-form-input">
                  Twitter
                </div>
                <FormGroup>
                   <InputGroup className="addclient-form-input-element">
                     <FormControl type="text" placeholder="username" className="addclient-form-input-control"
                     onChange={(event) => this.onChangeTwitterHandle(event.target.value)}
                     required
                     />
                   </InputGroup>
                </FormGroup>

                <div>
                   <div className="error-msg" id="register-error-msg">
                       { this.state.errors }
                   </div>
                   <div className="success-msg" id="register-success-msg">
                       { this.state.successMsg }
                   </div>
                   <Button type="submit" className="button-prim" block>Add client</Button>
                   <Alert bsStyle="warning" className="layout-confirm-box" id="alert-addclient">
                      <p>Are you sure you want to <b>create a new client</b> with given information? </p>
                      <p>
                        <Button
                            bsStyle="success"
                            className="button-override-font"
                            onClick={() => this.createUser()}
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
export default connect(mapStateToProps, null)(AddClient);
