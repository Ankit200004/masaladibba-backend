// import express from "express";
// import dotenv from "dotenv"
// dotenv.config();
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import connectToDB from "./config/db.js";
// import authRoutes from "./routes/user.route.js";
// import productRoutes from "./routes/products.route.js";
// import FeatureRoutes from './routes/feature.route.js'
// import CartRoutes from './routes/cart.route.js'
// import AddressRoutes from "./routes/address.route.js"
// import OrderRoutes from "./routes/order.route.js"


// const app = express();

// app.use(cors({
//   origin: "https://masaladibba.com",
//   credentials: true,
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/feature",FeatureRoutes);
// app.use('/api/cart',CartRoutes)
// app.use("/api/address",AddressRoutes)
// app.use("/api/orders", OrderRoutes);

// app.get("/", (req, res) => {
//   res.send("Welcome to Auth API");
// });

// const PORT = process.env.PORT || 3000;

// connectToDB();

// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./config/db.js";
import authRoutes from "./routes/user.route.js";
import productRoutes from "./routes/products.route.js";
import FeatureRoutes from './routes/feature.route.js';
import CartRoutes from './routes/cart.route.js';
import AddressRoutes from "./routes/address.route.js";
import OrderRoutes from "./routes/order.route.js";

const app = express();

// ✅ CORS Configuration – THIS MUST COME FIRST
const allowedOrigins = [
  "https://masaladibba.com",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.options("*", cors()); // ✅ Handle preflight requests

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/feature", FeatureRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/address", AddressRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to MasalaDibba API");
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
connectToDB();
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
