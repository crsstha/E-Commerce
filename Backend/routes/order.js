const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  updateSingleOrder,
  getHostOrders,
} = require("../controllers/order");

const { isAuthenticatedUser, verifyTokenAndHost } = require("../middleware/verifyToken");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/order/update/:id").put(isAuthenticatedUser, updateOrder);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser,verifyTokenAndHost, getAllOrders);
  
router
  .route("/host/order/:id")
  .put(isAuthenticatedUser, verifyTokenAndHost, updateOrder)
  .delete(isAuthenticatedUser, verifyTokenAndHost, deleteOrder);

module.exports = router;
