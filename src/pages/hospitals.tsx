import { useEffect, useState } from "react";
import useFetch from "../utils/useFetch";
import useHospitalStore from "../utils/hospitalStore";
import ExportCustomersButton from "../components/exportcsv";
import Location from "../components/location";
import HospitalListComponent from "../components/hospital-list";
import Spinner from "../components/spinner/spinner";
import { Hospital } from "../types/hospital";
import { Link } from "react-router-dom";

const Hospitals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, error, data } = useFetch(
    "https://api.reliancehmo.com/v3/providers?"
  );

  const setHospital = useHospitalStore((state) => state.setHospitals);
  const setLocality = useHospitalStore((state) => state.setLocality);
  const locality = useHospitalStore((state) => state.locality);
  const newData = data?.data.filter((hospital: Hospital) =>
    hospital.address.includes(locality)
  );
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setLocality(searchQuery);
    }
  };


  useEffect(() => {
    setHospital(data?.data);
  });
  return (
    <div className="hospitals">
      <div className="search-button">
        <input
          type="text"
          placeholder="Enter City..."
          className="w-1/2 p-3 rounded-xl mt-6 placeholder:italic"
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
      <Location />

      <div className="hospital-list">List of hospitals</div>
      {loading && <Spinner />}
      {!loading && error && <p>{error.message}</p>}
      {data && (
        <div className="hospital-list">
          <HospitalListComponent data={newData} />
          <ExportCustomersButton data={newData} locality={locality} />
        </div>
      )}
      <Link to={"/profile"}>profile</Link>
    </div>
  );
};

export default Hospitals;
