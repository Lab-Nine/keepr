import React, { useState } from "react";
import GoogleLogin from 'react-google-login';
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import styles from './login.css';

export default function Login(props) {


  return (
      <div className="loginbox">
        {/* <input id='username' placeholder='Enter Username' className='form username' />
        <input id='password' placeholder='Enter Password' className='form password' />
        <button className="login" onClick={() => {props.loginFcn(), routeChange()}}>
          Login
        </button> */}
        <GoogleLogin
        clientId="854650157972-51v9gjpsqhn8b42lbdhq0dctt418jol0.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={props.onSignIn}
        onFailure={()=> {console.log('log in failed try again')}}
        cookiePolicy={'single_host_origin'}
        />
        {/* <div className="g-signin2" data-onsuccess={props.onSignIn}></div> */}
      </div>
  );
}