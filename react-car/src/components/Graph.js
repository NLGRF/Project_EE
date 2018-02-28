import React, { Component } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import * as firebase from 'firebase';

// const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;

// var data;
 var data = [{Car_out: 0, duration_time_out : 0}];
/*
var obj = [];
*/

// var C = [];

class Graph extends Component {

  constructor() {
    super();
    this.state = {
      Car: [],
      Times: [],
      time: 0,
    //  data : [],
     // test : []
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
       var rootRef_out_g = firebase.database().ref().child('logCar_out');
       //const speedRef = rootRef.child('Car');
       
       // rootRef.on('value', snap => {
         rootRef_out_g.on('value', snap => {
        //  rootRef_out_g.on('value', snap => {
          snap.forEach(shot => {
                console.log(shot.val());
                // console.log(shot.val().Car_out)
                // console.log(shot.val().duration_time_out)
                // console.log(shot.val().time_out)

            //  C = [shot.val().Car_out];

                this.setState ({
                
                 // data : [],
                 /**/
                Car_out: shot.val().Car_out,
                duration_time_out: shot.val().duration_time_out,
                time_out: shot.val().time_out,
                
                
                //  data : [shot.val()],
                // data : [{Car_out : shot.val().Car_out, duration_time_out: shot.val().duration_time_out}],
                  /*test : [
                  
                  //  {time: this.state.time, Times: this.state.Times, Car: this.state.Car},
                  // {time: shot.val().time_out,Times: shot.val().duration_time_out, Car: shot.val().Car_out},
                   shot.val()
               ]*/
                });                

          }); 
        });


/*
        data.push({Car_out : shot.val().Car_out, duration_time_out: this.state.duration_time_out});

        console.log(data);

        var obj = Object.assign({}, data);

        console.log(obj);
*/
       /*    data = [
                   //  {time: this.state.time, Times: this.state.Times, Car: this.state.Car},
                   {time: '2018-1-11 5:33:47', Times: 345, Car: 1},

                  ];
                  */
/*
                 this.setState ({
                  data : [
                    //  {time: this.state.time, Times: this.state.Times, Car: this.state.Car},
                    {time: shot.val().time_out, Times: shot.val().duration_time_out, Car: shot.val().Car_out},
                   ]
                 });
*/
/*
                     // data = [shot.val()];
                     var obj = JSON.parse(data);
                     obj.push(this.state.data);
                     data = JSON.stringify(obj);
*/
/*
var newState = Object.assign({}, this.state.data); // Clone the state obj in newState
console.log(newState);
newState[1].push([this.state.test]);            // modify newState
this.setState(newState);                      // setState()
console.log(newState);
*/

    }

    

  render () {
/*
    console.log(this.state.test);

    console.log(this.state.Car_out);

    console.log(this.state.duration_time_out);
*/        
   // console.log(data);
    var objC = Object.assign([data], this.state.Car_out);
   var myJSON = JSON.stringify(objC);
   console.log(myJSON);
   
    
     data.push({Car_out: myJSON, duration_time_out : 123});
   // data.push(myJSON);
    
  // console.log(objC[0]);
    console.log(data);
/*
    var obj = Object.assign({}, data);

    console.log(obj);
    console.log(obj[0]);
    console.log(obj[1]);
*/
/*
//var obj = Object.assign([{}], this.state.data);
var obj = Object.assign([{}], C);
console.log(obj);
*/

  	return (
      
     // <LineChart width={800} height={400} data={this.state.data}
     
     <LineChart width={800} height={400} data={data}
   // <LineChart width={800} height={400} data={objC}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="time_out"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="Car_out" stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="duration_time_out" stroke="#82ca9d" />
      </LineChart>
    );
  }
}

 
export default Graph;