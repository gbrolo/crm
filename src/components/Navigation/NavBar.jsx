import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import '../../styles/_navigation-bar.css';
import '../../res/icons/font-awesome-4.7.0/css/font-awesome.min.css';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  render() {
    return (
      <div className="navigation-container">
        <div className="nav-title-container">
          <div className="nav-title-logo">

          </div>
        </div>
        <ul>
          <Dropdown>
            <li><i className="fa fa-dashboard" aria-hidden="true"></i><Link to='/dashboard'> Dashboard</Link></li>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <li><i className="fa fa-group" aria-hidden="true"></i> Manage clients</li>
            </DropdownTrigger>
            <DropdownContent>
              <li id="dropdown"><i className="fa fa-plus" aria-hidden="true"></i><Link to='/dashboard/clients/add'> Add client</Link></li>
              <li id="dropdown"><i className="fa fa-edit" aria-hidden="true"></i><Link to='/dashboard/clients/update'> Edit clients</Link></li>
            </DropdownContent>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <li><i className="fa fa-flag" aria-hidden="true"></i> Info and reports</li>
            </DropdownTrigger>
            <DropdownContent>
              <li id="dropdown"><i className="fa fa-users" aria-hidden="true"></i><Link to='/dashboard/info/show/clients'> Show clients</Link></li>
              <li id="dropdown"><i className="fa fa-list" aria-hidden="true"></i><Link to='/dashboard/info/show/catalogue'> Show catalogues</Link></li>
            </DropdownContent>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <li><i className="fa fa-address-card" aria-hidden="true"></i> Projects</li>
            </DropdownTrigger>
            <DropdownContent>
              <li id="dropdown"><i className="fa fa-briefcase" aria-hidden="true"></i><Link to='/dashboard/project/add'> Add Project</Link></li>            
            </DropdownContent>
          </Dropdown>
        </ul>
        <div className="navbar-footer">
            &copy;2018, Cusbromen Labs.
        </div>
      </div>
    );
  }
}

export default NavBar;
