import React from 'react';
import useFirestore from '../hooks/useFirestore.js';
import useToday from '../hooks/useToday.js';

import { Card, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import moola from './img/money.png';
import zap from './img/energy.png';
import volt from './img/power.png';
import speed from './img/speed.png';

const Kwh = (props) => {
  let date = moment(props.date).format("YYYY-MM-DD");
  let today = moment().format("YYYY-MM-DD");

  const { kwh, power, cash, pf } = useFirestore(date);
  const { kwht, powert, casht, pft } = useToday(today);

  if (today === date) {
    return (

      <Row>
        <Col sm={3}>
          <Card className="my-3 mx-auto">
            <div className="card-body">
              <img src={moola}
                width="26"
                height="26"
                alt='money'
                className="d-inline-block align-top mr-2" />
              <h5 className="card-text d-inline-block align-middle"> RM {casht}</h5>
              <p className="card-text"><small className="text-muted">Estimated Machine Cost </small></p>
            </div>
          </Card>
        </Col>

        <Col sm={3}>
          <Card className="my-3 mx-auto">
            <div className="card-body">
              <img src={zap}
                width="26"
                height="26"
                alt='kwh'
                className="d-inline-block align-top mr-2" />
              <h5 className="card-text d-inline-block align-middle" id='kwh'> {kwht} kWh </h5>
              <p className="card-text"><small className="text-muted">Energy Used</small></p>
            </div>
          </Card>
        </Col>

        <Col sm={3}>
          <Card className="my-3 mx-auto">
            <div className="card-body">
              <img src={speed}
                width="26"
                height="26"
                alt='kwh'
                className="d-inline-block align-top mr-2" />
              <h5 className="card-text d-inline-block align-middle" id='kwh'> {pft}  </h5>
              <p className="card-text"><small className="text-muted">Power Factor</small></p>
            </div>
          </Card>
        </Col>

        <Col sm={3}>
          <Card className="my-3 mx-auto">
            <div className="card-body">
              <img src={volt}
                width="27"
                height="27"
                alt='power'
                className="d-inline-block align-top mr-2" />
              <h5 className="card-text d-inline-block align-middle" > {powert} W </h5>
              <p className="card-text"><small className="text-muted">Power Draw</small></p>
            </div>
          </Card>
        </Col>
      </Row>


    )
  }
  else {
    return (
      <Row>
        <Col sm={3}>
          <Card className="my-3 mx-auto">
            <div className="card-body">
              <img src={moola}
                width="26"
                height="26"
                alt='money'
                className="d-inline-block align-top mr-2" />
              <h5 className="card-text d-inline-block align-middle"> RM {cash}</h5>
              <p className="card-text"><small className="text-muted">Estimated Machine Cost </small></p>
            </div>
          </Card>
        </Col>

        <Col sm={3}>
          <Card className="my-3 mx-auto">
            <div className="card-body">
              <img src={zap}
                width="26"
                height="26"
                alt='kwh'
                className="d-inline-block align-top mr-2" />
              <h5 className="card-text d-inline-block align-middle" id='kwh'> {kwh} kWh </h5>
              <p className="card-text"><small className="text-muted">Energy Used</small></p>
            </div>
          </Card>
        </Col>

        <Col sm={3}>
          <Card className="my-3 mx-auto">
            <div className="card-body">
              <img src={speed}
                width="26"
                height="26"
                alt='kwh'
                className="d-inline-block align-top mr-2" />
              <h5 className="card-text d-inline-block align-middle" id='kwh'> {pf}  </h5>
              <p className="card-text"><small className="text-muted">Power Factor</small></p>
            </div>
          </Card>
        </Col>

        <Col sm={3}>
          <Card className="my-3 mx-auto">
            <div className="card-body">
              <img src={volt}
                width="27"
                height="27"
                alt='power'
                className="d-inline-block align-top mr-2" />
              <h5 className="card-text d-inline-block align-middle" > {power} W </h5>
              <p className="card-text"><small className="text-muted">Power Draw</small></p>
            </div>
          </Card>
        </Col>
      </Row>
    )
  }


}

export default Kwh;

