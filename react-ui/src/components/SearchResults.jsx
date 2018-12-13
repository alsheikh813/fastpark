import React, { Component } from "react";
import ParksList from "./ParksList.jsx";
import GoogleMapsContainer from "./GoogleMapsContainer.jsx";
import { Container, Row, Col } from "reactstrap";
import $ from "jquery";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parks: [],
      filteredParks: [],
      startTime: '',
      endTime: '',
      query: ''
    };
  }

  componentWillMount() {
    this.setState({
      startTime: this.props.location.state.startTime,
      endTime: this.props.location.state.endTime,
      query: this.props.location.query
    });
  }

  componentDidMount() {
    $("#searchtxt").show();
    $("#searchbtn").show();
    $("#root").css("background", "white");

    $.ajax({
      url: "/parks",
      type: "POST",
      data: JSON.stringify({
        location: this.state.query
          ? this.state.query
          : "khalda"
      }),
      contentType: "application/json",
      success: parks => {
        this.setState({ parks });
        this.setState({
          filteredParks: this.state.parks.filter((item) => {
            let startTimeObject = new Date();
            let endTimeObject = new Date(startTimeObject);
            startTimeObject.setHours(parseInt(this.state.startTime.slice(0, 2)), parseInt(this.state.startTime.slice(3, 5)), 0);
            endTimeObject.setHours(parseInt(this.state.endTime.slice(0, 2)), parseInt(this.state.endTime.slice(3, 5)), 0);

            let itemStartTimeObject = new Date();
            let itemEndTimeObject = new Date(itemStartTimeObject);
            itemStartTimeObject.setHours(parseInt(item.startTime.slice(0, 2)), parseInt(item.startTime.slice(3, 5)), 0);
            itemEndTimeObject.setHours(parseInt(item.endTime.slice(0, 2)), parseInt(item.endTime.slice(3, 5)), 0);

            return startTimeObject >= itemStartTimeObject && endTimeObject <= itemEndTimeObject;
          })
        });
      },
      error: function (error) {
        console.error("errorrrrrr", error);
      }
    });
  }

  render() {
    return (
      <Container fluid className="bgcolor">
        <Row>
          <Col sm="7">
            <ParksList parks={this.state.filteredParks.length ? this.state.filteredParks : this.state.parks} />
          </Col>
          <Col sm="5">
            <div className="sticky">
              <GoogleMapsContainer parks={this.state.filteredParks} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SearchResults;
