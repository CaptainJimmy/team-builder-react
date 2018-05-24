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
    },
    boatCrews: []
  };

  componentWillMount() {
    let usersRef = fire
      .database()
      .ref('/users')
      .orderByKey();

    usersRef.once('value').then(snapshot => {
      snapshot.forEach(childSnap => {
        let newUser = {
          user: childSnap.val().name,
          xboxID: childSnap.val().xbox,
          id: childSnap.key
        };
        let usersLoggedIn = [...this.state.usersLoggedIn];
        usersLoggedIn.unshift(newUser);
        this.setState({ usersLoggedIn });
      });
    });
    fire
      .database()
      .ref('/boats')
      .orderByKey()
      .once('value')
      .then(snapshot => {
        snapshot.forEach(childSnap => {
          console
          if (childSnap.val()) {
            let boatCrews = [...this.state.boatCrews];
            boatCrews.push(childSnap.val().boatCrews);
            this.setState({ boatCrews });
          }
        });
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
              <UsersOnline
                usersLoggedIn={this.state.usersLoggedIn}
                boatCrews={this.state.boatCrews}
              />
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
