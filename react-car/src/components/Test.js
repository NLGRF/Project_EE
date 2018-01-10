import React from 'react';
import ia from '../static/img/ice-age.jpg'
import * as firebase from 'firebase';
import { log } from 'util';

class Test extends React.Component {

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

                  
        <div className="container">

           <div className="content">
           <center>
              <img src={ia} width="600" height="450" alt="Placeholder image" />
           </center>  
            
                <div className="media-content">
                <div className="container">
            
                <div className="content">
  
                    <br/>
  
                      <div className="notification is-info">
                      <center>
                        Amount of Car : <strong>{this.state.Car}</strong> Cars.
                      </center>
                      </div>

                      <div className="notification is-primary">
                      <center>
                        Type Car (Times) : <strong>{this.state.Times}</strong> ms.
                      </center>
                      </div>
                      
                      <div className="notification is-link">
                      <center>
                        Last Time Stamp : <strong>{this.state.time}</strong>
                      </center>
                      </div>
  
                  
  
                </div>
  
        </div>
                </div>
            </div>
        </div>    
        )           
    }
}

export default Test