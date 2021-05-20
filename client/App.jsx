import ReactDOM from "react-dom";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx"

// Main app
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true
    }
  }

  
  render() {
    if (this.state.isLoggedIn){
      return <Home/>
    }
    else {
      return <Login /> 
    }
  }
}
