import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Users from "./User";
import Home from "./Home";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Users" element={<Users />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
