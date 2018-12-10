import React from "react";
import {
  Button,
  Modal,
  Form,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class ParkPop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      imgSrc: null,
      selectedFile: null
    };
    this.acceptedFileTypes = "image/x-png, image/png, image/jpg,image.jpeg";
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  handleBtnClick = () => {
    this.props.handleAddClick(this.state.selectedFile, done => {
      if (done) {
        this.toggle();
      }
    });
  };
  fileSelectedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
    var reader = new FileReader();

    reader.onload = e => {
      this.setState({ imgSrc: e.target.result });
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  render() {
    return (
      <div>
        <Button id="addbtn" onClick={this.toggle} color="primary">
          Add Park{this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add Park</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="addParkImageFile">Upload Image</Label>
              <input
                type="file"
                name="file"
                id="addParkImageFile"
                accept={this.acceptedFileTypes}
                multiple={false}
                onChange={this.fileSelectedHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="addParkTitle">Title</Label>
              <Input
                type="text"
                name="Title"
                id="addParkTitle"
                placeholder="Insert Park Title"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="addParkDescription">Description</Label>
              <Input
                type="text"
                name="Description"
                id="addParkDescription"
                placeholder="Insert Park Description"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="addParkArea">Area</Label>
              <Input
                type="text"
                name="Area"
                id="addParkArea"
                placeholder="Insert Park Area"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="addParkPrice">Price</Label>
              <Input
                type="text"
                name="Price"
                id="addParkPrice"
                placeholder="Insert Price"
              />
            </FormGroup>
            <Form inline>
              <label htmlFor="addParkStart" id="StartL">
                Start
              </label>
              <label htmlFor="addParkEnd" id="EndL">
                End
              </label>
            </Form>
            <Form inline>
              <input
                type="time"
                className="form-control"
                id="addParkStart"
                placeholder="Start Hour"
              />
              <input
                type="time"
                className="form-control"
                id="addParkEnd"
                placeholder="End Hour"
              />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleBtnClick}>
              Add
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ParkPop;
