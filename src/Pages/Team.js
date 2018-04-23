import React, { Component } from 'react';
import {
  Modal,
  Grid,
  Col,
  Button,
  Row,
  FormControl,
  FormGroup,
  ControlLabel,
  Well,
  Panel
} from 'react-bootstrap';
import fire from '../fire';
import moment from 'moment';
import Message from '../utils/Message';
import './Team.css';
import Jumbo from '../Components/jumbo';
import Messages from '../Components/Messages';

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
      usersLoggedIn.unshift(newUser);
      this.setState({ usersLoggedIn });
    });
  }
  componentDidMount() {
    fire
      .database()
      .ref('/users/' + this.state.currentUser.id)
      .onDisconnect()
      .remove(() => {
        let newMessage = new Message('User has disconnected.', 'System');
        //   text: ,
        //   name: 'System' || this.state.currentUser.name,
        //   time: Date.now()
        // };
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
    this.setState({ renderModal: false, currentUser }, () => {
      let tempMessage = this.state.currentUser.name + ' has connected.';
      let newMsg = {
        text: tempMessage,
        user: 'System',
        time: Date.now()
      };
      if (newMsg) {
        fire
          .database()
          .ref('/messages')
          .push(newMsg);
        this.setState({ modalUser: { name: '', xbox: '' } });
      } else {
        console.log('newMsg empty');
      }
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

  render() {
    return (
      <Grid>
        <Row>
          <Grid>
            <Jumbo
              currentUser={this.state.currentUser}
              users={this.state.usersLoggedIn.length}
            />
            <Row>
              <Col md={6} xs={12}>
                <Well>
                  <Panel>
                    <Panel.Heading>
                      <p>Users Online</p>
                    </Panel.Heading>
                    <Panel.Body>
                      {this.state.usersLoggedIn.map(item => {
                        return (
                          <div key={item.id}>
                            <p>
                              <strong> {item.user}</strong> Xbox Name:{' '}
                              {item.xboxID}
                            </p>
                          </div>
                        );
                      })}
                    </Panel.Body>
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
