import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import $ from "jquery";

class HostSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: '',
      name: '',
      email: '',
      password: '',
      phoneNumber: ''
    };

    this.toggle = this.toggle.bind(this);
    this.signup = this.signup.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // send post recuest from client to BE to update user and add a new owner on database.
  signup() {
    this.toggle()

    const ownerObj = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.phoneNumber,
      phoneNumber: this.state.phoneNumber
    }

    console.log("noooooooooooooooooo", ownerObj);
    $.ajax({
      url: "/ownersignup",
      type: "POST",
      data: JSON.stringify(ownerObj),
      contentType: "application/json",
      success: function (data) {
        window.localStorage.setItem("user", JSON.stringify(data))
        console.log("pleasssssss", data);
      },
      error: function (error) {
        console.error("errorrrrrr", error);
      }
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

  toggle() {
    this.setState({
      modal: !this.state.modal
    });

  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          Sign Up Host{this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Host Car</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="text">User Name</Label>
              <Input
                type="text"
                name="name"
                id="fullName"
                placeholder="input your full name"
                value={this.state.fullName}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="input your Email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="input your password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone Number</Label>
              <Input
                type="phone"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="input your phone number"
                value={this.state.phoneNumber}
                onChange={this.handleInputChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.signup} href="/searchresults">
              Sign up
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

export default HostSignUp;
