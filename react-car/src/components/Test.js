import React from 'react';
import cin from '../static/img/IN.jpg'
import cout from '../static/img/OUT.jpg'
import * as firebase from 'firebase';

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
     var rootRef_in = firebase.database().ref().child('logCar_in');
     var rootRef_out = firebase.database().ref().child('logCar_out');
     //const speedRef = rootRef.child('Car');
     
     // rootRef.on('value', snap => {
      rootRef_in.limitToLast(1).on('value', snap => {
       snap.forEach(shot => {
            // console.log(shot.val());
             console.log(shot.val().Car_in)
             console.log(shot.val().duration_time_in)
             console.log(shot.val().time_in)

            this.setState ({
              Car_in: shot.val().Car_in,
              duration_time_in: shot.val().duration_time_in,
              time_in: shot.val().time_in
             });
            
       }); 
     });


     rootRef_out.limitToLast(1).on('value', snap => {
      snap.forEach(shot => {
           // console.log(shot.val());
            console.log(shot.val().Car_out)
            console.log(shot.val().duration_time_out)
            console.log(shot.val().time_out)

           this.setState ({
            Car_out: shot.val().Car_out,
            duration_time_out: shot.val().duration_time_out,
            time_out: shot.val().time_out
            });
           
      }); 
    });
    
  }

    render() {
        return (

                  
        <div className="container">

           <div className="content">
           <article className="media">
           <div className="columns">
           
           <div class="media-content">
           
           <div className="column">
           <div className="ml">
           <center>
              <img src={cin} width="600" height="450" />
              <h1>IN</h1>
           </center>  
          
           
            
                <div className="media-content">
                
            
                <div className="content">
  
                    <br/>
  
                      <div className="notification is-info">
                      <center>
                        Amount of Car : <strong>{this.state.Car_in}</strong> Cars.
                      </center>
                      </div>

                      <div className="notification is-primary">
                      <center>
                      duration_time_Car : <strong>{this.state.duration_time_in}</strong> ms.
                      </center>
                      </div>
                      
                      <div className="notification is-link">
                      <center>
                        Last Time Stamp : <strong>{this.state.time_in}</strong>
                      </center>
                      </div>
  
                  
  
                </div>
  
        
                </div>
                </div>
                </div>
                </div>

                <div class="media-content">

                <div className="column">

                <center>
                   <img src={cout} width="600" height="450" />
                   <h1>OUT</h1>
                </center>  
            
                
                 
                     <div className="media-content">
                     
                 
                     <div className="content">
       
                         <br/>
       
                           <div className="notification is-info">
                           <center>
                             Amount of Car : <strong>{this.state.Car_out}</strong> Cars.
                           </center>
                           </div>
     
                           <div className="notification is-primary">
                           <center>
                           duration_time_Car : <strong>{this.state.duration_time_out}</strong> ms.
                           </center>
                           </div>
                           
                           <div className="notification is-link">
                           <center>
                             Last Time Stamp : <strong>{this.state.time_out}</strong>
                           </center>
                           </div>
       
                       
       
                     </div>
       
             
                     </div>
                     </div>


                     </div>



                     </div>
                </article>
            </div>
        </div>    
        )           
    }
}

export default Test