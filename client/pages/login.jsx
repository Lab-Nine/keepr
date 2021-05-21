import React, { useState } from "react";
import GoogleLogin from 'react-google-login';

export default function Login(props) {
  return (
      <div className="loginbox">
        <GoogleLogin
        clientId="854650157972-51v9gjpsqhn8b42lbdhq0dctt418jol0.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={props.onSignIn}
        onFailure={()=> {console.log('log in failed try again')}}
        cookiePolicy={'single_host_origin'}
        />
      </div>
  );
}