import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../Cart/slice";
import Loader from "../../Component/Loader/Loader";
import {
  getProducts,
  productCategories,
  productSearch,
  productCatSearch,
} from "./action";
import { STATUSES } from "../../utils";
import "./style.css";
import ReactStars from "react-rating-stars-component";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { useState } from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";

export default function AllProduct() {
  const [isActive, setIsActive] = useState("gridView");
  const dispatch = useDispatch();
  const { allProducts, status, categories } = useSelector(
    (state) => state.product
  );

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    dispatch(productCategories());
    dispatch(getProducts());
  }, [dispatch]);

  // if (status === STATUSES.LOADING) {
  //   return <Loader />;
  // }
  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }
  return (
    <Fragment>
      <div className="product__main all__product">
        <div className="search__container">
          <TextField
            label="Search"
            fullWidth
            id="fullWidth"
            onChange={(e) => {
              setKeyword(e.target.value);
              dispatch(productSearch(keyword));
            }}
          ></TextField>
          <div className="category">
            <h2>All Category</h2>
            <button onClick={() => dispatch(getProducts())}>
              <h3>All</h3>
            </button>
            {categories.map((cat) => (
              <button onClick={() => dispatch(productCatSearch(cat))}>
                <h3>{cat}</h3>
              </button>
            ))}
          </div>
        </div>
        {status === STATUSES.LOADING ? (
          <Loader />
        ) : (
          <div>
            <div className="grid__list">
              <ListIcon onClick={() => setIsActive("listView")} />
              <GridViewIcon onClick={() => setIsActive("gridView")} />
            </div>

            <div
              className={`product__container p__c ${
                isActive === "listView" ? "listView__container" : ""
              }`}
            >
              {allProducts &&
                allProducts.map((product) => (
                  <div
                    className={`product__cart ${
                      isActive === "listView"
                        ? "listView__cart"
                        : "gridView__cart"
                    }`}
                    key={product.id}
                  >
                    <Link to={`/product/${product.id}`}>
                      <div
                        className={`${
                          isActive === "listView" ? "list_view" : ""
                        }`}
                      >
                        <div className="p__img">
                          <img src={product.thumbnail} alt="" />
                        </div>
                        <div>
                          <h5>{product.title}</h5>
                          <ReactStars
                            edit={false}
                            count={5}
                            value={product.rating}
                            size={`${
                              isActive === "listView" || "gridView" ? 20 : 30
                            }`}
                            isHalf={true}
                          />
                          <h4>रू{product.price}</h4>
                        </div>
                      </div>
                    </Link>
                    <ShoppingCartIcon
                      className="cart__icon"
                      fontSize="large"
                      color="white"
                      onClick={() => {
                        dispatch(addCart(product));
                        toast.success("Product Has Been Added To Cart");
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
