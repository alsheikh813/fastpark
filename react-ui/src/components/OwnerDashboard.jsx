import React from "react";
import ParkPop from "./ParkPop.jsx";

import $ from "jquery";
import "../style/AddPark.css";
import { storage } from "../firebase/index";
import OwnerDashboardParkList from "./OwnerDashboardParkList.jsx";
import { Bounce } from "react-activity";
import "react-activity/dist/react-activity.css";

class OwnerDashboard extends React.Component {
  constructor(props) {
    super(props);
    //TODO: CHANGE THE OWNER ID TO THE ONE COMING FROM DB ON LOGIN
    this.state = {
      lat: "",
      long: "",
      ownerId: "5c026ba1548c172ce9294538",
      parks: [],
      isBouncing: false,
      isDeleted: false
    };
  }

  componentDidMount() {
    $("#root").css("background", "white");
    this.getLocation(location => {
      this.setState({ lat: location.lat, long: location.long });
    });
    this.fetchParks();
  }

  fetchParks() {
    $.ajax({
      url: "/parks",
      type: "POST",
      data: JSON.stringify({ ownerId: this.state.ownerId }),
      contentType: "application/json",
      success: parks => {
        this.setState({ parks });
      },
      error: function (error) {
        console.error("errorrrrrr", error);
      }
    });
  }

  getLocation(cb) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        cb({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  saveToDB = data => {
    $.ajax({
      url: "/addpark",
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: data => {
        console.log("success: ADDED PARK", this);
        this.setState({ isBouncing: false });
        this.fetchParks();
      },
      error: function (error) {
        console.error("errorrrrrr", error);
      }
    });
  };

  handleAddButtonClick = (image, cb) => {
    //handle the exception when no image file is selected
    try {
      this.setState({ isBouncing: true });
      //starting put request to firebase storage
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      //the on function is event listener that provide 3 functions progress,error,complete
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progress function
        },
        error => {
          // error function
          console.log("errr", error);
        },
        () => {
          // complete function
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              const park = {
                title: $("#addParkTitle").val(),
                description: $("#addParkDescription").val(),
                location: $("#addParkArea")
                  .val()
                  .toLowerCase(),
                startTime: $("#addParkStart").val(),
                endTime: $("#addParkEnd").val(),
                price: `${$("#addParkPrice").val()} JD`,
                image: url,
                lat: this.state.lat,
                long: this.state.long,
                ownerId: this.state.ownerId
              };
              this.saveToDB(park);
              cb(true);
            });
        }
      );
    } catch (error) {
      alert('Error: No image!');
      console.log('Error: No image!')
    } finally {
      this.setState({ isBouncing: false });
    }
  };

  handleDeleteClick = (parkId) => {
    $.ajax({
      url: "/deletepark",
      type: "DELETE",
      data: JSON.stringify({
        parkId: parkId

      }),
      contentType: "application/json",
      success: (data) => {
        console.log("pleasssssss", data);
        this.fetchParks();
      },
      error: function (error) {
        console.error("errorrrrrr", error);
      }
    });
  }

  render() {
    return (
      <div>
        <div className="parkP">
          <Bounce className="bouncy" animating={this.state.isBouncing} />
          <ParkPop handleAddClick={this.handleAddButtonClick} />
        </div>
        <OwnerDashboardParkList parks={this.state.parks} handleDelete={this.handleDeleteClick} />
      </div>
    );
  }
}

export default OwnerDashboard;
