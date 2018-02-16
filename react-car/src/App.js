import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Tabs from './components/Tabs';

class App extends Component {


  render() {
    return (
      <div className="App">

        <Header />
        <br />
        <Tabs />
        <br/>
        <Footer />
        
      </div>
  
    );
  }
}

export default App;
