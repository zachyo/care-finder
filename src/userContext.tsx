import React, { useState, createContext, ReactNode } from "react";

type User = {
  email: string
}

interface Hospital {
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number;
  reviews: string[];
  beds: number;
  photoUrl: string;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

interface UserProviderProps {
  children: ReactNode;
}
interface UserContextType {
  currentUser: any;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        setCurrentUser,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
