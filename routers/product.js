const express = require("express");
const router = express.Router();

const productController = require("../controllers/productc");
const usercontroller = require("../controllers/userc");

router.post("/create-product", productController.createProduct);
router.get("/all-product", productController.listProduct);

router.put(
  "/add-product/:productId",
  usercontroller.requireSignIn,
  productController.addProductToCart
);

module.exports = router;
