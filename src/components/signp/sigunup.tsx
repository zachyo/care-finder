  import React, { useState } from "react";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import CustomButton from "../custom-button/custom-button";
import { auth } from "../../firebase.utils";


  const SignUp = () => {
    const [userCredentials, setCredentials] = useState({
      displayName: "",
      password: "",
      retypePassword: "",
      email: "",
    });
    const { displayName, password, email, retypePassword } = userCredentials;

    const handleSubmit = async (event : any) => {
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setCredentials({ ...userCredentials, [name]: value });
      console.log(userCredentials);
    };

    return (
      <div className="sign-up">
        <h1>Sign up as a new user</h1>
        <form>
          <input
            type="text"
            name="displayName"
            value={displayName}
            onChange={handleChange}
            placeholder="Display Name"
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="retypePassword"
            value={retypePassword}
            placeholder="Retype Password"
            onChange={handleChange}
            required
          />
          <CustomButton onclick={handleSubmit}>
            SIGN UP
          </CustomButton>
        </form>
      </div>
    );
  };

  export default SignUp;
