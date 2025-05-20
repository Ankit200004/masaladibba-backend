import Address from "../models/Address.model.js";

 const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields!",
      });
    }

    const newAddr = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newAddr.save();
    res.status(201).json({ success: true, data: newAddr });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Server error while creating address.",
    });
  }
};

 const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID required!" });
    }
    const list = await Address.find({ userId });
    res.status(200).json({ success: true, data: list });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error fetching addresses",
    });
  }
};

 const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const updates = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID required!",
      });
    }

    const updated = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      updates,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Error updating address" });
  }
};

 const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID required!",
      });
    }

    const deleted = await Address.findOneAndDelete({ _id: addressId, userId });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    res.status(200).json({ success: true, message: "Address deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Error deleting address" });
  }
};


export {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress
};

