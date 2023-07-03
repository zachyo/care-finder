import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import CustomButton from "../custom-button/custom-button";
import { auth } from "../../firebase.utils";
import careImg from '../../assets/image/Rectangle 113.png';
import './signup.css'
import { Link, useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const [userCredentials, setCredentials] = useState({
    displayName: "",
    password: "",
    retypePassword: "",
    email: "",
  });
    const navigate = useNavigate();

  const { displayName, password, email, retypePassword } = userCredentials;

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (password !== retypePassword) {
      // console.log(this.state);
      alert("Passwords don't match");
      return;
    }

    // const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });

    // try {
    //   const { user } = await auth.createUserWithEmailAndPassword(
    //     email,
    //     password
    //   );
    //   await createUserProfileDoc(user, { displayName });
    //   setCredentials({
    //     displayName: "",
    //     password: "",
    //     retypePassword: "",
    //     email: "",
    //   });
    //   console.log(user);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  //monitor user
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // const uid = user.uid;
      // const displayName = user.displayName;
      console.log(user.email + " is logged in.");
      navigate("/profile");

      // ...
    } else {
      // User is signed out
      console.log("user has logged out.");
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
    console.log(userCredentials);
  };

  return (
    <div className="sign-up h-[100vh] flex bg-greyB space-x-14">
      <div className="container form flex flex-col bg-lightGreyB px-12 w-2/5 justify-center ml-24 my-16 rounded-xl">
        <h1 className="text-3xl font-bold mb-12">Create An Account</h1>
        {/* <form> */}
        <label
          htmlFor="displayName"
          className="text-left fw-2 text-xl pb-2 ml-3"
        >
          Name
        </label>
        <input
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          placeholder="Display Name"
          className="mb-6 p-3 rounded-xl"
          required
        />
        <label htmlFor="email" className="text-left fw-2 text-xl pb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          className="mb-6 p-3 rounded-xl"
          onChange={handleChange}
          required
        />
        <label htmlFor="password" className="text-left fw-2 text-xl pb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={handleChange}
          className="mb-6 p-3 rounded-xl"
          required
        />
        <label htmlFor="password" className="text-left fw-2 text-xl pb-2">
          Retype Password
        </label>
        <input
          type="password"
          name="retypePassword"
          value={retypePassword}
          placeholder="Retype Password"
          onChange={handleChange}
          className="mb-6 p-3 rounded-xl"
          required
        />
        <CustomButton onclick={handleSubmit}>Create Account</CustomButton>
        {/* </form> */}
        <div className="redirect flex justify-center mt-16">
          <h1>Already have an account?</h1>&nbsp;
          <Link to={"/signin"} className="text-deepBlueB font-bold italic">
            Signin!
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

export default SignUp;
