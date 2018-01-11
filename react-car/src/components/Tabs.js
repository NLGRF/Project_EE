import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Test from './Test';
import Graph from "./Graph";
import About from "./About";
 
class Tabs extends Component {
    render() {
      return (
        <HashRouter>
          <div>
            <ul className="header">
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/graph">Graph</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
            </ul>
            <div className="content">
            <Route exact path="/" component={Test}/>
            <Route path="/graph" component={Graph}/>
            <Route path="/about" component={About}/>
          </div>
          </div>
        </HashRouter>
      );
    }
  }

  export default Tabs;