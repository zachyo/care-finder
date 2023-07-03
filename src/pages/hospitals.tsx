import { useEffect, useState } from "react";
import useFetch from "../utils/useFetch";
import useHospitalStore from "../utils/hospitalStore";
import ExportCustomersButton from "../components/exportcsv";
import Location from "../components/location";
import HospitalListComponent from "../components/hospital-list";
import Spinner from "../components/spinner/spinner";
import { Hospital } from "../types/hospital";
import map from '../assets/image/Rectangle 56.png'
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
      <div className="hospital-map">
        {/* <img src={map} alt="map" className="absolute -z-10" /> */}
        <div className="search-button flex gap-5 justify-center items-center pt-6">
          <input
            type="text"
            placeholder="Enter City..."
            className="w-1/2 p-3 rounded-xl border-2 border-deepBlueB placeholder:italic"
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Location />
        </div>
      </div>

      <div className="hospital-list">
        <h1 className="text-2xl font-semibold text-deepBlueB mt-12">
          List of hospitals {locality ? `in ${locality}` : ""}
        </h1>
      </div>
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
