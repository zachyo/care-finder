import React, { useState } from "react";
import axios from "axios";
import useHospitalStore from "../utils/hospitalStore";

interface LocationData {
  principalSubdivision: string;
  locality: string;
  countryName: string;
}

type locationProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Location: React.FC<locationProps> = ({setPage} : locationProps) => {
  const [data, setData] = useState<LocationData | null>(null);
  const setLocality = useHospitalStore((state)=> state.setLocality)

  const getLocation = () => {
    const success = (position: GeolocationPosition) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude);

      const geoApiUrl = `https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=bdc_1d8b912bf33a4935905f692a75ffe550`;

      axios.get(geoApiUrl).then((response) => {
        console.log(response.data);
        setData(response.data);
        setPage(1)
        setLocality(response.data.locality)
      });
    };

    const error = () => {
      setData(null);
      console.log("Unable to retrieve your location");
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  return (
    <div>
      <button
        className="location font-bold rounded-xl bg-deepBlueB py-3 px-6 text-white border-2 hover:bg-white hover:text-deepBlueB hover:border-2 hover:border-deepBlueB"
        onClick={getLocation}
      >
        Get Hospitals in Your Location
      </button>
      {/* {data && (
        <ul>
          {" "}
          <li>
            Location: {data.locality}, {data.principalSubdivision},{" "}
            {data.countryName}
          </li>{" "}
        </ul>
      )} */}
    </div>
  );
};

export default Location;
