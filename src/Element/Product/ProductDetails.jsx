import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addCart } from "../Cart/slice";
import { decreaseQty, increaseQty } from "./slice";
import { STATUSES } from "../../utils";
import { getSingleProducts } from "./action";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Loader from "../../Component/Loader/Loader";
import "./style.css";
import { Button } from "@mui/material";

export default function ProductDetails() {
  const history = useNavigate();
  const id = useParams();
  const dispatch = useDispatch();
  const { singleProduct, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getSingleProducts(id));
  }, [dispatch, id]);

  useEffect(() => {
    setImage(singleProduct.thumbnail);
  }, [singleProduct]);

  const [image, setImage] = useState("");

  if (status === STATUSES.LOADING) {
    return <Loader />;
  }
  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }
  return (
    <div className="P__container">
      <div className="product__detail">
        <div className="carousel">
          <img src={image} alt="" />
          <div className="p__imgs">
            {singleProduct.images &&
              singleProduct.images.map((images) => (
                <img src={images} alt="" onClick={() => setImage(images)} />
              ))}
          </div>
        </div>
        <div className="p__detail">
          <h1>{singleProduct && singleProduct.title}</h1>
          <h1>MRP: रू{singleProduct && singleProduct.price}</h1>
          <ReactStars
            edit={true}
            count={5}
            value={singleProduct.rating}
            size={30}
            isHalf={true}
          />
          <h2>Product Details</h2>
          <p>{singleProduct && singleProduct.description}</p>
          <h2>Product Category</h2>
          <p style={{ textTransform: "capitalize" }}>
            {singleProduct && singleProduct.category}
          </p>
          <h4>
            Avaiable:{" "}
            {singleProduct && singleProduct.stock > 0
              ? "Instock"
              : "Out of Stock"}
          </h4>
          <h4>Brand: {singleProduct && singleProduct.brand}</h4>
          <Button
            onClick={() => {
              dispatch(decreaseQty(singleProduct));
            }}
            id="qty"
          >
            -
          </Button>{" "}
          <span id="span"> {singleProduct.cartQuantity} </span>
          <Button
            onClick={() => {
              dispatch(increaseQty(singleProduct));
            }}
            id="qty"
          >
            +
          </Button>{" "}
          <br></br>
          <Button
            variant="contained"
            color="secondary"
            spacing={2}
            onClick={() => {
              dispatch(addCart(singleProduct && singleProduct));
              toast.success("Product Has Been Added To Cart");
            }}
          >
            <span style={{ marginRight: "15px" }}>Add To Cart</span>
            <ShoppingCartIcon fontSize="medium" color="white" />
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => history("/checkoutbuy")}
          >
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
}
