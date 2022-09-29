import { TextField } from "@mui/material";
import React, { Fragment } from "react";
import "./style.css";

export default function Contact() {
  return (
    <Fragment>
      <div className="checkout__header">
        <h1>#Contact Us</h1>
      </div>
      <div className="c__header">
        <h1>
          <span style={{ color: "orange" }}> Get</span> in Touch
        </h1>
        <h3>
          Please get in touch and our expert support team will answer all you
          Questions
        </h3>
      </div>
      <div className="contact__container">
        <div>
          <form>
            <TextField
              sx={{ width: 360, marginBottom: 2 }}
              label="Name"
            ></TextField>

            <TextField
              sx={{ width: 360, marginBottom: 2 }}
              label="Email"
            ></TextField>
            <TextField
              sx={{ width: 360, marginBottom: 2 }}
              label="Message"
              multiline
              rows={12}
              maxRows={12}
            />
          </form>
        </div>
        <div>
          <iframe
            title="map"
            style={{ border: "0", width: "100%", height: "450px" }}
            src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=mt Everest&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            frameborder="0"
            allowfullscreen
          />
        </div>
      </div>
    </Fragment>
  );
}
