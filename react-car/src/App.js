import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import { log } from 'util';
// import CardTest from './Card';
import pt from './static/img/car.jpg'

class App extends Component {
/*
  constructor() {
    super();
    this.state = {
      speed: 0
    }
  }
*/

constructor() {
  super();
  this.state = {
    Car: 0,
    Times: 0,
    time: 0
  }
}

  componentDidMount() {
   /* this.setState ({
      speed: 25
    }) */
    /*
     const rootRef = firebase.database().ref().child('react');
     const speedRef = rootRef.child('speed');
     speedRef.on('value', snap => {
       this.setState ({
        speed: snap.val()
       });
     });
     */
    
    //อันนี้ได้  
    //เเต่ get car ล่าสดน่าจะใช้ func ช่วยสักอย่างของ firebase 
     var newItems = false;
     var rootRef = firebase.database().ref().child('logCar');
     //const speedRef = rootRef.child('Car');
     
     // rootRef.on('value', snap => {
     rootRef.limitToLast(1).on('value', snap => {
       snap.forEach(shot => {
            // console.log(shot.val());
             console.log(shot.val().Car)
             console.log(shot.val().Times)
             console.log(shot.val().time)

            this.setState ({
              Car: shot.val().Car,
              Times: shot.val().Times,
              time: shot.val().time
             });
            
       }); 
     });
    
  }

  render() {
    return (
      <div className="App">
        <h1>Amount of Car : {this.state.Car} Cars</h1>
        <br/>
        <h1>Type Car (Times) : {this.state.Times} ms</h1>
        <br/>
        <h1>Time Stamp : {this.state.time}</h1>
        <br/>
        <img src={pt} width="300" height="225" />
      </div>
  
    );
  }
}

export default App;
