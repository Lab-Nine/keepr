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


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: Cookies.get('userOauthId'),
    }
    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const oAuth = profile.getId() + "";
    const userName = profile.getEmail().split("@")[0];
    const reqBody = { oauth: oAuth, username: userName };
    fetch("/api/oauthLogin", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(reqBody),
    })
    .catch((err) => console.log("could not login"));
    let idToken = googleUser.getAuthResponse().id_token;
    this.setState({isLoggedIn: true}, ()=> {console.log(this.state)})
  }
  render() {
    if (this.state.isLoggedIn){
      return (<Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/user/:username">
            <User />
          </Route>
        </Switch>
      </Router>)
    }
    else {
      return <Login onSignIn={this.onSignIn} />
    }
  }
}