import React, { Component } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import * as firebase from 'firebase';

// const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;

 var data;

class Graph extends Component {

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
           data = [
                   //  {time: this.state.time, Times: this.state.Times, Car: this.state.Car},
                   {time: '2018-1-11 5:33:47', Times: 345, Car: 1},
                   {time: '2018-1-11 5:35:47', Times: 512, Car: 2},
                   {time: '2018-1-11 5:37:47', Times: 287, Car: 3},
                   {time: '2018-1-11 5:39:47', Times: 50 , Car: 4},
                   {time: '2018-1-11 5:40:47', Times: 83 , Car: 5},
                   {time: '2018-1-11 5:41:47', Times: 174, Car: 6},
                  ];
    }


  render () {
  	return (
    	<LineChart width={800} height={400} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="time"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="Car" stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="Times" stroke="#82ca9d" />
      </LineChart>
    );
  }
}

 
export default Graph;