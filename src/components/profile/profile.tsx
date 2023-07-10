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
      <button
        onClick={signOutFunction}
        className="font-bold rounded-xl bg-deepBlueB py-3 px-6 text-white border-2 hover:bg-white hover:text-deepBlueB hover:border-2 hover:border-deepBlueB"
      >
        Sign Out
      </button>
  );
};

export default SignOut;
