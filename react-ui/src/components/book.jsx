import React from "react";
import $ from "jquery";



import { Button } from "reactstrap";
import { Container } from "reactstrap";
import '../style/ParkListItem.css';
import './GoogleMapsContainer.jsx';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Rating from "react-rating";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


library.add(faStroopwafel);

class book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      username: "",
      lat: "",
      long: "",
      cardnum: " ",
      month:"",
      year:"",
      code: "",
      name: "",
      country:"",
      zip:"",
      modalCheckOut: false,
      modalPayment: false,
      modalPaymentAlert: false,
      nestedModal: false,
      closeAll: false,
    };
    this.ratingCount = 0;
  }


  handleChangeRate = e => {
    console.log(e);

    this.ratingCount = e;
  };


  creditcard = () => {
    console.log('creditcard')
    this.toggleModalPaymentAlert()

    const CardObj = {
      cardnum: this.state.cardnum,
      month:this.state.month,
      year:this.state.year,
      code: this.state.code,
      name: this.state.name,
      country: this.state.country,
      zip: this.state.zip
     
    }
    $.ajax({
      url: "/card",
      type: "POST",
      data: JSON.stringify(CardObj),
      contentType: "application/json",
      success: function (data) {
        window.localStorage.setItem("creditcard", data)
        console.log("send", data);
      },
      error: function (error) {
        console.error("dont send", error);
      }
    });
  };




  // send post recuest from client to BE to update park data
  handleCheckOutClick = () => {
    this.toggle();
    $.ajax({
      url: "/updatepark",
      type: "POST",
      data: JSON.stringify({
        parkId: this.props.location.park._id,
        userId: null
      }),
      contentType: "application/json",
      success: function (data) {
        console.log("update", data);
      },
      error: function (error) {
        console.error("errorrrrrr", error);
      }
    });

    // send post request from client to BE to update rating.
    $.ajax({
      url: "/updateownerrating",
      type: "POST",
      data: JSON.stringify({
        rating: this.ratingCount
      }),
      contentType: "application/json",
      success: function (data) {
        console.log("update", data);
      },
      error: function (error) {
        console.error("errorrrrrr", error);
      }
    });
  };

  /* this function to give alert for cash and payment */

  toggleModalPaymentAlert = () => {
    this.setState({
      modalPayment: !this.state.modalPayment,
    });
    alert('your book has been confirmed!')
  };



  toggleModalPayment = () => {
    this.setState({
      modalPayment: !this.state.modalPayment,
    });
  };


  toggleNested = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  toggleModalCheckOut = () => {
    this.setState({
      modalCheckOut: !this.state.modalCheckOut
    });
  };
  // make the input only accept numbers
  onChange = (e) => {
    // const re = /^[0-9\b]+$/;
    // if (e.target.value === '' || re.test(e.target.value)) {
    this.setState({
     cardnum: e.target.value
    })
    // }
  };

  onChangeMonth = (e) => {
    this.setState({
      month: e.target.value
    })
  };
  onChangeYear = (e) => {
    this.setState({
      year: e.target.value
    })
  };
  onChangeCountry = (e) => {
    this.setState({
      country: e.target.value
    })
  };

  onChangeName = (e) => {
    this.setState({
      name: e.target.value
    })
  };

  onChangeCode = (e) => {
    this.setState({
      code: e.target.value
    })
  };

  onChangeZip = (e) => {
    this.setState({
      zip: e.target.value
    })
  };




  componentDidMount() {
    $("#root").css("background", "white");
    console.log("parkinfo:", this.props.location.park);

    this.getLocation(location => {
      this.setState({ lat: location.lat, long: location.long });
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

  render() {
    return (
      <Container fluid>
        <div className="directionBtn">

        </div>
        <div className="bookingCard">

          <Card>
            <CardBody>
              <CardTitle>
                Location: {this.props.location.park.location}
              </CardTitle>
              <CardSubtitle>
                Price: {this.props.location.park.price}
              </CardSubtitle>
            </CardBody>
            <img
              width="100%"
              src={this.props.location.park.image}
              alt=""
            />
            <CardBody>
              <CardText>
                Owner Name: {this.props.location.park.ownerdetails[0].name}
              </CardText>
              <CardText>
                Mobile: {this.props.location.park.ownerdetails[0].phoneNumber}
              </CardText>
              <CardText>
                Start Time: {this.props.location.park.startTime}
              </CardText>
              <CardText>End Time: {this.props.location.park.endTime}</CardText>
              <Button
                target="_blank"
                rel="noopener noreferrer"
                href={`http://maps.google.com/maps?saddr=${this.state.lat},${
                  this.state.long
                  }&daddr=${this.props.location.park.lat},${
                  this.props.location.park.long
                  }`}
                className="btn btn-info"
              >
                Direction
              </Button>{" "}

              <Button color="danger" onClick={this.toggleModalPayment}>Payment
            </Button>{" "}
              <Modal isOpen={this.state.modalPayment}  >
                <ModalHeader >Choose A Method</ModalHeader>
                <ModalBody>

                  <Button color="secondary" onClick={this.toggleModalPaymentAlert}>Cash</Button>{' '}


                  <Button color="success" onClick={this.toggleNested}>Credit Card</Button>
                  <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggleModalPayment : undefined}>
                    <ModalHeader toggle={this.toggleModalPayment} >New Payment Card
              <div className="card-array ml-space-xs">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPzYcBx_HYYhdsweDzzyAKju99aABR2M4lS5ZmCV_OBxnPei-vYg"
                          alt="MasterCard" width="100em" height="50em" align="left" hspace="250"></img>
                      </div>
                    </ModalHeader>
                    <ModalBody><Form>
                      <Row form>
                        <Col md={11}>
                          <FormGroup>
                            <div className="inputwithicon">
                              <Label for="exampleEmail" hidden>Card number</Label>
                              <Input type="text" name="card" id="cardnumber"

                                value={this.state.cardnum} onChange={this.onChange}
                                placeholder="Card number"

                              />
                              <i className=" fa fa-lock fa-xs" aria-hidden="true"></i>
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={3}>
                          <FormGroup>
                            <Input type="select" name="select" id="monthSelect" placeholder="MM"
                           value={this.state.month} onChange={this.onChangeMonth}
                            >
                              <option>MM</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <Input type="select" name="select" id="monthSelect" placeholder="YYY"
                            value={this.state.year} onChange={this.onChangeYear}
                            >
                              <option>YYY</option>
                              <option>2018</option>
                              <option>2019</option>
                              <option>2020</option>
                              <option>2021</option>
                              <option>2022</option>
                              <option>2023</option>
                              <option>2024</option>
                              <option>2025</option>
                              <option>2026</option>
                              <option>2027</option>
                              <option>2028</option>
                              <option>2029</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={5}>
                          <FormGroup>
                            <div className="inputwithicon" >

                              <Label for="exampleZip" hidden>Security code</Label>
                              <Input type="text" name="zip" id="exampleZip" placeholder="security code"
                                value={this.state.code} onChange={this.onChangeCode}
                              />
                              <i className=" far fa-question-circle" fa-xs aria-hidden="true" ></i>
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={11}>
                          <FormGroup>

                            <Label for="exampleEmail" hidden>NameOnCard</Label>
                            <Input type="text" name="card" id="cardnumber"
                              name={this.state.name} onChange={this.onChangeName}
                              placeholder="Name on card"

                            />


                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Input type="select" name="select" id="monthSelect" placeholder="MM"
                             value={this.state.country} onChange={this.onChangeCountry}
                            >
                              <option value="">Country</option>
                              <option value="AFG">Afghanistan</option>
                              <option value="ALA">Åland Islands</option>
                              <option value="ALB">Albania</option>
                              <option value="DZA">Algeria</option>
                              <option value="ASM">American Samoa</option>
                              <option value="AND">Andorra</option>
                              <option value="AGO">Angola</option>
                              <option value="AIA">Anguilla</option>
                              <option value="ATA">Antarctica</option>
                              <option value="ATG">Antigua and Barbuda</option>
                              <option value="ARG">Argentina</option>
                              <option value="ARM">Armenia</option>
                              <option value="ABW">Aruba</option>
                              <option value="AUS">Australia</option>
                              <option value="AUT">Austria</option>
                              <option value="AZE">Azerbaijan</option>
                              <option value="BHS">Bahamas</option>
                              <option value="BHR">Bahrain</option>
                              <option value="BGD">Bangladesh</option>
                              <option value="BRB">Barbados</option>
                              <option value="BLR">Belarus</option>
                              <option value="BEL">Belgium</option>
                              <option value="BLZ">Belize</option>
                              <option value="BEN">Benin</option>
                              <option value="BMU">Bermuda</option>
                              <option value="BTN">Bhutan</option>
                              <option value="BOL">Bolivia, Plurinational State of</option>
                              <option value="BES">Bonaire, Sint Eustatius and Saba</option>
                              <option value="BIH">Bosnia and Herzegovina</option>
                              <option value="BWA">Botswana</option>
                              <option value="BVT">Bouvet Island</option>
                              <option value="BRA">Brazil</option>
                              <option value="IOT">British Indian Ocean Territory</option>
                              <option value="BRN">Brunei Darussalam</option>
                              <option value="BGR">Bulgaria</option>
                              <option value="BFA">Burkina Faso</option>
                              <option value="BDI">Burundi</option>
                              <option value="KHM">Cambodia</option>
                              <option value="CMR">Cameroon</option>
                              <option value="CAN">Canada</option>
                              <option value="CPV">Cape Verde</option>
                              <option value="CYM">Cayman Islands</option>
                              <option value="CAF">Central African Republic</option>
                              <option value="TCD">Chad</option>
                              <option value="CHL">Chile</option>
                              <option value="CHN">China</option>
                              <option value="CXR">Christmas Island</option>
                              <option value="CCK">Cocos (Keeling) Islands</option>
                              <option value="COL">Colombia</option>
                              <option value="COM">Comoros</option>
                              <option value="COG">Congo</option>
                              <option value="COD">Congo, the Democratic Republic of the</option>
                              <option value="COK">Cook Islands</option>
                              <option value="CRI">Costa Rica</option>
                              <option value="CIV">Côte d'Ivoire</option>
                              <option value="HRV">Croatia</option>
                              <option value="CUB">Cuba</option>
                              <option value="CUW">Curaçao</option>
                              <option value="CYP">Cyprus</option>
                              <option value="CZE">Czech Republic</option>
                              <option value="DNK">Denmark</option>
                              <option value="DJI">Djibouti</option>
                              <option value="DMA">Dominica</option>
                              <option value="DOM">Dominican Republic</option>
                              <option value="ECU">Ecuador</option>
                              <option value="EGY">Egypt</option>
                              <option value="SLV">El Salvador</option>
                              <option value="GNQ">Equatorial Guinea</option>
                              <option value="ERI">Eritrea</option>
                              <option value="EST">Estonia</option>
                              <option value="ETH">Ethiopia</option>
                              <option value="FLK">Falkland Islands (Malvinas)</option>
                              <option value="FRO">Faroe Islands</option>
                              <option value="FJI">Fiji</option>
                              <option value="FIN">Finland</option>
                              <option value="FRA">France</option>
                              <option value="GUF">French Guiana</option>
                              <option value="PYF">French Polynesia</option>
                              <option value="ATF">French Southern Territories</option>
                              <option value="GAB">Gabon</option>
                              <option value="GMB">Gambia</option>
                              <option value="GEO">Georgia</option>
                              <option value="DEU">Germany</option>
                              <option value="GHA">Ghana</option>
                              <option value="GIB">Gibraltar</option>
                              <option value="GRC">Greece</option>
                              <option value="GRL">Greenland</option>
                              <option value="GRD">Grenada</option>
                              <option value="GLP">Guadeloupe</option>
                              <option value="GUM">Guam</option>
                              <option value="GTM">Guatemala</option>
                              <option value="GGY">Guernsey</option>
                              <option value="GIN">Guinea</option>
                              <option value="GNB">Guinea-Bissau</option>
                              <option value="GUY">Guyana</option>
                              <option value="HTI">Haiti</option>
                              <option value="HMD">Heard Island and McDonald Islands</option>
                              <option value="VAT">Holy See (Vatican City State)</option>
                              <option value="HND">Honduras</option>
                              <option value="HKG">Hong Kong</option>
                              <option value="HUN">Hungary</option>
                              <option value="ISL">Iceland</option>
                              <option value="IND">India</option>
                              <option value="IDN">Indonesia</option>
                              <option value="IRN">Iran, Islamic Republic of</option>
                              <option value="IRQ">Iraq</option>
                              <option value="IRL">Ireland</option>
                              <option value="IMN">Isle of Man</option>
                              <option value="ISR">Israel</option>
                              <option value="ITA">Italy</option>
                              <option value="JAM">Jamaica</option>
                              <option value="JPN">Japan</option>
                              <option value="JEY">Jersey</option>
                              <option value="JOR">Jordan</option>
                              <option value="KAZ">Kazakhstan</option>
                              <option value="KEN">Kenya</option>
                              <option value="KIR">Kiribati</option>
                              <option value="PRK">Korea, Democratic People's Republic of</option>
                              <option value="KOR">Korea, Republic of</option>
                              <option value="KWT">Kuwait</option>
                              <option value="KGZ">Kyrgyzstan</option>
                              <option value="LAO">Lao People's Democratic Republic</option>
                              <option value="LVA">Latvia</option>
                              <option value="LBN">Lebanon</option>
                              <option value="LSO">Lesotho</option>
                              <option value="LBR">Liberia</option>
                              <option value="LBY">Libya</option>
                              <option value="LIE">Liechtenstein</option>
                              <option value="LTU">Lithuania</option>
                              <option value="LUX">Luxembourg</option>
                              <option value="MAC">Macao</option>
                              <option value="MKD">Macedonia, the former Yugoslav Republic of</option>
                              <option value="MDG">Madagascar</option>
                              <option value="MWI">Malawi</option>
                              <option value="MYS">Malaysia</option>
                              <option value="MDV">Maldives</option>
                              <option value="MLI">Mali</option>
                              <option value="MLT">Malta</option>
                              <option value="MHL">Marshall Islands</option>
                              <option value="MTQ">Martinique</option>
                              <option value="MRT">Mauritania</option>
                              <option value="MUS">Mauritius</option>
                              <option value="MYT">Mayotte</option>
                              <option value="MEX">Mexico</option>
                              <option value="FSM">Micronesia, Federated States of</option>
                              <option value="MDA">Moldova, Republic of</option>
                              <option value="MCO">Monaco</option>
                              <option value="MNG">Mongolia</option>
                              <option value="MNE">Montenegro</option>
                              <option value="MSR">Montserrat</option>
                              <option value="MAR">Morocco</option>
                              <option value="MOZ">Mozambique</option>
                              <option value="MMR">Myanmar</option>
                              <option value="NAM">Namibia</option>
                              <option value="NRU">Nauru</option>
                              <option value="NPL">Nepal</option>
                              <option value="NLD">Netherlands</option>
                              <option value="NCL">New Caledonia</option>
                              <option value="NZL">New Zealand</option>
                              <option value="NIC">Nicaragua</option>
                              <option value="NER">Niger</option>
                              <option value="NGA">Nigeria</option>
                              <option value="NIU">Niue</option>
                              <option value="NFK">Norfolk Island</option>
                              <option value="MNP">Northern Mariana Islands</option>
                              <option value="NOR">Norway</option>
                              <option value="OMN">Oman</option>
                              <option value="PAK">Pakistan</option>
                              <option value="PLW">Palau</option>
                              <option value="PSE">Palestinian Territory, Occupied</option>
                              <option value="PAN">Panama</option>
                              <option value="PNG">Papua New Guinea</option>
                              <option value="PRY">Paraguay</option>
                              <option value="PER">Peru</option>
                              <option value="PHL">Philippines</option>
                              <option value="PCN">Pitcairn</option>
                              <option value="POL">Poland</option>
                              <option value="PRT">Portugal</option>
                              <option value="PRI">Puerto Rico</option>
                              <option value="QAT">Qatar</option>
                              <option value="REU">Réunion</option>
                              <option value="ROU">Romania</option>
                              <option value="RUS">Russian Federation</option>
                              <option value="RWA">Rwanda</option>
                              <option value="BLM">Saint Barthélemy</option>
                              <option value="SHN">Saint Helena, Ascension and Tristan da Cunha</option>
                              <option value="KNA">Saint Kitts and Nevis</option>
                              <option value="LCA">Saint Lucia</option>
                              <option value="MAF">Saint Martin (French part)</option>
                              <option value="SPM">Saint Pierre and Miquelon</option>
                              <option value="VCT">Saint Vincent and the Grenadines</option>
                              <option value="WSM">Samoa</option>
                              <option value="SMR">San Marino</option>
                              <option value="STP">Sao Tome and Principe</option>
                              <option value="SAU">Saudi Arabia</option>
                              <option value="SEN">Senegal</option>
                              <option value="SRB">Serbia</option>
                              <option value="SYC">Seychelles</option>
                              <option value="SLE">Sierra Leone</option>
                              <option value="SGP">Singapore</option>
                              <option value="SXM">Sint Maarten (Dutch part)</option>
                              <option value="SVK">Slovakia</option>
                              <option value="SVN">Slovenia</option>
                              <option value="SLB">Solomon Islands</option>
                              <option value="SOM">Somalia</option>
                              <option value="ZAF">South Africa</option>
                              <option value="SGS">South Georgia and the South Sandwich Islands</option>
                              <option value="SSD">South Sudan</option>
                              <option value="ESP">Spain</option>
                              <option value="LKA">Sri Lanka</option>
                              <option value="SDN">Sudan</option>
                              <option value="SUR">Suriname</option>
                              <option value="SJM">Svalbard and Jan Mayen</option>
                              <option value="SWZ">Swaziland</option>
                              <option value="SWE">Sweden</option>
                              <option value="CHE">Switzerland</option>
                              <option value="SYR">Syrian Arab Republic</option>
                              <option value="TWN">Taiwan, Province of China</option>
                              <option value="TJK">Tajikistan</option>
                              <option value="TZA">Tanzania, United Republic of</option>
                              <option value="THA">Thailand</option>
                              <option value="TLS">Timor-Leste</option>
                              <option value="TGO">Togo</option>
                              <option value="TKL">Tokelau</option>
                              <option value="TON">Tonga</option>
                              <option value="TTO">Trinidad and Tobago</option>
                              <option value="TUN">Tunisia</option>
                              <option value="TUR">Turkey</option>
                              <option value="TKM">Turkmenistan</option>
                              <option value="TCA">Turks and Caicos Islands</option>
                              <option value="TUV">Tuvalu</option>
                              <option value="UGA">Uganda</option>
                              <option value="UKR">Ukraine</option>
                              <option value="ARE">United Arab Emirates</option>
                              <option value="GBR">United Kingdom</option>
                              <option value="USA">United States</option>
                              <option value="UMI">United States Minor Outlying Islands</option>
                              <option value="URY">Uruguay</option>
                              <option value="UZB">Uzbekistan</option>
                              <option value="VUT">Vanuatu</option>
                              <option value="VEN">Venezuela, Bolivarian Republic of</option>
                              <option value="VNM">Viet Nam</option>
                              <option value="VGB">Virgin Islands, British</option>
                              <option value="VIR">Virgin Islands, U.S.</option>
                              <option value="WLF">Wallis and Futuna</option>
                              <option value="ESH">Western Sahara</option>
                              <option value="YEM">Yemen</option>
                              <option value="ZMB">Zambia</option>
                              <option value="ZWE">Zimbabwe</option>
                            </Input>


                          </FormGroup>
                        </Col>
                        <Col md={5}>
                          <FormGroup>
                            <Label for="exampleZip" hidden>Zip/PostalCode</Label>
                            <Input type="text" name="zip" id="exampleZip" placeholder="zip/postalcode"
                            value={this.state.zip} onChange={this.onChangeZip}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <FormGroup check>
                        <Input type="checkbox" name="check" id="exampleCheck" />
                        <Label for="exampleCheck" check>Remember this card</Label>
                      </FormGroup>
                    </Form></ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.creditcard}>Complete Payment</Button>{' '}
                      <Button color="secondary" onClick={this.toggleModalPayment}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </ModalBody>
                <ModalFooter>

                  <Button color="secondary" onClick={this.toggleModalPayment}>Cancel</Button>
                </ModalFooter>
              </Modal>



              <Button className="btn btn-success" onClick={this.toggleModalCheckOut}>
                Check Out
              </Button>

              <Modal
                isOpen={this.state.modalCheckOut}
                toggle={this.toggleModalCheckOut}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggleModalCheckOut}>Check Out</ModalHeader>
                <ModalBody>
                  <div>
                    <p>Please rate the Owner park here</p>
                    <br />
                    <div>
                      {/* <Rating {...this.props} initialRating={this.state.value} />
        <button onClick={this.handleClick}>Reset</button> */}
                      <Rating
                        onChange={this.handleChangeRate}
                        emptySymbol={
                          <img src="../img/star-empty.png" className="icon" alt="" />
                        }
                        fullSymbol={
                          <img src="../img/star-full.png" className="icon" alt="" />
                        }
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    disabled={this.ratingCount}
                    color="primary"
                    onClick={this.handleCheckOutClick}
                  >
                    Check Out
                  </Button>{" "}
                  <Button color="secondary" onClick={this.toggleModalCheckOut}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </CardBody>
          </Card>
        </div>
      </Container>
    );
  }
}

export default book;
