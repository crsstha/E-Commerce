import React from "react";
import "./style.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="footer__container">
      <div className="footer">
        <div className="footer__left">
          <h1 id="footer__heading">Thifting</h1>
          <div className="contact">
            <ul>
              <li>
                <span>Address:</span> Kathmandu, Nepal
              </li>
              <li>
                <span>Phone:</span> 977-01-55935653, 977-9865445785
              </li>
              <li>
                <span>Hours:</span> 10:00 - 18:00, Mon- Sat
              </li>
            </ul>
          </div>
          <h4>Follow us</h4>
          <div className="social__media">
            <Link to="">
              {" "}
              <FacebookIcon />
            </Link>
            <Link to="">
              <TwitterIcon />{" "}
            </Link>
            <Link to="">
              {" "}
              <InstagramIcon />
            </Link>

            <Link to="">
              {" "}
              <YouTubeIcon />
            </Link>
          </div>
        </div>
        <div className="footer__center">
          <h1>About</h1>
          <ul>
            <li>
              <Link to="">About Us</Link>
            </li>
            <li>
              {" "}
              <Link to="">Delivery Information</Link>
            </li>
            <li>
              <Link to="">Privacy Policy</Link>
            </li>
            <li>
              <Link to="">Terms and Conditions</Link>
            </li>
            <li>
              <Link to="">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="footer__right">
          <h1>My Account</h1>
          <ul>
            <li>
              <Link to="/login">Sign In</Link>
            </li>
            <li>
              {" "}
              <Link to="">View Cart</Link>
            </li>
            <li>
              <Link to="">My Wishlist</Link>
            </li>
            <li>
              <Link to="">Track My Order</Link>
            </li>
            <li>
              <Link to="">Help</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="copyright">
         Ⓒ {new Date().getFullYear()}  Thifting Online Shooping
      </div>
    </div>
  );
}
