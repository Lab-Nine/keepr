import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import App from '../client/App.jsx'
import Login from '../client/pages/login.jsx'
import GoogleLogin from 'react-google-login';

describe('App Component', () => {
    const wrapper = shallow(<App />);
    
    it('Contains Login component', () => {
      expect(wrapper.find(Login).length).toBe(1)
    })
     
});

describe('Login Component', () => {
    let mockonSignIn = jest.fn();
    let LoginProps = {"onSignIn":mockonSignIn};
    
    const wrapper = shallow(<Login {...LoginProps} />);
    

    
    it('Login includes html elements', () => {
      expect(wrapper.find('div').length).toEqual(1);
    });
   
});

describe ('GoogleLogin component', () => {
    let mockonSuccess = jest.fn();
    let mockonFailure = jest.fn();
    let mockonRequest = jest.fn();
    let googleProps = {"clientId":"854650157972-51v9gjpsqhn8b42lbdhq0dctt418jol0.apps.googleusercontent.com","buttonText":"Login","onSuccess":"mockonSuccess","onFailure":"mockonFailure","cookiePolicy":"single_host_origin","type":"button","tag":"button","scope":"profile email","accessType":"online","prompt":"","fetchBasicProfile":true,"isSignedIn":false,"uxMode":"popup","disabledStyle":{"opacity":0.6},"icon":true,"theme":"light","onRequest":"mockonRequest"};
    
    const wrapper = shallow(<GoogleLogin {...googleProps}/>)

    it('GoogleLogin includes html elements', () => {
        expect(wrapper.find('button').length).toEqual(1);
    });

      it('GoogleLogin includes correct html innerText', () => {
        expect(wrapper.find('button').text()).toEqual("<g /><p />");
    }); 
})