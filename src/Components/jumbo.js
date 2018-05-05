import React, { Component } from 'react';
import { Jumbotron, Row, Col } from 'react-bootstrap';

class Jumbo extends Component {
  render() {
    return (
      <Jumbotron>
        <Row>
          <Col md={6}>
            <h4>
              Hello{' '}
              {this.props.currentUser ? this.props.currentUser.name : 'User'}.
            </h4>
          </Col>
          <Col md={6}>
            <p>
              Current Users Logged In:
              {this.props.users ? this.props.users : 0}
            </p>
          </Col>
        </Row>
      </Jumbotron>
    );
  }
}

export default Jumbo;
