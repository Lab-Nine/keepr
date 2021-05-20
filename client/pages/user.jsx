import React, { useEffect, useState } from "react";
import MaterialTable from 'material-table';
import ItemsLent from '../components/itemslent.jsx';
import UploadModal from '../components/uploadmodal.jsx';
import ItemsInPossession from '../components/itemsInPossession.jsx';
import {
  Redirect, useParams
} from "react-router-dom";

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show:false
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
        console.log('imhere', res)
        if(res === true){

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
  }
  // componentDidMount(){
  //   console.log('hi', useParams());
  // }
  render () { 

    return (
    <div className="homebox">
      KSLDJKLASDJLAKSJDASKLDJASKLDJASLKJD GIEIHDIHDIOAEHDIAEHDILAEHDALEHDKJLASHDALKSJDHJLASHDKJASHDjaKSHFdkajshdkjDNKJASDNKA
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
              <th>Item ID</th>
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
              <th>Item ID</th>
            </tr>
          </thead>
          <tbody>
            <ItemsLent/>
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
            <ItemsInPossession/>
          </tbody>
        </table>
      </div>

      <UploadModal show={this.state.show} addItem={this.addItem} cancel={this.cancel}/> 
      
    </div>
  )}
}










