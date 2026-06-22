import { createContext, useEffect, useState } from "react";
import { getUserDataApi } from "../Services/AuthService";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") != null
  );
  const [userData, setUserData] = useState(null);
  async function getUserData() {
    const res = await getUserDataApi();
    if (res.message) {
      setUserData(res.user);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
