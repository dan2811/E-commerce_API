const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connection successful"))
    .catch((err) => {
        console.log("DATABASE CONNECTION ERROR: ", err);
    });

app.use(express.json());

app.use(cors);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.use(express.static(path.join(__dirname, "/E_commerce/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/E_commerce/build', 'index.html'));
});


app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});