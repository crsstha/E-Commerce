import { Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";

export default function Register() {
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
    const myForm = new FormData();
    if (
      values.firstName === "" &&
      values.lastName === "" &&
      values.dob === "" &&
      values.email === "" &&
      values.phone === "" &&
      values.username === "" &&
      values.about === ""
    ) {
      alert.success("No Updates");
    } else {
      if (values.firstName !== "") {
        myForm.set("firstName", values.firstName);
      }
      if (values.lastName !== "") {
        myForm.set("lastName", values.lastName);
      }
      if (values.dob !== "") {
        myForm.set("dob", values.dob);
      }
      if (values.email !== "") {
        myForm.set("email", values.email);
      }
      if (values.phone !== "") {
        myForm.set("phone", values.phone);
      }
      if (values.username !== "") {
        myForm.set("username", values.username);
      }
      if (values.about !== "") {
        myForm.set("about", values.about);
      }
      console.log(myForm);

      //dispatch(updateProfile(myForm));
    }
  };

  console.log(values);
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
                multiline
                rows={10}
                maxRows={10}
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
                  placeholder={User && User.username}
                  onChange={handleChange}
                ></TextField>
                <TextField
                  sx={{ marginBottom: 1 }}
                  placeholder={User && User.firstName}
                  onChange={handleChange}
                ></TextField>
                <TextField
                  sx={{ marginBottom: 1 }}
                  placeholder={User && User.lastName}
                  onChange={handleChange}
                ></TextField>
                <TextField
                  sx={{ marginBottom: 1 }}
                  placeholder={User && User.email}
                  onChange={handleChange}
                ></TextField>
                <TextField
                  sx={{ marginBottom: 1 }}
                  placeholder={User && User.phone}
                  onChange={handleChange}
                ></TextField>
                <TextField
                  sx={{ marginBottom: 1 }}
                  placeholder={User && User.dob}
                  onChange={handleChange}
                ></TextField>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
}
