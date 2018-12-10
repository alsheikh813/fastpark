import React from "react";
import {
  Button,
  Modal,
  NavLink,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import HostSignUp from "./HostSignUp.jsx";
import $ from "jquery";

class HostCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: '',
      password: ''
    };

    this.toggle = this.toggle.bind(this);
    this.login = this.login.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // send post request from client to BE to signin as an owner
  login() {
    this.toggle()

    const ownerObj = {
      email: this.state.email,
      password: this.state.password
    }

    console.log('here signinownerloginownerloginownerlogin', ownerObj);
    $.ajax({
      url: "/ownerlogin",
      type: "POST",
      data: JSON.stringify(ownerObj),
      contentType: "application/json",
      success: function (data) {
        window.localStorage.setItem("user", data)
        console.log("pleasssssss", data);
      },
      error: function (error) {
        console.error("errorrrrrr", error);
      }
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }


  render() {
    return (
      <div>
        <NavLink onClick={this.toggle}>
          Host Car{this.props.buttonLabel}
        </NavLink>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Host Car</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="input your Email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="input your password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <HostSignUp />
            <Button color="primary" onClick={this.toggle} href="/ownerdashboard">
              Sign in
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default HostCar;
