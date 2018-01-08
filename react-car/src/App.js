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
    /*
    //อันนี้ได้  
    //เเต่ get car ล่าสดน่าจะใช้ func ช่วยสักอย่างของ firebase 
     const rootRef = firebase.database().ref().child('logCar');
     //const speedRef = rootRef.child('Car');
     rootRef.on('value', snap => {
       snap.forEach(shot => {
            console.log(shot.val());
            console.log(shot.val().Car)
       });
     });
    */
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
