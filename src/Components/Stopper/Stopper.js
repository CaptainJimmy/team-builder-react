import React, { Component } from 'react';
// import Stopwatch from 'react-stopwatch';
import { Col, Panel } from 'react-bootstrap';
import moment from 'moment';
import fire from '../../fire';

// const stopwatchStyles = {
//   containerOutter: {
//     width: '160px',
//     height: '80px',
//     position: 'inherit'
//   },
//   containerInner: {
//     lineHeight: '10'
//   }
// };

class Stopper extends Component {
  state = {
    timestamp: null
  };

  componentWillMount() {
    this.timestampGrabber();
  }

  // componentWillUnmount() {
  //   this.unmountHandler();
  // }

  // unmountHandler = () => {
  //   console.log('going offline');
  //   fire
  //     .database()
  //     .ref('/clock/timeStamp')
  //     .off();
  // };

  timestampGrabber = () => {
    let clockRef = fire.database().ref('/clock/timeStamp');
    clockRef.on('value', snapshot => {
      let timestamp = snapshot.val().timeStampValue;
      this.setState({ timestamp }, () => {
        console.log('in the cb');
        ///this.timestampHandler();
      });
    });
  };
  // timestampHandler = () => {
  //   let now = Date.now();
  //   let then = this.state.timestamp;

  //   let ms = moment(now).diff(moment(then));
  //   console.log('ms', ms);
  //   let d = moment.duration(ms);
  //   this.setState({ hours: d.hours, minutes: d.minutes, seconds: d.seconds });
  // };
  render() {
    return (
      <Col>
        <Panel>
          {/* <Stopwatch
          seconds={0}
          minutes={0}
          hours={0}
          theme="secondary"
          custom={stopwatchStyles}
        /> */}
          <h4 className="text-center">
            The game was started at:
            {moment(this.state.timestamp).format('HH:mm:ss')}
          </h4>
        </Panel>
      </Col>
    );
  }
}

export default Stopper;
