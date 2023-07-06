const User = require("../Models/user");
const Product = require("../Models/product");

// Add Product
const addProduct = async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const product = await Product.create({
      title,
      description,
      price,
      user: req.user._id,
    });

    return res.status(200).json({
      Product: {
        productId: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        createdAt: product.createdAt,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Product Details
const getProductDetails = async (req, res) => {
  if (!req.user._id) {
    return res.status(400).send("Unauthorized");
  }
  const { productId } = req.query;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(500).json({ message: "Product doesn't exist" });
    }

    return res.status(200).json({
      id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  const { productId } = req.query;
  const { title, description, price } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      { _id: productId },
      {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      },
      { new: true }
    );

    if (!product) {
      return res.status(500).json({ message: "Product is not found" });
    }

    return res.status(200).json({
      id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  const { productId } = req.query;

  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(500).json({ message: "Product doesn't exist" });
    }

    return res
      .status(200)
      .json({ message: "Product has been deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
};
