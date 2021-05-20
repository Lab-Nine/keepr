import React, { useEffect, useState } from "react";
import {
  useParams
} from "react-router-dom";

export default function ItemsBorrowed() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch('/api/itemsBorrowed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(username)
    })
      .then(res => res.json())
      .then(
        (result) => {
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
    results.push(<tr key={item.id}>
      {item.name} {item.price}
    </tr>)
  })

  if (error) {
    return <tr><td>Error: {error.message}</td></tr>;
  } else if (!isLoaded) {
    return <tr><td>Loading...</td></tr>;
  } else {
    return results
  }

}