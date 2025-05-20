import express from "express";
import { createOrder, getAllOrders } from "../controller/order.controller.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/orders", getAllOrders);


export default router;
