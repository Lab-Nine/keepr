import React, { useEffect, useState } from "react";
import {
  useParams
} from "react-router-dom";

export default function ItemsLent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const username =  useParams();
  console.log('hihihihi', username)
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {

    fetch('/api/itemsLent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(username)
    })
    // fetch("/api/itemsLent")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("in itemsLEnt", result);
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
  }, [])

  const results = [];

  items.map(item => {
    results.push(<tr key={item.thingid}><td>{item.thingname}</td><td>{item.thingdescription}</td><td>{item.username}</td></tr>)
  })

  if (error) {
    return <tr><td>Error: {error.message}</td></tr>;
  } else if (!isLoaded) {
    return <tr><td>Loading...</td></tr>;
  } else {
    return results
  }

}