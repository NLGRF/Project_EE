import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {

  constructor() {
    super();
    this.state = {
      Car: 0
    }
  }

  componentDidMount() {
   /* this.setState ({
      speed: 25
    }) */
     const rootRef = firebase.database().ref().child('logCar');
     const speedRef = rootRef.child('Car');
     speedRef.on('value', snap => {
       this.setState ({
        Car: snap.val()
       });
     });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.speed}</h1>
      </div>
    );
  }
}

export default App;
