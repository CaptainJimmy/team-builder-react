import firebase from 'firebase';
const config = {
  /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: 'AIzaSyAs-pvvES8mNUuogQRevNNiIrP1Agr8Y0o',
  authDomain: 'react-team-builder.firebaseapp.com',
  databaseURL: 'https://react-team-builder.firebaseio.com',
  projectId: 'react-team-builder',
  storageBucket: 'react-team-builder.appspot.com',
  messagingSenderId: '1009991020079'
};
var fire = firebase.initializeApp(config);
export default fire;
