import React, { useState, useEffect } from "react";
import { auth, db } from "./config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import "./index.css";
function Sidebar() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      getDoc(userDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setUserData(data);
        } else {
          console.log("No such document!");
        }
      });
    }
  }, []);

  function handleSignOut() {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("User signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }
  return (
    <div className="bg-white sidebar p-2">
      <div className="avatar">
        <Avatar
          name={userData ? userData.fullname : "Staff"}
          size="100"
          round={true}
          color="#79bd9a"
        />
      </div>
      <div className="m-2">
        <p className="pSize"> {userData ? userData.fullname : "Staff"}</p>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <a className="list-group-item py-2 " onClick={() => navigate("/Home")}>
          <i className="bi bi-speedometer2 fs-5 me-2"></i>
          <span className="fs-6"> Dashboard</span>
        </a>
        <a className="list-group-item py-2 " onClick={() => navigate("/Users")}>
          <i className="bi bi-people fs-5 me-2 "></i>
          <span className="fs-6">Users</span>
        </a>
        <a className="list-group-item py-2 " onClick={handleSignOut}>
          <i className="bi bi-power fs-5 me-2"></i>
          <span className="fs-6"> Logout</span>
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
