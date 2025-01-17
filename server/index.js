const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const morgan = require("morgan");

// custom modules
const {dbConnection} = require('./db')
const userRoutes = require("./routes/authRoutes/userRoutes")
const adminProductsRoutes = require("./routes/adminRoutes/adminProductRoute")
const shopProductsRoutes = require("./routes/shopRoutes/shopProductsRoutes")
const shopCartRoutes = require("./routes/shopRoutes/shopCartRoutes")
const addressRoutes = require("./routes/addressRoutes/address")
const orderRoutes = require("./routes/shopRoutes/orderRoutes")
const searchRoutes = require("./routes/shopRoutes/searchRoutes")
const savedItemsRoutes = require("./routes/shopRoutes/savedItemsRoutes")

dotenv.config();
const app = express();

// Middleware

// in production, please dont forget to specify the origin to allow only the specified front end origin to make requests and also, specify the request methods, allowHeaders, credentials... as the case maybe...
app.use(cors({
  origin: ['https://gamerforgerj.netlify.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"));

// routers
app.use("/api/auth", userRoutes)
app.use("/api/admin/products", adminProductsRoutes)
app.use("/api/shop/products", shopProductsRoutes)
app.use("/api/shop/cart", shopCartRoutes)
app.use("/api/shop/address", addressRoutes)
app.use("/api/shop/order", orderRoutes)
app.use("/api/shop/search", searchRoutes)
app.use("/api/shop/wishlist", savedItemsRoutes)


// PORT
const PORT = process.env.PORT || 5000;

 
// Db connection
dbConnection()

// start 
app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}...`);
})

