import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router'


import { Checkbox, Button, Panel, PanelGroup, FormGroup, FormControl, InputGroup, Grid, Row, Col } from 'react-bootstrap';
import '../res/icons/font-awesome-4.7.0/css/font-awesome.css';

import '../styles/_layout.css';
import '../styles/_buttons.css';

const logo = require('../res/img/logo.png');
const artwork_people = require('../res/img/artwork-people.png');
const user_pic = require('../res/img/user-def-xs.png');

//var login_data = JSON.parse(localStorage.login_data || null) || {};
//var user_projects_list = JSON.parse(localStorage.user_projects_list || null) || {};
//var current_project_info = JSON.parse(localStorage.current_project_info || null) || {};

class AuthScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            passwordLogin: '',
            emailLogin: '',
            nameUser: '',
            email: '',
            lastname: '',
            redirect:false,
            password: '',
            confirm_password: '',
            acceptedPolitics: false,
            error: '',
            register_error: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        this.setState({[fieldName]: fieldValue});
        this.validateForm();

    }

    onSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    handleCheckBox(event){
        this.setState({acceptedPolitics: event.target.checked});
        this.validateForm();
    }

    validateEmail(value) {
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }

    validatePasswordConfirm(){
        const password = this.state.password;
        const password_confirmed = this.state.confirm_password;
        return password === password_confirmed;
    }

    validateForm(){
        const email = this.validateEmail(this.state.email);
        const password = true;
        const confirm = this.validatePasswordConfirm();
        return email && password && confirm;
    }

    saveLoginData() {

    }

    login(event) {
        this.onSubmit(event);
        this.setState({redirect: true});

    }

    register(event) {
        this.onSubmit(event);

        const registerFormValid = this.validateForm();
        if (registerFormValid) {
            document.getElementById('register-error-msg').style.display = 'none';
            var qs = require('qs');

        }
    }

    nothing() {

    }

    errores1(){
        if (this.state.error===1){
            return "Invalid eMail or password.";
        }
    }
    errores2(){
        var mostrarErrores = "";

        if (this.state.register_error===2){
            mostrarErrores = "Please fill input fields.";
        }
        if (this.state.register_error===3){
            mostrarErrores =  "eMail already taken!";
        }
        if (this.state.register_error === 4) {
            mostrarErrores = "Invalid access token.";
        }

        if (this.state.register_error === 5){
            // String de errores
            var erroresInicio = "";


            var resultPasswordConfirmation = this.validatePasswordConfirm();
            if (!resultPasswordConfirmation){
                erroresInicio = erroresInicio + "Passwords don't match! ";
            }

            if (erroresInicio === ""){
                this.setState({ register_error: '' });
                document.getElementById('register-error-msg').style.display = 'none';
            }

            mostrarErrores =  erroresInicio;
        }

        return mostrarErrores;
    }

    showLoginForm() {
      var login = document.getElementById("auth-login");
      var register = document.getElementById("auth-register");

      login.style.display = "block";
      register.style.display = "none";
    }

    showRegisterForm() {
      var login = document.getElementById("auth-login");
      var register = document.getElementById("auth-register");

      login.style.display = "none";
      register.style.display = "block";
    }

    render() {
        const isLoggedIn = this.state.redirect;
        return(
            <div className="layout-scene-wrapper">

              <div className="layout-container-form">
                <div className="layout-top-container">
                  <Grid>
                    <Row>
                      <Col lg={6}>
                        <img src={logo} alt="logo" width={45} className="layout-logoimg"/>
                      </Col>
                      <Col lg={3} className="layout-button-top-auth">
                        <Button
                          type="submit"
                          className="button-override-font button-fillpadding button-auth"
                          onClick={() => this.showLoginForm()}
                          block>Login</Button>
                      </Col>
                      <Col lg={3} className="layout-button-top-auth">
                        <Button
                          type="submit"
                          className="button-override-font button-fillpadding button-auth"
                          onClick={() => this.showRegisterForm()}
                          block>Register</Button>
                      </Col>
                    </Row>
                  </Grid>
                </div>

                <div className="layout-auth-main">
                  <div>
                      <img src={artwork_people} alt="people" width={250}/>
                      <div className="layout-auth-title">
                        CRM
                      </div>
                  </div>

                  <Grid className="layout-login-container" id="auth-login">
                      <Row>
                          <Col lg={2}>
                          </Col>
                          <Col lg={2}>
                          </Col>
                          <Col lg={4}>
                            <div className="layout-auth-title">
                              Login
                            </div>
                            <div className="layout-usr-img">
                                <img src={user_pic} alt="user" />
                            </div>
                            <form onSubmit={(e)=>this.login(e)}>
                                <FormGroup>
                                    <InputGroup>
                                        <FormControl
                                            type="email"
                                            name="emailLogin"
                                            placeholder="Input your eMail"
                                            value={this.state.emailLogin}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <FormControl
                                            name="passwordLogin"
                                            type="password"
                                            placeholder="Input your password"
                                            value={this.state.passwordLogin}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <div className="error-msg" id="login-error-msg">
                                    { this.errores1() }
                                </div>
                                <div>
                                    <Button
                                      type="submit"
                                      bsStyle="primary"
                                      className="button-override-font button-fillpadding"
                                      block>Login</Button>
                                    {isLoggedIn ? (
                                        <Redirect  to="/dashboard" />
                                    ) : (
                                        this.nothing()
                                    )}
                                </div>
                            </form>
                          </Col>
                          <Col lg={2}>
                          </Col>
                          <Col lg={2}>
                          </Col>
                      </Row>
                  </Grid>

                  <Grid className="layout-register-container" id="auth-register">
                    <Row>
                      <Col lg={2}>
                      </Col>
                      <Col lg={2}>
                      </Col>
                      <Col lg={4}>
                        <div className="layout-auth-title">
                          Register
                        </div>
                        <div className="layout-usr-img">
                            <img src={user_pic} alt="user" />
                        </div>
                        <form onSubmit={(e)=>this.register(e)}>
                            <FormGroup>
                                <InputGroup>
                                    <FormControl
                                        name="nameUser"
                                        type="text"
                                        placeholder="Name"
                                        onChange={this.handleChange}
                                        value={this.state.nameUser}
                                        required
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <FormControl
                                        name="lastname"
                                        type="text"
                                        placeholder="Surname"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <FormControl
                                        name="email"
                                        type="email"
                                        placeholder="eMail"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.email}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <FormControl
                                        name="password"
                                        type="password"
                                        placeholder="Select password"
                                        onChange={this.handleChange}
                                        value={this.state.password}
                                        required
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <FormControl
                                        name="confirm_password"
                                        type="password"
                                        placeholder="Input password again"
                                        onChange={this.handleChange}
                                        value={this.state.confirm_password}
                                        required
                                    />
                                </InputGroup>
                            </FormGroup>
                            <div className="layout-policies">
                                <FormGroup>
                                    <Checkbox inline onChange={this.handleCheckBox} required>
                                        By creating your user you agree to the user terms held within this company.
                                    </Checkbox>
                                </FormGroup>
                            </div>
                            <div className="error-msg" id="register-error-msg">
                                { this.errores2() }
                            </div>
                            <div>
                                <Button
                                  type="submit"
                                  bsStyle="primary"
                                  className="button-override-font button-fillpadding"
                                  block>Create account</Button>
                            </div>
                        </form>
                      </Col>
                      <Col lg={2}>
                      </Col>
                      <Col lg={2}>
                      </Col>
                    </Row>
                  </Grid>
                </div>

                </div>
                <div className="layout-footer">
                    &copy;2018, Cusbromen Labs.
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps, null)(AuthScreen);
