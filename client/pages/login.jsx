import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import styles from './login.css';

export default function Login() {


  return (
      <div className="loginbox">
        <input id='username' placeholder='Enter Username' className='form username' />
        <input id='password' placeholder='Enter Password' className='form password' />
        <button className="login" onClick={() => {props.loginFcn(), routeChange()}}>
          Login
        </button>
      </div>
  );
}