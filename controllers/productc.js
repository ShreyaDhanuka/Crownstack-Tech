const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");

const createProduct = (req, res) => {
  const body = req.body;
  const product = new Product(body);
  product
    .save()
    .then((prod) => {
      return res.json(prod);
    })
    .catch((err) => {
      res.json({ message: err.message });
    });
};

const listProduct = (req, res) => {
  Product.find()
    .then((prod) => {
      return res.json(prod);
    })
    .catch((err) => {
      res.json({ message: err.message });
    });
};

const addProductToCart = async (req, res) => {
  const userId = req.auth._id;
  const user = await User.findOne({ _id: userId });

  const cartId = user.cart;
  const productId = req.params.productId;

  Cart.findOne({ _id: cartId })
    .then((extCart) => {
      if (!extCart) {
        return res.json({ message: "There is some error Please check!" });
      }
      extCart.products.push(productId);

      extCart
        .save()
        .then((updatedCart) => {
          return res.json({ message: "Cart is updated", updatedCart });
        })
        .catch((err) => {
          res.json({ err: err.message });
        });
    })
    .catch((err) => {
      res.json({ err: err.message });
    });
};

module.exports = { createProduct, listProduct, addProductToCart };
