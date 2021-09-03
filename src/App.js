import React, { useCallback, useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "./service/FirebaseService";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";

function App() {
  const FirebaseService = initializeApp(firebaseConfig);
  const auth = getAuth();
  const [hasUser, setHasUser] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Logout Out");
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setHasUser(true);
        // ...
      }
    });
  });

  return (
    <Router>
      <div>
        <Navbar className="navHeader">
          <Nav >
            {hasUser == true ? (
              <div className="nav-items">
                <Nav>
                  <Link to="/home">Home</Link>
                </Nav>
                <Nav>
                  <Link onClick={handleLogout}>Logout</Link>
                </Nav>
              </div>
            ) : (
              <div className="nav-items">
                <Nav>
                  <Link to="/login">Login</Link>
                </Nav>
                <Nav>
                  <Link to="/register">Register</Link>
                </Nav>
              </div>
            )}
          </Nav>
        </Navbar>
      </div>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/home" component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default App;
