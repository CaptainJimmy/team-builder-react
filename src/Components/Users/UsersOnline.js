import React, { Component } from 'react';
import { Col, Well, Panel } from 'react-bootstrap';
import style from '../../Pages/style';

class UsersOnline extends Component {
  render() {
    return (
      <Col md={6} xs={12}>
        <Well style={style.well}>
          <Panel style={style.panel}>
            <Panel.Heading>
              <p>Users Online</p>
            </Panel.Heading>
            <Panel.Body>
              {this.props.usersLoggedIn.map(item => {
                return (
                  <div key={item.id}>
                    <p>
                      <strong> {item.user}</strong> Xbox Name: {item.xboxID}
                    </p>
                  </div>
                );
              })}
              <Well>
                {this.props.boatCrews ? (
                  this.props.boatCrews.map((boat, index) => (
                    <h3>You have been assigned to: Boat Crew {index} </h3>
                  ))
                ) : (
                  <h5> Crews have not been assigned yet. Stand By </h5>
                )}
              </Well>
            </Panel.Body>
          </Panel>
        </Well>
      </Col>
    );
  }
}
export default UsersOnline;
