import React, { Component } from 'react';
import logo from './logo.svg';
import * as firebase from 'firebase';
import { log } from 'util';
import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';
import Test from './components/Test';

class App extends Component {


  render() {
    return (
      <div className="App">

        <Header />
        <br/>
        <Test />
        <br/>
        <Footer />

      </div>
  
    );
  }
}

export default App;
