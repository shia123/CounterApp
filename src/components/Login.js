import React, { useCallback, useState, useEffect } from "react";
import { initializeApp } from "@firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { div } from "prelude-ls";
import FirebaseService from "../service/FirebaseService";
import { firebaseConfig } from "../service/FirebaseService";

const Login = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userSession, hasUserSession] = useState(false);

  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth();


  const handleLogin = () => {
      setEmailError("")
      setPasswordError("")
      signInWithEmailAndPassword(auth,email, password)
      .then((userCredential) => {
        window.location.href="/home"
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            setEmailError("Invalid Email");
            break;
          case "auth/user-disabled":
            setEmailError("User Disabled");
            break;
          case "auth/user-not-found":
            setEmailError("User not Found");
            break;
          case "auth/wrong-password":
            setPasswordError("Wrong Password");
            break;
        }
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        window.location.href ="/home"
        // ...
      }
    });
  });


  return (
    <div className="card">
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p style={{"color":'red'}}>{emailError}</p>
        <p style={{"color":'red'}}>{passwordError}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
