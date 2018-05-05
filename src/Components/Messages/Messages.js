import React, { Component } from 'react';
import fire from '../../fire';
import {
  Panel,
  Well,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Row
} from 'react-bootstrap';
import moment from 'moment';
import style from '../../Pages/style.js';
import Stopper from '../Stopper';

class Messages extends Component {
  state = {
    messages: [],
    currentMessage: '',
    stopWatchRunning: false
  };
  componentDidMount() {
    this.messageListener();
    this.clockRunningListener();
  }

  messageListener = () => {
    let messagesRef = fire
      .database()
      .ref('/messages')
      .orderByChild('time')
      .limitToLast(15);
    messagesRef.on('child_added', snapshot => {
      let newMessage = {
        user: snapshot.val().name,
        time: snapshot.val().time,
        text: snapshot.val().text
      };
      //console.log('newmsg', newMessage);
      let messages = [...this.state.messages];
      messages.unshift(newMessage);
      this.setState({ messages });
    });
  };

  clockRunningListener = () => {
    let clockRef = fire.database().ref('/clock/stopwatch/');
    clockRef.on('value', snapshot => {
      let stopWatchRunning = snapshot.val().stopWatchRunning;
      this.setState({ stopWatchRunning });
    });
  };
  messageSubmit = () => {
    let newMessage = {
      text: this.state.currentMessage,
      name: this.props.currentUser.name,
      time: Date.now()
    };

    fire
      .database()
      .ref('/messages')
      .push(newMessage)
      .then(() => {
        this.setState({ currentMessage: '' });
      });
  };
  messageChangeHandler = event => {
    this.setState({ currentMessage: event.target.value });
  };

  render() {
    return (
      <Col md={6} xs={12}>
        <Well style={style.well}>
          <Row>
            <Col>
              <Panel style={style.panel}>
                <Panel.Heading>
                  <p>Users Online</p>
                </Panel.Heading>
                <Panel.Body>
                  <FormGroup>
                    <ControlLabel>Write a message!</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.currentMessage}
                      placeholder="Enter Message"
                      onChange={this.messageChangeHandler}
                    />
                    <Button onClick={this.messageSubmit}> Send it!</Button>
                  </FormGroup>
                </Panel.Body>
              </Panel>
            </Col>
            {this.state.stopWatchRunning ? <Stopper /> : null}
          </Row>
          <Panel style={style.panel.chat}>
            <Panel.Heading>
              <p>Messaging</p>
            </Panel.Heading>
            <Panel.Body>
              {this.state.messages
                ? this.state.messages.map(message => {
                    return (
                      <p key={message.time}>
                        <strong> {message.user} </strong>
                        {message.text}
                        <br />
                        <i>
                          {moment(message.time).format('HH:mm:ss MM/DD/YYYY')}
                        </i>
                      </p>
                    );
                  })
                : null}
            </Panel.Body>
          </Panel>
        </Well>
      </Col>
    );
  }
}

export default Messages;
