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
      } custom-button`}
      {...otherProps}
      onClick={onclick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
