require('dotenv').config()

const mongoose = require("mongoose")
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes files
const authRoutes = require(__dirname+"/routes/auth.js");
const userRoutes = require(__dirname+"/routes/user.js");
const categoryRoutes = require(__dirname+"/routes/category.js");
const productRoutes = require(__dirname+"/routes/product.js");
const orderRoutes = require(__dirname+"/routes/order.js");
const BraintreeRoutes = require(__dirname+"/routes/Braintree")


// DB connection
mongoose.connect(process.env.DATABASE).then(()=> {
    console.log("DB CONNECTED")
});


// Middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

    
// My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", BraintreeRoutes);


// PORT
const port = process.env.PORT || 8000;


// Starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
})
