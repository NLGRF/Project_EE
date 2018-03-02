import React, { Component } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import * as firebase from 'firebase';

class Graphin extends Component {

  constructor() {
    super();
    this.state = {
      Car_in: 0,
      duration_time_in: 0,
      time_in: 0,
      datain : [],
    }
  }
  
    componentDidMount() {

       // IN
       var rootRef_in_g = firebase.database().ref().child('logCar_in');

       let datain = []
      
         rootRef_in_g.on('value', snap => {

          snap.forEach(shot => {

            datain.push({'Car_in' : shot.val().Car_in, 'duration_time_in' : shot.val().duration_time_in});
          }); 
        });
        console.log(datain);

        this.setState({datain:datain})

    }

  render () {

let {datain} = this.state
console.log(datain);

  	return (
     
     <LineChart width={1600} height={800} data={datain}   
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       
       <XAxis dataKey="time_in"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <br />
       <Line type="monotone" dataKey="Car_in" stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="duration_time_in" stroke="#82ca9d" />
      </LineChart>
    );
  }
}

 
export default Graphin;