import { useState } from "react";

const Homepage = () => {
    const [hospitalList , setHospitalList] = useState()
  return (
    <div>
      <h1 className="header">CareFinder</h1>
      <p>Find the nearest hospital to you</p>
      <input type="text" placeholder="Enter Address" />
      <div className="hospital-list">List of hospitals based on location</div>
    </div>
  );
};

export default Homepage;
