import React from 'react';
import pt from '../static/img/car.jpg'
import * as firebase from 'firebase';
import { log } from 'util';

class Card extends React.Component {

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

      <div className="tile is-parent">
      <article className="tile is-child notification is-info">
        <p className="title">SUT</p>
        <p className="subtitle">@Gate 2</p>
        <figure className="image is-2by3">
        <img src={pt} content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </figure>
      </article>
      
      <div className="container">
            
              <div className="content">

                

                    <div className="notification">
                      Amount of Car : <strong>{this.state.Car}</strong> Cars.
                    </div>
                
                    <div className="notification">
                      Type Car (Times) : <strong>{this.state.Times}</strong> ms.
                    </div>
                    
                    <div className="notification">
                      Last Time Stamp : <strong>{this.state.time}</strong>
                    </div>

                

              </div>

      </div>
    </div>
        )           
    }
}

export default Card