import React, { ChangeEvent, MouseEventHandler } from "react";

interface Props {
  children: any;
  isGoogleSignIn?: boolean;
  inverted?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onclick: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}
const CustomButton: React.FC<Props> = ({
  children,
  isGoogleSignIn,
  inverted,
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
    >
      {children}
    </button>
  );
};

export default CustomButton;
