import { signOut } from "firebase/auth";
import { auth } from "../../firebase.utils";

const SignOut = () => {
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
  return (
    <div className="profile-dashboard">
      <button onClick={signOutFunction}>Sign Out</button>
    </div>
  );
};

export default SignOut;
