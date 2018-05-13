import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router'


import { Checkbox, Button, Panel, PanelGroup, FormGroup, FormControl, InputGroup, Grid, Row, Col } from 'react-bootstrap';
import '../styles/_authforms.css';
import '../styles/_generic-screen.css';
import '../res/icons/font-awesome-4.7.0/css/font-awesome.css';

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
            return "Su correo o contraseña no es valido intente de nuevo";
        }
    }
    errores2(){
        var mostrarErrores = "";

        if (this.state.register_error===2){
            mostrarErrores = "Por favor complete los campos.";
        }
        if (this.state.register_error===3){
            mostrarErrores =  "Ese correo ya está registrado.";
        }
        if (this.state.register_error === 4) {
            mostrarErrores = "Token de acceso invalido.";
        }

        if (this.state.register_error === 5){
            // String de errores
            var erroresInicio = "";


            var resultPasswordConfirmation = this.validatePasswordConfirm();
            if (!resultPasswordConfirmation){
                erroresInicio = erroresInicio + "Las contraseñas no coinciden. ";
            }

            if (erroresInicio === ""){
                this.setState({ register_error: '' });
                document.getElementById('register-error-msg').style.display = 'none';
            }

            mostrarErrores =  erroresInicio;
        }

        return mostrarErrores;
    }


    render() {
        const isLoggedIn = this.state.redirect;
        return(
            <div className="main-auth-container">
                <div className="container-form">
                    <div className="top-container">
                        <img src={logo} alt="logo" width={25}/>
                    </div>

                    <div>
                        <img src={artwork_people} alt="people" width={350}/>
                    </div>

                    <Grid>
                        <Row className="show-grid">
                            <Col xs={4} xsPush={4}>
                                <PanelGroup defaultActiveKey="1" className="panel-group" accordion>

                                    <Panel header={<h1>Iniciar sesión</h1>} eventKey="1" className="text-transform-up-sp">
                                        <div className="img-container">
                                            <img src={user_pic} alt="user" />
                                        </div>
                                        <form onSubmit={(e)=>this.login(e)}>
                                            <FormGroup>
                                                <InputGroup className="form-element">
                                                    <FormControl
                                                        type="email"
                                                        name="emailLogin"
                                                        placeholder="Ingrese su correo"
                                                        value={this.state.emailLogin}
                                                        onChange={this.handleChange}
                                                        required
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="form-element">
                                                    <FormControl
                                                        name="passwordLogin"
                                                        type="password"
                                                        placeholder="Ingrese su contraseña"
                                                        value={this.state.passwordLogin}
                                                        onChange={this.handleChange}
                                                        required
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                            <div className="error-msg" id="login-error-msg">
                                                { this.errores1() }
                                            </div>
                                            <FormGroup>
                                                <div className="forgot-password-lg">
                                                    <Link to={'/resetpassword'}>¿Ha olvidado su contraseña?</Link>
                                                </div>
                                            </FormGroup>
                                            <div>
                                                <Button type="submit" className="button-s" block>Ingresar</Button>
                                                {isLoggedIn ? (
                                                    <Redirect  to="/dashboard" />
                                                ) : (
                                                    this.nothing()
                                                )}



                                            </div>
                                        </form>
                                    </Panel>

                                    <Panel header={<h1>Crear cuenta</h1>} eventKey="2" className="text-transform-up-sp">
                                        <form onSubmit={(e)=>this.register(e)}>
                                            <FormGroup>
                                                <InputGroup className="form-element">
                                                    <FormControl
                                                        name="nameUser"
                                                        type="text"
                                                        placeholder="Nombres"
                                                        onChange={this.handleChange}
                                                        value={this.state.nameUser}
                                                        required
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="form-element">
                                                    <FormControl
                                                        name="lastname"
                                                        type="text"
                                                        placeholder="Apellidos"
                                                        onChange={this.handleChange}
                                                        required
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="form-element">
                                                    <FormControl
                                                        name="email"
                                                        type="email"
                                                        placeholder="Ingrese su correo"
                                                        required
                                                        onChange={this.handleChange}
                                                        value={this.state.email}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="form-element">
                                                    <FormControl
                                                        name="password"
                                                        type="password"
                                                        placeholder="Elija su contraseña"
                                                        onChange={this.handleChange}
                                                        value={this.state.password}
                                                        required
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="form-element">
                                                    <FormControl
                                                        name="confirm_password"
                                                        type="password"
                                                        placeholder="Ingrese nuevamente su contraseña"
                                                        onChange={this.handleChange}
                                                        value={this.state.confirm_password}
                                                        required
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                            <div className="politicas">
                                                <FormGroup>
                                                    <Checkbox inline onChange={this.handleCheckBox} required>
                                                        Al crear tu cuenta, estás aceptando los términos del servicio y las políticas de privacidad de Freelanceros.
                                                    </Checkbox>
                                                </FormGroup>
                                            </div>
                                            <div className="error-msg" id="register-error-msg">
                                                { this.errores2() }
                                            </div>
                                            <div>
                                                <Button type = "submit" className="button-s" block>Crear cuenta</Button>
                                            </div>
                                        </form>
                                    </Panel>

                                </PanelGroup>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <div className="container-form">
                    <div className="footer">
                        &copy;2017, Manco Labs.
                    </div>
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
