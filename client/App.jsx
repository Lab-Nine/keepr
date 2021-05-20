import ReactDOM from "react-dom";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import Cookies from 'js-cookie';
import User from "./pages/user.jsx"

// Main app
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: Cookies.get('userOauthId'),
    }
    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn(googleUser) {
    console.log("onSignIn");
    const profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
    const oAuth = profile.getId() + "";
    const userName = profile.getEmail().split("@")[0];
    console.log("ID sent to server: ", oAuth);
    console.log("userName sent to server: ", userName);
    console.log('this1', this)
    const reqBody = { oauth: oAuth, username: userName };
    fetch("/api/oauthLogin", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(reqBody),
    })
      // .then(response => response.json())
      .catch((err) => console.log("could not login"));
    let idToken = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + idToken);
    console.log('this', this)
    this.setState({isLoggedIn: true}, ()=> {console.log(this.state)})
  
  }
  render() {
    if (this.state.isLoggedIn){
      return (<Router>
        <div>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/user/:username">
            <User />
          </Route>
        </div>
      </Router>)
    }
    else {
      return <Login onSignIn={this.onSignIn} /> 
    }
    // <Router>
    //   <div>
    //     <Route exact path="/">
    //       <Home />
    //     </Route>
    //     <Route path="/news">
    //       <NewsFeed />
    //     </Route>
    //   </div>
    // </Router>
    // console.log('render', this.state.isLoggedIn)
    // if (this.state.isLoggedIn){
    //   return <Home/>
    // }
    // else {
    //   return <Login onSignIn={this.onSignIn} /> 
    // }
  }
}