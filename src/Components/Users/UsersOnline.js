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
            </Panel.Body>
          </Panel>
        </Well>
      </Col>
    );
  }
}
export default UsersOnline;
