import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Image from "../../Images/shopping.png";
import Product from "../../Element/Product/Product";

export default function Home() {
  return (
    <div className="conatainer">
      <div className="hero__section">
        <div className="hero__left">
          <h1 style={{ margin: 0 }}>
            <span style={{ color: "Orange", margin: 0 }}>Looking </span> To{" "}
            <br></br>
            Online Shopping
          </h1>
          <p>
            Cupidatat laboris ullamco mollit commodo non exercitation duis duis
            tempor exercitation. In amet adipisicing ut Lorem mollit do
            exercitation esse eiusmod laboris dolor velit reprehenderit
            excepteur. Mollit culpa fugiat excepteur mollit et ea. Ea
            consectetur do culpa cillum nulla dolor nostrud nulla. Nostrud
            proident eiusmod enim voluptate laborum ullamco exercitation
            pariatur excepteur quis officia anim labore.
          </p>
          <Link to="/product" className="btn__home">
            See More
          </Link>
        </div>
        <div className="hero__right">
          <img src={Image} alt="" />
        </div>
      </div>
      <Product limit={8} />
    </div>
  );
}
