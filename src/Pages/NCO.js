import React, { Component } from 'react';
import { Grid, Button, Row } from 'react-bootstrap';
import fire from '../fire';
import './Team.css';
import Jumbo from '../Components/jumbo';
import Messages from '../Components/Messages';
import UsersOnline from '../Components/Users';
import Login from '../Components/Login';
import style from './style';
import _ from 'lodash';

class NCO extends Component {
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
    stopWatchRunning: false,
    timestamp: null,
    allBoats: []
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
    this.disconnectHandler();
    this.stopWatchHandler();
  }

  disconnectHandler = () => {
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
  };
  stopWatchHandler = () => {
    fire
      .database()
      .ref('/clock')
      .on('value', snapshot => {
        let stopWatchRunning = snapshot.val().stopwatch.stopWatchRunning;
        let timestamp = snapshot.val().timeStamp.timeStampValue;
        this.setState({ stopWatchRunning, timestamp });
      });
  };
  toggleStopWatch = () => {
    let toggle = !this.state.stopWatchRunning;
    console.log(toggle);
    let ts = Date.now();
    console.log('ts', ts);

    fire
      .database()
      .ref('/clock/stopwatch')
      .set({
        stopWatchRunning: toggle
      });
    fire
      .database()
      .ref('/clock/timeStamp')
      .set({
        timeStampValue: ts
      });
  };

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
  formCrews = () => {
    let crewArray = [...this.state.usersLoggedIn];
    crewArray = _.shuffle(crewArray);
    let allBoats = [];
    while (crewArray.length) {
      allBoats.push(crewArray.splice(0, 4));
    }
    console.log(allBoats);
    this.setState({ allBoats });
    fire
      .database()
      .ref('/boats')
      .set({
        boats: allBoats
      });
  };

  shuffleCrews = () => {
    let crewArray = [...this.state.usersLoggedIn];
    crewArray = _.shuffle(crewArray);
    this.setState({ usersLoggedIn: crewArray });
  };

  clearCrews = () => {
    this.setState({ allBoats: [] });
    fire
      .database()
      .ref('/boats')
      .set({
        boats: []
      });
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
            <Button
              bsSize="large"
              bsStyle="info"
              onClick={this.toggleStopWatch}
            >
              {!this.state.stopWatchRunning
                ? 'Start the Watch'
                : 'Stop The Watch'}
            </Button>
            <Button
              bsSize="large"
              bsStyle="success"
              onClick={this.shuffleCrews}
            >
              Shuffle
            </Button>
            <Button bsSize="large" bsStyle="success" onClick={this.formCrews}>
              Form
            </Button>

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
export { NCO };
