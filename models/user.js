const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String },
  cart: { type: ObjectId, ref: "Cart" },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
