import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

import '../index.css';

const OwnerDashboardParkListItem = ({ park, handleDelete }) => {
  if (park.userdetails.length > 0) {
    return (
      <div className="ownerParkCard">
        <Card className="parkCard">
          <CardImg top width="100%" src={park.image} />
          <CardBody>
            <CardTitle>{park.title}</CardTitle>
            <CardSubtitle>{park.description}</CardSubtitle>
            <CardText>{""}</CardText>
            <CardText>{"Area : "}{park.location}</CardText>
            <CardText>UserName:{park.userdetails[0].name}</CardText>
            <CardText>PlateNumber:{park.userdetails[0].plateNumber}</CardText>
            <CardText>PhoneNumber{park.userdetails[0].phoneNumber}</CardText>
            <CardText>{"Time : From "}{park.startTime}{" To "}{park.endTime}</CardText>
            <Button color="danger" onClick={() => { handleDelete(park._id) }}>Delete</Button>
          </CardBody>
        </Card>
      </div>

    );
  }
  else {
    return (
      <div className="ownerParkCard">
        <Card className="parkCard">
          <CardImg top width="100%" src={park.image} />
          <CardBody>
            <CardTitle>{park.title}</CardTitle>
            <CardSubtitle>{park.description}</CardSubtitle>
            <CardText>{""}</CardText>
            <CardText>{"Area : "}{park.location}</CardText>
            <CardText>{"Time : From "}{park.startTime}{" To "}{park.endTime}</CardText>
            <Button color="danger" onClick={() => { handleDelete(park._id) }}>Delete</Button>
          </CardBody>
        </Card>
      </div>
    )
  }
};

export default OwnerDashboardParkListItem;
