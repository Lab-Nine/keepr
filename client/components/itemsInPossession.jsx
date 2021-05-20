import { set } from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  useParams
} from "react-router-dom";

export default function ItemsInPossession(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const username =  useParams();

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

  // const [value, setValue] = useState(props.reload);

  // useEffect(() => { setValue(props.reload) }, [props.reload]);

  useEffect(() => {
    fetch('/api/itemsInPossession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(username)
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log('in itemsinpossesion ', result);
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [isLoaded])

  const borrow = (id) => {
    // useEffect(() => {
    // setIsLoaded(false);
    fetch('/api/borrowItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    })
      .then(()=> setIsLoaded(false))

  }
  
  // const fetchRequest = useCallback(() => {
  //   // Api request here
  //   fetch('/api/borrowItem', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({id})
  //   })
  // }, [id]);

  const results = [];

  items.map(item => {
    if(!username.username){
      results.push(<tr key={item.thingid}><td>{item.thingname}</td><td>{item.thingdescription}</td></tr>)
    }
    else {
      results.push(<tr key={item.thingid}><td>{item.thingname}</td><td>{item.thingdescription}</td><td><button onClick={() => borrow(item.thingid)}>Borrow</button></td></tr>)
    }
    
  })

  if (error) {
    return <tr><td>Error: {error.message}</td></tr>;
  } else if (!isLoaded) {
    return <tr><td>Loading...</td></tr>;
  } else {
    return results
  }

}