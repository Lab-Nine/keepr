import React, { useEffect, useState } from "react";
import MaterialTable from 'material-table';
import ItemsLent from '../components/itemslent.jsx';
import UploadModal from '../components/uploadmodal.jsx';
import ItemsInPossession from '../components/itemsInPossession.jsx';
import ItemsBorrowed from '../components/itemsborrowed.jsx';
import {
  Redirect
} from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show:false,
      redirect:false,
      reload:0,
    }
    this.search = this.search.bind(this);
    this.addItem = this.addItem.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  search(term) {
    console.log('search', term)
    fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({term})
    })
      .then(res => res.json())
      .then(res => {
        if(res === true){
          console.log('imhereerere', res);
          this.setState({redirect:true, username: term})
        }
      })
  }
  cancel(){
    this.setState({show:false})
  }
  upload(){
    console.log('upload')
    this.setState({show: true}, ()=> console.log(this.state))
  }
  addItem(name, desc){
    console.log(name, desc)
    fetch('/api/addItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, desc})
    })
    window.location.reload();
  }
  render () { 
    if(this.state.redirect == true){
      let redirectURL = "/user/" + this.state.username;
      return <Redirect to={redirectURL}/>
    }
    else return (
    <div className="homebox">
      <ul>
        <li><button id='navBarButton' className="navbar" onClick={()=> this.upload()}>Upload Your Item</button></li>
      </ul>
      <div className="input-group">
        <input id="search" className="form-control-rounded" placeholder="Search by username" aria-label="Search"
          aria-describedby="search-addon" />
        <button id="searchbutton" type="button" className="btn btn-outline-primary" onClick={()=>{this.search(document.getElementById('search').value);}}>search</button>
      </div>
    
      <div className='itemsLent'>
        <div className='tableTitle'>
          items lent
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Name of Item</th>
              <th>Description of Item</th>
              <th>Borrower Username</th>
            </tr>
          </thead>
          <tbody>
            <ItemsLent/>
          </tbody>
        </table>
      </div>

      <div className='itemsBorrowed'>
        <div className='tableTitle'>
          items borrowed
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Name of Item</th>
              <th>Description of Item</th>
              <th>Loaner Username</th>
              <th>Wanna Return That?</th>
            </tr>
          </thead>
          <tbody>
            <ItemsBorrowed/>
          </tbody>
        </table>
      </div>

      <div className='itemsInPossession'>
        <div className='tableTitle'>
          items in possession
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Name of Item</th>
              <th>Description of Item</th>
            

            </tr>
          </thead>
          <tbody>
            <ItemsInPossession reload={this.state.reload}/>
          </tbody>
        </table>
      </div>

      <UploadModal show={this.state.show} addItem={this.addItem} cancel={this.cancel}/> 
      
    </div>
  )}
}










