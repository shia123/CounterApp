import React, { useCallback, useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { initializeApp } from "@firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseConfig } from "../service/FirebaseService";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
const Home = () => {
  const FirebaseService = initializeApp(firebaseConfig);
  const [value ,setValue] = useState(0)
  const [hasActive ,setDisabled] = useState(false)
  const auth = getAuth();

  const handleInc = () => {
  
    setValue(value+1)
    setDisabled(false)
  }

  const handleDec = () => {
  
    if(value===0){
      setDisabled(true)
    }
    else{
      setValue(value-1)
    }
  }


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user);
        // ...
      } else {
        window.location.href = "/login";
      }
    });
  });

  return (
    <Router>
      <div className="cardOperations">
        <div>
          <h1>Counter</h1>
          <h1>{value}</h1>
          <div className="operations">
            <button onClick={handleInc} className="btn btn-primary">+</button>
            <button disabled={hasActive} onClick={handleDec} className="btn btn-primary">-</button>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Home;
