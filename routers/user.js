const express = require("express");
const usercontroller = require("../controllers/userc");

const router = express.Router();

router.post("/login", usercontroller.login);
router.post("/signup", usercontroller.signup);
router.get("/get-cart", usercontroller.requireSignIn, usercontroller.getCart);

module.exports = router;
