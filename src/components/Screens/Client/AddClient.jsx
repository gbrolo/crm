import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactFlagsSelect from 'react-flags-select';
import DatePicker from 'react-date-picker';
import { Button, FormGroup, FormControl, InputGroup, Grid, Row, Col } from 'react-bootstrap';

// Styles
import '../../../styles/_layout.css';
import '../../../styles/_addclient.css';
import 'react-flags-select/css/react-flags-select.css';

class AddClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthDate: new Date(),
      name: "",
      lastname: "",
      email: "",
      sex: "",
      state: "",
      country: "",
      twitter: "",
      linkedin: ""
    }
  }

  onChangeDate = birthDate => this.setState({ birthDate })
  onChangeName = name => this.setState({ name })
  onChangeLastName = lastname => this.setState({ lastname })
  onChangeEmail = email => this.setState({ email })
  onChangeSex = sex => this.setState({ sex })
  OnChangeCivilState = state => this.setState({ state })
  OnChangeCountry = country => this.setState({ country })
  OnChangeTwitterHandle = twitter => this.setState({ twitter })
  OnChangeLinkedInHandle = linkedin => this.setState({ linkedin })

  render() {
    return (
      <div className="layout-scene-wrapper">
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
                     <FormControl type="text" placeholder="Name" className="addclient-form-input-control"
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
                     <FormControl type="text" placeholder="Last Name" className="addclient-form-input-control"
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
                     <FormControl type="text" placeholder="E-mail" className="addclient-form-input-control"
                     onChange={(event) => this.onChangeEmail(event.target.value)}
                     required
                     />
                   </InputGroup>
                </FormGroup>

                <div className="addclient-form-input">
                  Sex
                </div>
                <FormGroup>
                   <InputGroup className="addclient-form-input-element">
                     <FormControl componentClass="select" placeholder="Select a sex." className="addclient-form-input-control"
                     onChange={(event) => this.onChangeSex(event.target.value)}
                     required>
                        <option value="male" >Male</option>
                        <option value="female" >Female</option>
                     </FormControl>
                   </InputGroup>
                </FormGroup>

                <div className="addclient-form-input">
                  Civil state
                </div>
                <FormGroup>
                   <InputGroup className="addclient-form-input-element">
                     <FormControl componentClass="select" placeholder="Select a civil state." className="addclient-form-input-control"
                     onChange={(event) => this.OnChangeCivilState(event.target.value)}
                     required>
                        <option value="single" >Single</option>
                        <option value="married" >Married</option>
                        <option value="widow" >Widow</option>
                        <option value="divorced" >Divorced</option>
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
                onSelect = { this.OnChangeCountry }
                required/>

                <div className="addclient-form-input">
                  Twitter
                </div>
                <FormGroup>
                   <InputGroup className="addclient-form-input-element">
                     <FormControl type="text" placeholder="/username" className="addclient-form-input-control"
                     onChange={(event) => this.OnChangeTwitterHandle(event.target.value)}
                     required
                     />
                   </InputGroup>
                </FormGroup>

                <div className="addclient-form-input">
                  LinkedIn
                </div>
                <FormGroup>
                   <InputGroup className="addclient-form-input-element">
                     <FormControl type="text" placeholder="/username" className="addclient-form-input-control"
                     onChange={(event) => this.OnChangeLinkedInHandle(event.target.value)}
                     required
                     />
                   </InputGroup>
                </FormGroup>

              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){ return {} }
export default connect(mapStateToProps, null)(AddClient);
