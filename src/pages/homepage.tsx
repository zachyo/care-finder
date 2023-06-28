import { useEffect, useState } from "react";
import Location from "../components/location";
import axios from "axios";
import ExportCustomersButton from "../components/exportcsv";
import { customers } from "../customers";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.utils";
import { Link } from "react-router-dom";
import headerPic from "../assets/image/header-pic.png";
import aboutImg1 from "../assets/image/Rectangle 7.png";
import aboutImg2 from "../assets/image/Rectangle 8.png";
import exportHos from "../assets/icon/mingcute_save-line.svg";
import searchDoc from "../assets/icon/fontisto_doctor.svg";
import searchHos from "../assets/icon/streamline-emojis_hospital.svg";
import shareHos from "../assets/icon/ph_share-bold.svg";
import "./homepage.css";

interface HospitalsData {
  data: any;
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
  const signOutFunction = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(() => {
    // getHospitals();
  });
  return (
    <div>
      <div className="navbar flex justify-between px-16 p-6 border border-b-4 border-darkerGreyB items-center ">
        <h1 className="logo text-4xl font-bold text-blueB">CareFinder</h1>
        <div className="nav-buttons flex justify-center">
          <Link to="/" className="px-5 text-2xl">
            Home
          </Link>
          <Link to="#" className="px-5 text-2xl">
            About
          </Link>
          <Link to="" className="px-5 text-2xl">
            Find Hospitals
          </Link>
          <div className="btns ml-8">
            <Link
              to="/signin"
              className="px-5 text-2xl rounded-xl bg-deepBlueB pt-1 p-2 text-white border-2 border-deepBlueB hover:bg-white hover:text-deepBlueB hover:border-2 hover:border-deepBlueB m-3"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 text-2xl rounded-xl bg-deepBlueB pt-1 p-2 text-white border-2 border-deepBlueB hover:bg-white hover:text-deepBlueB hover:border-2 hover:border-deepBlueB m-3"
            >
              SignUp
            </Link>
          </div>
        </div>
      </div>
      <div className="body bg-greyB pb-12 ">
        <div className="header-top flex justify-between pt-20 pb-10  items-center ">
          <div className="header-text w-1/2 px-3">
            <h1 className="header text-deepBlueB text-7xl">
              Find the nearest hospital to you and make an appointment
            </h1>
            <p className="text-2xl font-bold px-24 my-10">
              Discover Your Perfect Care: Find Your Hospital, Anytime, Anywhere!
            </p>
            <Link
              to={"/signup"}
              className="font-bold rounded-xl bg-deepBlueB py-3 px-6 text-white border-2 hover:bg-white hover:text-deepBlueB hover:border-2 hover:border-deepBlueB"
            >
              GET STARTED
            </Link>
            <Link to={"#about"} className="block font-bold underline mt-8">
              Learn More &rarr;
            </Link>
          </div>
          <div className="header-pic w-5/12">
            <img src={headerPic} alt="header-pic" />
          </div>
        </div>
        <div className="header-btm">
          <h1 className="text-deepBlueB text-4xl">Find a nearby hospital</h1>
          <div className="search-button"></div>
        </div>
      </div>
      <div
        className="about flex m-8 mt-12 items-center justify-around relative "
        id="about"
      >
        <div className="about-pic flex space-x-12">
          <img src={aboutImg1} alt="absolute" />
          <img src={aboutImg2} alt="" className="absolute top-16 left-1/4" />
        </div>
        <div className="about-info w-1/3 py-4">
          <h1 className="text-2xl font-semibold my-7">
            Welcome to
            <h2 className="text-deepBlueB font-bold text-3xl my-2 mb-4">
              CareFinder
            </h2>
          </h1>
          <p className="font-semibold text-lg m-12 mb-24">
            Carefinder is a platform where users can search for hosiptals in
            their areas, export hospital details for your records and enhance
            your healthcare experience by connecting with others and sharing
            valuable resources.
          </p>
          <Link
            to={"/signup"}
            className="font-bold rounded-xl bg-deepBlueB py-3 px-6 text-white border-2 hover:bg-white hover:text-deepBlueB hover:border-2 hover:border-deepBlueB"
          >
            GET STARTED
          </Link>
        </div>
      </div>
      <div className="services mt-36 flex px-8 space-x-5">
        <div className="w-1/4 bg-greyB p-8 rounded-2xl">
          <img
            src={searchDoc}
            alt=""
            className="mx-auto mb-8 p-3 border-4 border-deepBlueB rounded-full"
          />
          <h1 className="font-bold text-lg">Search Doctors</h1>
          <p className="mb-4">Effortlessly Find the Best Hospitals Near You</p>
        </div>
        <div className="w-1/4 bg-greyB p-8 rounded-2xl">
          <img
            src={searchHos}
            alt=""
            className="mx-auto mb-8 p-3 border-4 border-deepBlueB rounded-full"
          />
          <h1 className="font-bold text-lg">Search Hospitals</h1>
          <p className="mb-4">EEffortlessly Find the Best Doctors Near You</p>
        </div>
        <div className="w-1/4 bg-greyB p-8 rounded-2xl">
          <img
            src={exportHos}
            alt=""
            className="mx-auto mb-8 p-3 border-4 border-deepBlueB rounded-full"
          />
          <h1 className="font-bold text-lg">Export Hospitals</h1>
          <p className="mb-4">Save list of hospitals.</p>
        </div>
        <div className="w-1/4 bg-greyB p-8 rounded-2xl">
          <img
            src={shareHos}
            alt=""
            className="mx-auto mb-8 p-3 border-4 border-deepBlueB rounded-full"
          />
          <h1 className="font-bold text-lg">Share Hospitals</h1>
          <p className="mb-4">Share the list of hospitals with others.</p>
        </div>
      </div>
      <input type="text" placeholder="Enter Address" />
      <div className="hospital-list">List of hospitals based on location</div>

      <Location />
      <ExportCustomersButton customers={customers} />
      <button onClick={signOutFunction}>Sign Out</button>
    </div>
  );
};

export default Homepage;
