import React from "react";
import loaderIcon from "../../assets/icon/loader-icon.svg";


interface Props {
  children: any;
  isGoogleSignIn?: boolean;
  inverted?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onclick: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}
const CustomButton: React.FC<Props> = ({
  children,
  isGoogleSignIn,
  inverted,
  isLoading,
  type,
  onclick,
  ...otherProps
}) => {
  return (
    <button
      className={`${inverted ? "inverted" : ""} ${
        isGoogleSignIn ? "google-signin" : ""
      } custom-button font-bold rounded-xl bg-deepBlueB p-3 text-white border-2 hover:bg-white hover:text-deepBlueB hover:border-2 hover:border-deepBlueB`}
      {...otherProps}
      onClick={onclick}
      disabled={isLoading}
    >
      {isLoading ? (
        <img
          src={loaderIcon}
          alt="loader"
          className="animate-spin mx-auto"
        />
      ) : (
        children
      )}
    </button>
  );
};

export default CustomButton;
