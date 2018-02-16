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
    Car_in: 0,
    duration_time_in: 0,
    time_in: 0,
    Car_out: 0,
    duration_time_out: 0,
    time_out: 0
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
    // var newItems = false;
     var rootRef = firebase.database().ref().child('logCar_in');
     //const speedRef = rootRef.child('Car');
     
     // rootRef.on('value', snap => {
     rootRef.limitToLast(1).on('value', snap => {
       snap.forEach(shot => {
            // console.log(shot.val());
            console.log(shot.val().Car_in)
            console.log(shot.val().duration_time_in)
            console.log(shot.val().time_in)

           this.setState ({
             Car: shot.val().Car_in,
             Times: shot.val().duration_time_in,
             time: shot.val().time_in
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
                      Amount of Car : <strong>{this.state.Car_in}</strong> Cars.
                    </div>
                
                    <div className="notification">
                      Type Car (Times) : <strong>{this.state.duration_time_in}</strong> ms.
                    </div>
                    
                    <div className="notification">
                      Last Time Stamp : <strong>{this.state.time_in}</strong>
                    </div>

                

              </div>

      </div>
    </div>
        )           
    }
}

export default Card