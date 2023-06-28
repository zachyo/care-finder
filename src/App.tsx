import React from "react";
import "./App.css";
import Homepage from "./pages/homepage";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/signup/sigunup";
import SignIn from "./components/signin/signin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        {/* <Homepage /> */}
      </Routes>
    </div>
  );
}

export default App;
