import { Button } from "@mui/material";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import "./style.css";

export default function Profile() {
  const { User } = useSelector((state) => state.user.login_user);
  return (
    <Fragment>
      <div className="checkout__header">
        <h1>#Profile</h1>
      </div>

      <div className="profile__container">
        <div className="profile__left">
          <div>
            <img src={User && User.avatar.url} alt=""></img>
            <h1>About Me</h1>
            <p> {User && User.about}</p>
          </div>
        </div>
        <div className="profile__right">
          <div className="top">
            <div>
              <h1>
                <span style={{ color: "#017b8e" }}>
                  {User && User.firstName}
                </span>{" "}
                {User && User.lastName}
              </h1>
              <h5>
                Joined On{" "}
                <span>{String(User && User.createdAt).substr(0, 10)}</span>
              </h5>
            </div>
            <div>
              <Button
                sx={{ marginRight: 3 }}
                variant="contained"
                color="success"
              >
                Edit
              </Button>
              <Button variant="contained" color="secondary">
                Update Password
              </Button>
            </div>
          </div>
          <div className="about">
            <h2>About</h2>
          </div>
          <div className="bottom">
            <div>
              <h3>Username</h3>
              <h3>First Name</h3>
              <h3>Last Name</h3>
              <h3>Email</h3>
              <h3>Phone Number</h3>
              <h3>Date of Birth</h3>
            </div>
            <div>
              <h3>{User && User.username}</h3>
              <h3>{User && User.firstName}</h3>
              <h3>{User && User.lastName}</h3>
              <h3>{User && User.email}</h3>
              <h3>{User && User.phone}</h3>
              <h3>{User && User.dob}</h3>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
