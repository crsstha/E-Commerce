const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/payment");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/verifyToken");

router.route("/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
