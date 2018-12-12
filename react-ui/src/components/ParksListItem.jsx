import React from "react";
import { Component } from "react";
import { Link } from 'react-router-dom';
import $ from "jquery";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

class ParksListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true,
      modalsignUp: false,
      modalBook: false
    };
  }

  handleBookClick = () => {
    if (window.localStorage.getItem("user")) {
      window.localStorage.setItem("book", true);
      $.ajax({
        url: "/updatepark",
        type: "POST",
        data: JSON.stringify({
          parkId: this.props.parkInfo._id,
          userId: window.localStorage.getItem("user")._id
        }),
        contentType: "application/json",
        success: function (data) {
          console.log("update", data);
        },
        error: function (error) {
          console.error("errorrrrrr", error);
        }
      });
    } else {
      window.localStorage.setItem("book", false);
    }


  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,

    });
  }

  handleAlert = () => {
    alert("Please login first.")
  }

  render() {
    return (
      <div>
        <Card className="mapCardN">
          <CardImg width="100%" src={this.props.parkInfo.image} />
          <CardBody>
            <CardTitle>{this.props.parkInfo.title}</CardTitle>
            <CardSubtitle>{this.props.parkInfo.description}</CardSubtitle>
            <CardText>{""}</CardText>
            <CardText>{"Area : "}{this.props.parkInfo.location}</CardText>
            <CardText>Owner Name : {this.props.parkInfo.ownerdetails[0].name}</CardText>
            <CardText>Phone Number : {this.props.parkInfo.ownerdetails[0].phoneNumber}</CardText>
            <CardText>{"Time : From "}{this.props.parkInfo.startTime}{" To "}{this.props.parkInfo.endTime}</CardText>
            <CardText>Rating : {this.props.parkInfo.ownerdetails[0].rating}</CardText>
            <CardText>{"Price : "}{this.props.parkInfo.price}</CardText>
            <Link to={{ pathname: "/book", park: this.props.parkInfo }} className="bookButton" >
              <Button className="btn btn-info">Book Now</Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ParksListItem;













