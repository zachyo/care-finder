import React from "react";
import "./App.css";
import Homepage from "./pages/homepage";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/signup/sigunup";
import SignIn from "./components/signin/signin";
import Hospitals from "./pages/hospitals";
import Profile from "./pages/profile-page";
// import PrivateRoute from "./components/private-route";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="search-hospital" element={<Hospitals />} />
        {/* <Route path="profile" element={<PrivateRoute path="profile" element={<Profile/>}/>} /> */}

        <Route path="profile" element={<Profile />} />
        {/* <Homepage /> */}
      </Routes>
    </div>
  );
}

export default App;
