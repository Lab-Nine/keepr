import React, { useEffect, useState } from "react";
import MaterialTable from 'material-table';
import ItemsLent from '../components/itemslent.jsx';

export default function Home(props) {

  return (
    <div className="homebox">
      <div className="input-group">
        <input type="search" className="form-control rounded" placeholder="Search by username or item name" aria-label="Search"
          aria-describedby="search-addon" />
        <button id="searchbutton" type="button" className="btn btn-outline-primary" onSubmit={()=>{props.search()}}>search</button>
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
              <th>Item ID</th>
            </tr>
          </thead>
          <tbody>
            <ItemsLent/>
          </tbody>
        </table>
      </div>

      <div className = 'upload'>
        <button id = 'uploadButton'>Upload Your Item</button>
      </div>
      
    </div>
);
}










