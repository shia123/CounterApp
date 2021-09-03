import React, { useCallback, useState, useEffect } from "react";
import { initializeApp } from "@firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { div } from "prelude-ls";
import { firebaseConfig } from "../service/FirebaseService";

const Register = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userSession, hasUserSession] = useState(false);

  const FirebaseService = initializeApp(firebaseConfig);
  const auth = getAuth();

  const handleRegister = () => {
    setEmailError("");
    setPasswordError("");
    createUserWithEmailAndPassword(auth, email, password).catch((err) => {
      switch (err.code) {
        case "auth/email-already-in-use":
          setEmailError("Email Already Use");
          break;
        case "auth/invalid-email":
          setEmailError("Invalid Email Format");
          break;
        case "auth/weak-password":
          setPasswordError("Weak Password");
          break;
      }
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        window.location.href = "/home";
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
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
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
        <p style={{ color: "red" }}>{emailError}</p>
        <p style={{ color: "red" }}>{passwordError}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
