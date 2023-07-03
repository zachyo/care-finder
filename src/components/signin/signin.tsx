import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.utils";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import CustomButton from "../custom-button/custom-button";
import careImg from "../../assets/image/Rectangle 113.png";
import "../signup/signup.css";
import { Link, useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // const uid = user.uid;
      console.log(user.email + " is logged in.");
      // ...
    } else {
      // User is signed out
      console.log("user has logged out.");
    }
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/profile");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };
  return (
    <div className="sign-in h-[100vh] flex bg-greyB space-x-14">
      <div className="container form flex flex-col bg-lightGreyB px-12 w-2/5 justify-center ml-24 my-16 rounded-xl">
        <h1 className="title text-3xl font-bold mb-12">Welcome Back</h1>
        <p>Sign in using correct details!</p>
        <label htmlFor="email" className="text-left fw-2 text-xl pb-2 ml-3">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="mb-6 p-3 rounded-xl"
          required
        />
        <label htmlFor="password" className="text-left fw-2 text-xl pb-2 ml-3">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          className="mb-6 p-3 rounded-xl"
          required
        />
        <CustomButton onclick={handleSubmit}>Sign In</CustomButton>

        {/* //handle later */}
        {/* <div className="buttons">
          <button type="submit" value="Submit form">
            {" "}
            Sign in
          </button>
          <button
            // onClick={signInWithGoogle}
            value="Submit form"
            // isGoogleSignIn
          >
            {" "}
            Sign in with Google
          </button>
        </div> */}
        <div className="redirect flex justify-center mt-16">
          <h1>Don't have an account yet?</h1>&nbsp;
          <Link to={"/signup"} className="text-deepBlueB font-bold italic">
            Signup!
          </Link>
        </div>
      </div>
      <div className=" deets flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mt-3 mb-12 text-blueB">
          <Link to="/" className="hover:underline">
            CareFinder
          </Link>
        </h1>
        <h2 className="text-3xl font-bold mb-8 w-48">Join Our Community</h2>
        <p className="font-bold w-96 text-lightBlack text-3xl">
          Enjoy seamless access to medical services.
        </p>
        <img src={careImg} alt="" className="" />
      </div>
    </div>
  );
};

export default SignIn;
