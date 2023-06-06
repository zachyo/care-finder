import { useEffect, useState } from "react";
import Location from "../components/location";
import axios from "axios";
import ExportCustomersButton from "../components/exportcsv";
import { customers } from "../customers";
import SignUp from "../components/signp/sigunup";

interface HospitalsData {
  data: any
}

const Homepage: React.FC = () => {
  const [hospitalList, setHospitalList] = useState<HospitalsData>();

  const getHospitals = () => {
    const hospitalApiUrl = `fetch from firebase`;

    axios.get(hospitalApiUrl).then((response) => {
      console.log(response.data);
      setHospitalList(response.data);
    });
  };
  useEffect(() => {
    // getHospitals();
  });
  return (
    <div>
      <h1 className="header">CareFinder</h1>
      <p>Find the nearest hospital to you</p>
      <input type="text" placeholder="Enter Address" />
      <div className="hospital-list">List of hospitals based on location</div>

      <Location />
      <ExportCustomersButton customers={customers} />
      <SignUp/>
    </div>
  );
};

export default Homepage;
