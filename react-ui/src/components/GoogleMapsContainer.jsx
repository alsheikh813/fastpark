import React from "react";
import '../index.css';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import {
  CardText,
  CardTitle,
  Button
} from "reactstrap";

class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, //hides or shows the infowindow
      activeMarker: {}, //shows the active marker onclick
      selectedPlace: {} // shows the infowindow to the selectedplace marker
    };
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  componentDidMount() { }
  onMarkerClick = (props, marker, e) => {
    console.log("pppppppp", props);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };
  onMapClick = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() {
    const style = {
      width: "100%"
    };

    return (
      <Map
        item
        xs={12}
        style={style}
        google={this.props.google}
        onClick={this.onMapClick}
        zoom={10}
        initialCenter={{ lat: 31.953158, lng: 35.950359 }}
      >
        {this.props.parks.map(park => {
          return (
            <Marker
              onClick={this.onMarkerClick}
              title={park.title}
              key={park.title}
              image={park.image}
              description={park.description}
              startTime={park.startTime}
              endTime={park.endTime}
              price={park.price}
              location={park.location}
              position={{ lat: park.lat, lng: park.long }}
            />
          );
        })}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onMapClick}
        >
          <img className="mapInf" width="150px" height="100px" src={this.state.selectedPlace.image} alt=""></img>
          <CardTitle className="mapInf">{this.state.selectedPlace.location}</CardTitle>
          <CardText className="mapInf">Price: {this.state.selectedPlace.price}</CardText>
          <CardText className="mapInf">from {this.state.selectedPlace.startTime} to {this.state.selectedPlace.endTime}</CardText>
          <Button className="buttonMap" color="primary" >Book Now</Button>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  //add API key
  apiKey: ""
})(GoogleMapsContainer);
