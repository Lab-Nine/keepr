import React, { useEffect, useState } from "react";
import {
  useParams
} from "react-router-dom";

export default function ItemsBorrowed() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const username =  useParams();

  useEffect(() => {
    fetch('/api/itemsBorrowed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(username)
    })
    .then(res => res.json())
    .then((result) => {
      setIsLoaded(true);
      setItems(result);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      })
    }, [isLoaded])

  const returnItem = (id) => {
    fetch('/api/returnItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    })
    .then((res)=> {
      setIsLoaded(false)
    })
  }

  const results = [];
  items.map(item => {
    if(username.username){
      results.push(<tr key={item.thingid}><td>{item.thingname}</td><td>{item.thingdescription}</td><td>{item.username}</td></tr>)
    }
    else {
      results.push(<tr key={item.thingid}><td>{item.thingname}</td><td>{item.thingdescription}</td><td>{item.username}</td><td><button onClick={() => returnItem(item.thingid)}>Return</button></td></tr>)
    }
  })

  if (error) {
    return <tr><td>Error: {error.message}</td></tr>;
  } else if (!isLoaded) {
    return <tr><td>Loading...</td></tr>;
  } else {
    return results
  }
};