const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/allRoutes");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require('./config/db');
require("dotenv").config();
connectDB();



dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use('/adminUploads/categories', express.static('./uploads/adminComponents/categories'));
app.use('/adminUploads/subCategories', express.static('./uploads/adminComponents/subCategories'));
app.use('/adminUploads/products', express.static('./uploads/adminComponents'));
app.use('/userUploads', express.static('./uploads/userComponents'));
app.use(morgan("dev"));
app.use(routes);


const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log("server running with port",port);
});