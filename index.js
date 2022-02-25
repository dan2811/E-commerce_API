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

const corsOptions = {
    origin: 'https://epic-panini-c9f6f6.netlify.app',
    optionsSuccessStatus: 200
  };


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connection successful"))
    .catch((err) => {
        console.log("DATABASE CONNECTION ERROR: ", err);
    });

app.use(express.json());
app.use('*', cors(corsOptions));
app.use("/api/auth", cors(corsOptions), authRoute);
app.use("/api/users", cors(corsOptions), userRoute);
app.use("/api/products", cors(corsOptions), productRoute);
app.use("/api/carts", cors(corsOptions), cartRoute);
app.use("/api/orders", cors(corsOptions), orderRoute);
app.use("/api/checkout", cors(corsOptions), stripeRoute);


app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});