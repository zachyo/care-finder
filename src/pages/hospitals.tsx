import { useEffect, useState, useContext } from "react";
import useFetch from "../utils/useFetch";
import useHospitalStore from "../utils/hospitalStore";
import ExportCustomersButton from "../components/exportcsv";
import Location from "../components/location";
import HospitalListComponent from "../components/hospital-list";
import Spinner from "../components/spinner/spinner";
import { Hospital } from "../types/hospital";
import map from '../assets/image/Rectangle 56.png'
import { Link } from "react-router-dom";
import loaderIcon from "../assets/icon/loader-icon.svg";
import { UserContext } from "../userContext";

const Hospitals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, error, data } = useFetch(
    "https://api.reliancehmo.com/v3/providers?"
  );
  const [page, setPage] = useState(1);
  const { isLoggedIn } = useContext(UserContext)


  const setHospital = useHospitalStore((state) => state.setHospitals);
  const setLocality = useHospitalStore((state) => state.setLocality);
  const locality = useHospitalStore((state) => state.locality);
  const newData = data?.data.filter((hospital: Hospital) =>
    hospital.address.includes(locality)
  );
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setPage(1)
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
        <div className="search-button flex gap-5 justify-center items-center pt-6 my-auto">
          <input
            type="text"
            placeholder="Enter City..."
            className="w-1/2 p-3 rounded-xl border-2 border-deepBlueB placeholder:italic"
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Location setPage={setPage} />
          {isLoggedIn ? (
            <Link
              to={"/profile"}
              className="font-bold rounded-xl bg-deepBlueB py-3 px-6 text-white border-2 hover:bg-white hover:text-deepBlueB hover:border-2 hover:border-deepBlueB"
            >
              Profile
            </Link>
          ) : (
            <Link
              to={"/signin"}
              className="font-bold rounded-xl bg-deepBlueB py-3 px-6 text-white border-2 hover:bg-white hover:text-deepBlueB hover:border-2 hover:border-deepBlueB"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="hospital-list">
        <h1 className="text-2xl font-semibold text-deepBlueB mt-12">
          List of hospitals{" "}
          {locality ? (
            <span>
              in <span className="underline uppercase">{locality}</span>
            </span>
          ) : (
            ""
          )}
        </h1>
      </div>
      {loading && (
        <img
          src={loaderIcon}
          alt="loader"
          className="animate-spin mx-auto my-7"
        />
      )}
      {!loading && error && <p>{error.message}</p>}
      {data && (
        <div className="hospital-list">
          <HospitalListComponent data={newData} page={page} setPage={setPage} />
          <ExportCustomersButton data={newData} locality={locality} />
        </div>
      )}
      {/* <Link to={"/profile"}>profile</Link> */}
    </div>
  );
};

export default Hospitals;
