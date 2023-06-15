import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import { auth, db } from "./config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Get the user document from Firestore
        const userRef = doc(db, "users", userCredential.user.uid);
        getDoc(userRef)
          .then((doc) => {
            if (doc.exists && doc.data().isStaff) {
              // User is a staff member, navigate to home
              navigate("/home");
            } else {
              // User is not authorized to log in
              setError(
                "Access is restricted to authorized personnel only. You are not authorized to access this."
              );
              setIsLoading(false);
            }
          })
          .catch((error) => {
            setError(error.message);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        // Handle login error
        setError(error.message);
        setIsLoading(false);
      });
  }

  return (
    <div className="Login">
      <center>
        <h1 className="login-header">Admin</h1>
      </center>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <button className="btn-login" type="submit" disabled={!validateForm()}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </Form>
    </div>
  );
}
