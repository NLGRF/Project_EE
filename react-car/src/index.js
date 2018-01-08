import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
/*
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBh3o25C3ps26N6F1E_ZkAmoerYro0ymkw",
    authDomain: "react-car.firebaseapp.com",
    databaseURL: "https://react-car.firebaseio.com",
    projectId: "react-car",
    storageBucket: "react-car.appspot.com",
    messagingSenderId: "344111144524"
  };
  firebase.initializeApp(config);
*/

var config = {
    apiKey: "AIzaSyDxRSrCeKLvOpk2lWcB3cNCdGKvIQ42zvk",
    authDomain: "esp32-ccar.firebaseapp.com",
    databaseURL: "https://esp32-ccar.firebaseio.com",
    projectId: "esp32-ccar",
    storageBucket: "esp32-ccar.appspot.com",
    messagingSenderId: "63800538899"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
