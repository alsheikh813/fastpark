import React from "react";
import {
  Card,
  CardBody,
  Form,
} from "reactstrap";

import "../style/Home.css";
import { Link } from "react-router-dom";

class CardHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  render() {
    return (
      <div>
        <Card id="homecard">
          <h4>Choose your Park anywhere any time .</h4>
          <CardBody>
            <label htmlFor="Where">Where</label>
            <input
              type="text"
              className="form-control"
              placeholder="Area Name"
              value={this.state.inputValue}
              onChange={evt => this.updateInputValue(evt)}
            />
            <Form inline>
              <label htmlFor="inputEmail3" id="StartL">
                Start
              </label>
              <label htmlFor="inputPassword4" id="EndL">
                End
              </label>
            </Form>
            <Form inline>
              <input
                type="text"
                className="form-control"
                id="Start"
                placeholder="Start Hour"
              />
              <input
                type="text"
                className="form-control"
                id="End"
                placeholder="End Hour"
              />
            </Form>
            <Link
              to={{
                pathname: "/SearchResults",
                query: this.state.inputValue.toLowerCase()
              }}
            >
              Search
            </Link>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default CardHome;
