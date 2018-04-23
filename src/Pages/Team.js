import React, { Component } from 'react';
import {
  Modal,
  Grid,
  Col,
  Button,
  Row,
  Jumbotron,
  FormControl,
  FormGroup,
  ControlLabel,
  Well,
  Panel
} from 'react-bootstrap';
import fire from '../fire';
import moment from 'moment';

class Team extends Component {
  state = {
    loggedIn: false,
    renderModal: true,
    usersLoggedIn: [],
    currentUser: {
      name: '',
      xboxID: '',
      id: ''
    },
    modalUser: {
      name: '',
      xbox: ''
    },
    currentMessage: '',
    messages: []
  };

  componentWillMount() {
    let usersRef = fire
      .database()
      .ref('/users')
      .orderByKey()
      .limitToLast(40);

    usersRef.on('child_added', snapshot => {
      let newUser = {
        user: snapshot.val().name,
        xboxID: snapshot.val().xbox,
        id: snapshot.key
      };
      let usersLoggedIn = [...this.state.usersLoggedIn];
      usersLoggedIn.push(newUser);
      this.setState({ usersLoggedIn });
    });
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
      console.log('newmsg', newMessage);
      let messages = [...this.state.messages];
      messages.push(newMessage);
      this.setState({ messages });
    });
  }
  componentDidMount() {
    fire
      .database()
      .ref('/users/' + this.state.currentUser.id)
      .onDisconnect()
      .remove(() => {
        let newMessage = {
          text: 'User has disconnected.',
          name: 'System' || this.state.currentUser.name,
          time: Date.now()
        };
        fire
          .database()
          .ref('/messages')
          .push(newMessage);
      });
  }

  clickHandler = event => {
    this.setState({ renderModal: !this.state.renderModal });
  };

  submitHandler = event => {
    event.preventDefault();
    let newKey = fire
      .database()
      .ref('/users')
      .push(this.state.modalUser).key;
    let currentUser = { ...this.state.modalUser };
    currentUser.id = newKey;
    this.setState({ renderModal: false, currentUser }, function() {
      this.setState({ modalUser: { name: '', xbox: '' } });
    });
  };

  nameHandler = event => {
    let modalUser = { ...this.state.modalUser };
    modalUser.name = event.target.value;
    this.setState({ modalUser });
  };
  xboxHandler = event => {
    let modalUser = { ...this.state.modalUser };
    modalUser.xbox = event.target.value;
    this.setState({ modalUser });
  };

  messageChangeHandler = event => {
    this.setState({ currentMessage: event.target.value });
  };
  messageSubmit = event => {
    event.preventDefault();
    let newMessage = {
      text: this.state.currentMessage,
      name: this.state.currentUser.name,
      time: Date.now()
    };
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
      <Grid>
        <Row>
          <Grid>
            <Jumbotron>
              <h1> Hello User. </h1>

              <Button bsStyle="info" bsSize="lg" onClick={this.clickHandler}>
                Trigger
              </Button>
              <p> Current Users Logged In: {this.state.usersLoggedIn.length}</p>
            </Jumbotron>
            <Row>
              <Col md={6} xs={12}>
                <Well>
                  {this.state.usersLoggedIn.map(item => {
                    return (
                      <Panel key={item.id}>
                        <p>
                          User Name: {item.user} Xbox Name: {item.xboxID}{' '}
                        </p>
                      </Panel>
                    );
                  })}
                </Well>
              </Col>
              <Col md={6} xs={12}>
                <Well>
                  <Panel>
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
                  </Panel>
                  <Panel>
                    {this.state.messages
                      ? this.state.messages.map((message, index) => {
                          return (
                            <p key={index}>
                              <strong> {message.user} </strong>
                              {message.text}
                              <br />
                              <i>
                                {moment(message.time).format(
                                  'HH:mm:SS MM/DD/YYYY'
                                )}
                              </i>
                            </p>
                          );
                        })
                      : null}
                  </Panel>
                </Well>
              </Col>
            </Row>
          </Grid>
        </Row>
        <Modal show={this.state.renderModal}>
          <Modal.Header closeButton>
            <Modal.Title> Enter Your Info To Join The Event </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.submitHandler}>
              <FormGroup>
                <ControlLabel>Enter Your Gamer ID</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.modalUser.name}
                  placeholder="Enter ID"
                  onChange={this.nameHandler}
                />
                <ControlLabel>Enter Your Xbox ID</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.modalUser.xbox}
                  placeholder="Enter ID"
                  onChange={this.xboxHandler}
                />
                <Button type="submit" bsSize="large" bsStyle="info">
                  Submit User
                </Button>
              </FormGroup>
            </form>
          </Modal.Body>
        </Modal>
      </Grid>
    );
  }
}
export { Team };
