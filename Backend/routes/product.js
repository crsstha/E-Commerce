const express = require("express");
const router = express.Router();
const {
  verifyTokenAndHost,
  isAuthenticatedUser,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

// Controllers
const {
  addProduct,
  getAllProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/products");

router.route("/add").post(isAuthenticatedUser,verifyTokenAndHost, addProduct);
router.route("/vehicles").get(getAllProduct);
router.route("/admin/vehicles").get(isAuthenticatedUser,verifyTokenAndHost, verifyTokenAndAdmin, getAdminProducts);
router.route("/vehicle/:id").get(getProductDetails);
router
  .route("/host/vehicle/:id")
  .put(isAuthenticatedUser,verifyTokenAndHost, updateProduct)
  .delete(isAuthenticatedUser,verifyTokenAndHost, deleteProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
