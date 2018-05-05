import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import fire from '../fire';
import './Team.css';
import Jumbo from '../Components/jumbo';
import Messages from '../Components/Messages';
import UsersOnline from '../Components/Users';
import Login from '../Components/Login';
import style from './style';

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
    }
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
        let newMessage = {
          text: 'User has disconnected.',
          name: 'System',
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

  render() {
    return (
      <Grid style={style.team}>
        <Row>
          <Grid>
            <Jumbo
              currentUser={this.state.currentUser}
              users={this.state.usersLoggedIn.length}
            />
            <Row>
              <UsersOnline usersLoggedIn={this.state.usersLoggedIn} />
              <Messages currentUser={this.state.currentUser} />
            </Row>
          </Grid>
        </Row>
        <Login
          renderModal={this.state.renderModal}
          submit={this.submitHandler}
          modalUser={this.state.modalUser}
          nameHandler={this.nameHandler}
          xboxHandler={this.xboxHandler}
        />
      </Grid>
    );
  }
}
export { Team };
