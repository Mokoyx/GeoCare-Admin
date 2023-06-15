import React, { useEffect, useState } from "react";
import "bootstrap/js/dist/collapse";
import { auth, db } from "./config/firebase";
import { doc, getDoc } from "firebase/firestore";

function Nav({ Toggle }) {
  const [userData, setUserData] = useState(null);
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
    <nav className="navbar navbar-expand-sm navbar-white bg-white px-3">
      <a className="navbar-brand bi bi-justify-left fs-4 " onClick={Toggle}></a>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      ></button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {userData ? userData.email : "Unknown"}
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <a className="dropdown-item" onClick={handleSignOut}>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Nav;
