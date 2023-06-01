import React, { useState } from "react";
import axios from "axios";

interface LocationData {
  principalSubdivision: string;
  locality: string;
  countryName: string;
}

const Location: React.FC = () => {
  const [data, setData] = useState<LocationData | null>(null);

  const getLocation = () => {
    const success = (position: GeolocationPosition) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude);

      const geoApiUrl = `https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=bdc_1d8b912bf33a4935905f692a75ffe550`;

      axios.get(geoApiUrl).then((response) => {
        console.log(response.data);
        setData(response.data);
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
      <button className="location" onClick={getLocation}>
        Get Location
      </button>
      {data && (
        <ul>
          {" "}
          <li>
            Location: {data.locality}, {data.principalSubdivision},{" "}
            {data.countryName}
          </li>{" "}
        </ul>
      )}
    </div>
  );
};

export default Location;
