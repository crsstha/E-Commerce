import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import UserMenu from "./UserMenu";
export default function Navbar() {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  const { isLogin } = useSelector((state) => state.user);
  const { cartitems } = useSelector((state) => state.cart);

  return (
    <div className="nav__container">
      <div className="nav">
        <div className="logo">
          <h1 id="heading">Thifting</h1>
        </div>
        <div
          ref={dropdownRef}
          className={isActive ? "navlist mobile-menu-link" : "navlist"}
        >
          <ul>
            <li>
              <NavLink onClick={onClick} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink onClick={onClick} to="/product">
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink onClick={onClick} to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink onClick={onClick} to="/contact">
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink onClick={onClick} to="/cart">
                <Badge
                  badgeContent={cartitems.length === 0 ? "0" : cartitems.length}
                  color="primary"
                >
                  <ShoppingCartIcon fontSize="large" color="action" />
                </Badge>
              </NavLink>
            </li>
            {isLogin ? (
              <li className="usermenu--mob">
                <UserMenu />
              </li>
            ) : (
              <li>
                <NavLink onClick={onClick} to="/login">
                  Sign In
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        {isLogin ? (
          <div className="usermenu">
            <UserMenu />
          </div>
        ) : (
          ""
        )}
        <div className="hamburger--menu">
          {isActive ? (
            <CloseIcon fontSize="large" onClick={onClick} />
          ) : (
            <MenuIcon fontSize="large" onClick={onClick} />
          )}
        </div>
      </div>
    </div>
  );
}

export const useDetectOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e) => {
      // If the active element exists and is clicked outside of
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
};
