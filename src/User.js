import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Nav from "./Nav";
import { db } from "./config/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";

function Users() {
  const [toggle, setToggle] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(data);
      console.log(data);
    };
    getUsers();
  }, []);

  const Toggle = () => {
    setToggle(!toggle);
  };

  const handleDeleteUsers = async (id, email) => {
    try {
      // Delete document in Firestore
      await deleteDoc(doc(db, "users", id));

      const auth = getAuth();
      deleteUser(auth, email)
        .then(() => {
          console.log("Successfully deleted user");
        })
        .catch((error) => {
          setError(error.message);
          console.error("Error deleting user: ", error);
        });

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      setError(error.message);
      console.error("Error removing document: ", error);
    }
  };
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid bg-secondary min-vh-100">
      <div className="row">
        {toggle && (
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <Sidebar />
          </div>
        )}
        {toggle && <div className="col-4 col-md-2"></div>}
        <div className="col">
          <div className="px-3">
            <Nav Toggle={Toggle} />
            <div className="mb-3 pt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <table className="table caption-top bg-white rounded mt-6">
              <caption className="text-white fs-4">Users</caption>
              {error && <div className="alert alert-danger">{error}</div>}
              <thead>
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">is_Staff</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.email}</td>
                    <td
                      className={user.isStaff ? "text-success" : "text-danger"}
                    >
                      {user.isStaff ? "Yes" : "No"}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteUsers(user.id, user.email)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
