import { Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser } from "../../Element/Login/action";

export default function Register() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { User } = useSelector((state) => state.user.login_user);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    username: "",
    email: "",
    about: "",
    phone: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedValue = {};
    if (
      values.firstName === "" &&
      values.lastName === "" &&
      values.dob === "" &&
      values.email === "" &&
      values.phone === "" &&
      values.username === "" &&
      values.about === ""
    ) {
      toast.success("No Updates");
    } else {
      if (values.firstName !== "") {
        updatedValue.firstName = values.firstName;
      }
      if (values.lastName !== "") {
        updatedValue.lastName = values.lastName;
      }
      if (values.dob !== "") {
        updatedValue.dob = values.dob;
      }
      if (values.email !== "") {
        updatedValue.email = values.email;
      }
      if (values.phone !== "") {
        updatedValue.phone = values.phone;
      }
      if (values.username !== "") {
        updatedValue.username = values.username;
      }
      if (values.about !== "") {
        updatedValue.about = values.about;
      }
      dispatch(updateUser(updatedValue));
      toast.success("Update Successful");
      history("/profile");
    }
  };
  return (
    <Fragment>
      <div className="checkout__header">
        <h1>#Profile</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="profile__container">
          <div className="profile__left">
            <div>
              <img src={User && User.avatar.url} alt=""></img>
              <h1>About Me</h1>
              <TextField
                sx={{ marginBottom: 1 }}
                placeholder={User && User.about}
                rows={10}
                multiline
                label="About"
                onChange={handleChange}
              ></TextField>
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
                  sx={{ marginRight: 3, width: 250 }}
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </div>
            <div className="about">
              <h2>About</h2>
            </div>
            <div className="bottom ">
              <div className="update">
                <h3>Username</h3>
                <h3>First Name</h3>
                <h3>Last Name</h3>
                <h3>Email</h3>
                <h3>Phone Number</h3>
                <h3>Date of Birth</h3>
              </div>
              <div className="update">
                <TextField
                  sx={{ marginBottom: 1 }}
                  name="username"
                  label={User && User.username}
                  onChange={handleChange}
                  value={values.username}
                ></TextField>
                <TextField
                  name="firstName"
                  sx={{ marginBottom: 1 }}
                  label={User && User.firstName}
                  onChange={handleChange}
                  value={values.firstName}
                ></TextField>
                <TextField
                  name="lastName"
                  sx={{ marginBottom: 1 }}
                  label={User && User.lastName}
                  onChange={handleChange}
                  value={values.lastName}
                ></TextField>
                <TextField
                  name="email"
                  sx={{ marginBottom: 1 }}
                  label={User && User.email}
                  onChange={handleChange}
                  value={values.email}
                ></TextField>
                <TextField
                  name="phone"
                  sx={{ marginBottom: 1 }}
                  label={User && User.phone}
                  onChange={handleChange}
                  value={values.phone}
                ></TextField>
                <TextField
                  sx={{ marginBottom: 1 }}
                  name="dob"
                  label={User && User.dob}
                  onChange={handleChange}
                  value={values.dob}
                ></TextField>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
}
