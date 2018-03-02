import React, { Component } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import * as firebase from 'firebase';

class Graphout extends Component {

  constructor() {
    super();
    this.state = {
      Car_out: 0,
      duration_time_out: 0,
      time_out: 0,
      dataout : [],
    }
  }
  
    componentDidMount() {

       // OUT
       var rootRef_out_g = firebase.database().ref().child('logCar_out');

       let dataout = [] 
       
         rootRef_out_g.on('value', snap => {
          snap.forEach(shot => {

            dataout.push({'Car_out' : shot.val().Car_out, 'duration_time_out' : shot.val().duration_time_out});

          }); 
        });

        console.log(dataout);

        this.setState({dataout:dataout})

    }

    

  render () {

let {dataout} = this.state
console.log(dataout);

  	return (
      
      <LineChart width={1400} height={650} data={dataout}   
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       
       <XAxis dataKey="time_out"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <br />
       <Line type="monotone" dataKey="Car_out" stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="duration_time_out" stroke="#82ca9d" />

      </LineChart>
    );
  }
}

 
export default Graphout;