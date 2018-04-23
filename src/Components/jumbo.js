import React from 'react';
import { Jumbotron, Row, Col } from 'react-bootstrap';

const jumbo = props => {
  return (
    <Jumbotron>
      <Row>
        <Col md={6}>
          <h4>Hello {props.currentUser ? props.currentUser.name : 'User'}.</h4>
        </Col>
        <Col md={6}>
          <p>
            Current Users Logged In:
            {props.users ? props.users : 0}
          </p>
        </Col>
      </Row>
    </Jumbotron>
  );
};

export default jumbo;
