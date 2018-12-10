import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import $ from "jquery"
import SignUp from "./SignUp.jsx";
import SignIn from "./SignIn.jsx";
import HostCar from "./HostCar.jsx";
import "../style/NavbarCom.css";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      modal: false,
      hideNav: window.localStorage.getItem('user') ? true : false,
      //window.localStorage.getItem('user')==null,
      storage: window.localStorage.getItem('user')
    };

    this.toggle = this.toggle.bind(this);
    // this.signup = this.signup.bind(this);
    // //login
    // this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    $("#searchtxt").hide();
    $("#searchbtn").hide();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      modal: !this.state.modal,
    });
  }

  logout() {
    console.log("logout function:");
    this.setState({
      storage: window.localStorage.removeItem('user'),
    });
  }

  render() {
    return (
      <div className="mynav">
        <Navbar color="navbar-dark bg-dark" dark expand="md" className="nav">
          <NavbarBrand href="/" className="NavbarBrand">
            ParkIn
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <input
              id="searchtxt"
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />

            <button
              id="searchbtn"
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>

            <Nav className="ml-auto" navbar>
              <NavItem style={{ 'display': this.state.hideNav ? 'none' : 'block' }}>
                <HostCar />
              </NavItem>
              <NavItem style={{ 'display': this.state.hideNav ? 'none' : 'block' }}>
                <SignIn handleClick={this.handleLoginClick} />
              </NavItem>
              <NavItem style={{ 'display': this.state.hideNav ? 'none' : 'block' }}>
                <SignUp />
              </NavItem>
              <NavItem>
                <NavLink style={{ 'display': this.state.hideNav === false ? 'none' : 'block' }} href={"/"} onClick={this.logout}>Log out{this.props.buttonLabel}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/About">About</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
