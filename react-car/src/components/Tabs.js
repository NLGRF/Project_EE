import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Test from './Test';
import Graphin from "./Graphin";
import Graphout from "./Graphout";
import About from "./About";
 
class Tabs extends Component {
    render() {
      return (
        <HashRouter>
          <div>
            <ul className="header">
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/graphin">GraphIN</NavLink></li>
              <li><NavLink to="/graphout">GraphOUT</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
            </ul>
            <div className="content">
            <Route exact path="/" component={Test}/>
            <Route path="/graphin" component={Graphin}/>
            <Route path="/graphout" component={Graphout}/>
            <Route path="/about" component={About}/>
          </div>
          </div>
        </HashRouter>
      );
    }
  }

  export default Tabs;