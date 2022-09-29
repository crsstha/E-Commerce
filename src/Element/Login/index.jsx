import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";
import shoppingGif from "../../Images/shopping.gif";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadUser, login } from "./action";

export default function Login() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();

  const { isLogin, error } = useSelector((state) => state.user);
  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (!formErrors.validate) {
      const users = {
        email: formValues.email,
        password: formValues.password,
      };
      dispatch(login(users));
    }
    if (error.success === "false") {
      toast.error("Invalid Credential", {
        position: "top-center",
      });
    }
  };
  useEffect(() => {
    if (isLogin) {
      dispatch(loadUser());
      toast.success("login Successful");
      history("/");
    }
  }, [isLogin, history, dispatch]);

  const validate = (values) => {
    const errors = {
      validate: false,
    };
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "*Email is required!";
      errors.validate = false;
    } else if (!regex.test(values.email)) {
      errors.email = "*Invalid Email";
      errors.validate = false;
    }
    if (!values.password) {
      errors.password = "*Password is required";
      errors.validate = false;
    } else if (values.password.length < 6) {
      errors.validate = false;
      errors.password = "Password must be more than 6 characters";
    }
    return errors;
  };

  return (
    <div className="login__page">
      <div className="login__block">
        <div className="login__gif">
          <img src={shoppingGif} alt="" />
        </div>
        <div className="login__border">
          <span></span>
        </div>
        <div className="login__Intro">
          <h1>Thifting</h1>
          <h4>Welcome Thifting Shopping</h4>
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              "& .MuiTextField-root": { mt: "1", width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              margin="dense"
              label="Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <span className="error">{formErrors.email}</span>
            <TextField
              margin="dense"
              label="Password"
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
            <span className="error">{formErrors.password}</span>
            <Button
              type="submit"
              variant="contained"
              color="success"
              id="btn__login"
            >
              Sign In
            </Button>
          </Box>

          <span>New to Jasmine Shopping?</span>
          <Button variant="contained" color="success" id="btn__login">
            Create an Account
          </Button>
        </div>
      </div>
    </div>
  );
}
