const express = require("express");
const productRouter = express.Router();
const { auth } = require("../Middleware/auth");
const {
  addProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
} = require("../Controller/product");

const {
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
} = require("../Controller/inventory");

// Admin Routes
productRouter.post("/add-product", auth, addProduct);
productRouter.put("/update-product/:productId", auth, updateProduct);
productRouter.delete("/delete-product/:productId", auth, deleteProduct);

// Customer Routes
productRouter.get("/get-product/:productId", auth, getProductDetails);
productRouter.post("/wishlist/add/:productId", auth, addToWishlist);
productRouter.delete("/wishlist/remove/:productId", auth, removeFromWishlist);
productRouter.post("/cart/add/:productId", auth, addToCart);
productRouter.delete("/cart/remove/:productId", auth, removeFromCart);

module.exports = productRouter;
