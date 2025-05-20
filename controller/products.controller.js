import { imageUploadUtil } from '../config/cloudinary.js';
import Product from '../models/product.js';

// Upload image to Cloudinary
const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: 'Error occurred',
    });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      price,
      discountedprice,
      stock,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      price,
      discountedprice,
      stock,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.error('ERR ❌', e);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// Fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: 'Error occurred',
    });
  }
};

// Edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      price,
      discountedprice,
      stock,
    } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    product.image = image || product.image;
    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price || product.price;
    product.discountedprice = discountedprice || product.discountedprice;
    product.stock = stock || product.stock;

    await product.save();
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: 'Error occurred',
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: 'Error occurred',
    });
  }
};

export {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
