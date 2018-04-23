import React, { Component } from 'react';
import fire from '../../fire';
import { Panel, Well, Row, Col, FormGroup, FormControl } from 'react-bootstrap';
import moment from 'moment';

class Messages extends Component {
  state = { messages: [] };

  componentDidMount() {
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
  }
  messageSubmit = () => {
    let newMessage = {
      text: this.state.currentMessage,
      name: this.state.currentUser.name,
      time: Date.now()
    };
    // let newMessage = new Message(
    //   this.state.currentUser.name,
    //   this.state.currentMessage
    // );
    console.log(newMessage);
    fire
      .database()
      .ref('/messages')
      .push(newMessage)
      .then(() => {
        this.setState({ currentMessage: '' });
      });
  };
  render() {
    return (
      <Col md={6} xs={12}>
        <Well>
          <Panel>
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
          <Panel className="chatRoom">
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
                          {moment(message.time).format('HH:mm:SS MM/DD/YYYY')}
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

export { Messages };
