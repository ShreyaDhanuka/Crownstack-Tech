const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const User = require("../models/user");
const Cart = require("../models/cart");
const JWT_SECRET = "SDCHBDJHCBSJKHBVJHSDBJKHBSJHVB";

const login = async (req, res) => {
  const body = req.body;

  User.findOne({ username: body.username })
    .then((user) => {
      if (!user) {
        return res.json({ message: "Sorry No User found with this username" });
      }
      if (user.password !== body.password) {
        return res.json({ message: "Authentication Failed" });
      }

      const token = jwt.sign({ _id: user.id }, JWT_SECRET);

      res.json({ message: "Successfully Login", token: token });
    })
    .catch((err) => {
      console.log(err);
      res.json({ err: err.message });
    });
};

const signup = (req, res) => {
  const body = req.body;
  const user = new User(body);

  User.findOne({ username: body.username })
    .then(async (extUser) => {
      if (extUser) {
        return res.json({ message: "User already signup" });
      }

      var newCart = new Cart({
        products: [],
        modifiedOn: Date.now(),
      });

      const cart = await newCart.save();
      user.cart = cart._id;

      user
        .save()
        .then((newUser) => {
          newUser.password = undefined;
          res.json({ newUser });
        })
        .catch((err) => {
          res.json({ err: err.message });
        });
    })
    .catch((err) => {
      return res.json({ err: err.message });
    });
};

const requireSignIn = expressJwt({
  secret: JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

const getCart = (req, res) => {
  const userId = req.auth._id;
  User.findOne({ _id: userId })
    .populate("cart")
    .populate({
      path: "cart",
      populate: {
        path: "products",
        model: "Product",
      },
    })
    .then((user) => {
      if (!user) {
        return res.json({ message: "No User FOUND!" });
      }
      user.password = undefined;
      return res.json({ user });
    })
    .catch((err) => {
      return res.json({ err: err.message });
    });
};

module.exports = { login, signup, requireSignIn, getCart };
