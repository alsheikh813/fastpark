import React from "react";
import {
  Card,
  CardBody,
  Form,
} from "reactstrap";

import "../style/Home.css";
import { Link } from "react-router-dom";
import TimePicker from 'react-time-picker';


class CardHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      startTime: '00:00',
      endTime: '23:59'
    };
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  onChangeStart = startTime => this.setState({ startTime });
  onChangeEnd = endTime => this.setState({ endTime });

  render() {
    return (
      <div>
        <Card id="homecard">
          <h4>Your <em>favorite</em> Park anywhere any time.</h4>
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

            <TimePicker
              onChange={this.onChangeStart}
              value={this.state.startTime}
              className={["timepicker1", "searchbtn"]}
              clockClassName="clock"
            />

            <TimePicker
              onChange={this.onChangeEnd}
              value={this.state.endTime}
              className={["timepicker2", "searchbtn"]}
              clockClassName="clock"
            />

            <Link
              to={{
                pathname: "/SearchResults",
                query: this.state.inputValue.toLowerCase(),
                state: { startTime: this.state.startTime, endTime: this.state.endTime }
              }}
              className="btn btn-info"
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
