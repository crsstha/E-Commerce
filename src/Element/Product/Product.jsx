import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../Cart/slice";
import Loader from "../../Component/Loader/Loader";
import { getProducts } from "./action";
import { STATUSES } from "../../utils";
import "./style.css";
import ReactStars from "react-rating-stars-component";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Product(limit) {
  const dispatch = useDispatch();
  const { allProducts, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts(limit.limit));
  }, [dispatch, limit]);

  if (status === STATUSES.LOADING) {
    return <Loader />;
  }
  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }
  return (
    <div className="product__main">
      <h1>Feature Product</h1>
      <div className="product__container">
        {allProducts &&
          allProducts.map((product) => (
            <div className="product__cart" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <div>
                  <div className="p__img">
                    <img src={product.thumbnail} alt="" />
                  </div>
                  <h5>{product.title}</h5>
                  <ReactStars
                    edit={true}
                    count={5}
                    value={product.rating}
                    size={30}
                    isHalf={true}
                  />
                  <h4>रू{product.price}</h4>
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
  );
}
