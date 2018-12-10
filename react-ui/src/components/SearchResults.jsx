import React, { Component } from "react";
import ParksList from "./ParksList.jsx";
import GoogleMapsContainer from "./GoogleMapsContainer.jsx";
import { Container, Row, Col } from "reactstrap";
import $ from "jquery";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = { parks: [] };
  }
  componentDidMount() {
    $("#searchtxt").show();
    $("#searchbtn").show();
    $("#root").css("background", "white");
    console.log("query from the home comp", this.props.location.query);
    $.ajax({
      url: "/parks",
      type: "POST",
      data: JSON.stringify({
        location: this.props.location.query
          ? this.props.location.query
          : "khalda"
      }),
      contentType: "application/json",
      success: parks => {
        this.setState({ parks });
      },
      error: function (error) {
        console.error("errorrrrrr", error);
      }
    });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm="7">
            <ParksList parks={this.state.parks} />
          </Col>
          <Col sm="5">
            <div className="sticky">
              <GoogleMapsContainer parks={this.state.parks} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SearchResults;
