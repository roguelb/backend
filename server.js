const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors({ origin: "http://smartmart-lb.com", credentials: true }));

// middleware
app.use(express.json());
app.use(cookieParser());

// app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, 'frontend')));

// clients router
const clientRouter = require("./db/routes/clientRouter");
app.use("/api/clients", clientRouter);

// users router
const userRouter = require("./db/routes/userRouter");
app.use("/api/users", userRouter);

//products router
const productsRouter = require("./db/routes/productRouter");
app.use("/api/products", productsRouter);

//order router
const orderRouter = require("./db/routes/orderRouter");
app.use("/api/orders", orderRouter);

//orderline router
const orderlineRouter = require("./db/routes/orderlineRouter");
app.use("/api/orderlines", orderlineRouter);

//mailer router
const mailer = require("./db/routes/mailerRouter");
app.use("/api/mailers", mailer);

//address router
const address = require("./db/routes/addressRouter");
app.use("/api/addresses", address);

//static Images Folder

app.use("/Images", express.static("./Images"));

// app.use('/*', function (req, res) {
//     res.sendFile(path.join(__dirname + '/frontend/index.html'));
// })
//port

const PORT = process.env.SERVER_PORT || 3000;

//server

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
