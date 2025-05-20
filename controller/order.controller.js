import Order from "../models/Order.model.js";
import User from "../models/user.model.js";
import Address from "../models/Address.model.js";
import Cart from "../models/Cart.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, addressId, cartId, totalAmount } = req.body;

    if (!userId || !addressId || !cartId || !totalAmount) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate the cart belongs to user
    const cart = await Cart.findOne({ _id: cartId, userId });
    if (!cart) return res.status(404).json({ message: "Cart not found for user." });

    // Validate address belongs to user
    const address = await Address.findOne({ _id: addressId, userId });
    if (!address) return res.status(404).json({ message: "Address not found for user." });

    const order = new Order({
      userId,
      addressId,
      cartId,
      totalAmount,
      status: "pending",
    });

    await order.save();

    res.status(201).json({ message: "Order created successfully.", order });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const getOrdersByUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     if (!userId) return res.status(400).json({ message: "User ID required" });

//     const orders = await Order.find({ userId })
//       .populate("cartId")
//       .populate("addressId")
//       .sort({ createdAt: -1 });

//     res.status(200).json({ orders });
//   } catch (err) {
//     console.error("Error fetching user orders", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")     
      .populate("addressId")               
      .populate("cartId");              

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Fetch orders error:", error);
    res.status(500).json({ success: false, message: "Server error while fetching orders." });
  }
};