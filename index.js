const express = require("express");
const mongoose = require("mongoose");
const userrouter = require("./routers/user");
const productrouter = require("./routers/product");
const bodyparser = require("body-parser");

const app = express();
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.bmi4v.mongodb.net/Crownstack?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(bodyparser.json());

app.use("/user", userrouter);
app.use("/product", productrouter);

app.get("/", (req, res) => {
  res.json({ message: "helpppp" });
});

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    console.log(err);
    res.status(401).json({ error: "Invalid token..." });
  }
});

app.listen(3035, () => {
  console.log("server is listening on port 3035");
});
