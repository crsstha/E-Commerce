import { Avatar } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../Element/Login/action";

export default function UserMenu() {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  const dispatch = useDispatch();
  const { User } = useSelector((state) => state.user.login_user);
  const logoutUser = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
  };
  return (
    <div>
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>
            {User && User.firstName} {User && User.lastName}
          </span>
          <Avatar alt={User && User.firstName} src={User && User.avatar.url} />
        </button>
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul className="li__font">
            <li>
              <Link onClick={onClick} to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link onClick={onClick} to="/orders">
                Order
              </Link>
            </li>

            <li>
              <Link to="/" onClick={logoutUser}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
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
