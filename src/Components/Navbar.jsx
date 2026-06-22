import React, { useContext, useState } from "react";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar() {
  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   localStorage.getItem("token") != null
  // );
  const { isLoggedIn, setIsLoggedIn, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(null);
    setUserData(null);
    navigate("/login");
  }
  return (
    <>
      <HeroNavbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">
            <Link to={"/"}>Linked Posts</Link>
          </p>
        </NavbarBrand>
        <NavbarContent justify="end">
          {isLoggedIn ? (
            <>
              <NavbarItem className="cursor-pointer" onClick={logout}>
                LogOut
              </NavbarItem>
              <NavbarItem className="cursor-pointer">
                <Link to={"/profile"}>Profile</Link>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem>
                <NavLink to={"/register"}>Sign Up</NavLink>
              </NavbarItem>
              <NavbarItem>
                <NavLink to={"/login"}>Login</NavLink>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </HeroNavbar>
    </>
  );
}
