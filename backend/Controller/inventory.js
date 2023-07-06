const User = require("../Models/user");
const Inventory = require("../Models/inventory");

// Add Product to Wishlist
const addToWishlist = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Find the user and their associated inventory
    const user = await User.findById(userId).populate("inventory");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product is already in the wishlist
    const isProductInWishlist = user.inventory.wishlist.some(
      (product) => product.toString() === productId
    );

    if (isProductInWishlist) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    // Add the product to the wishlist
    user.inventory.wishlist.push(productId);
    await user.inventory.save();

    return res.status(200).json({ message: "Product added to wishlist" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Remove Product from Wishlist
const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Find the user and their associated inventory
    const user = await User.findById(userId).populate("inventory");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product is in the wishlist
    const productIndex = user.inventory.wishlist.findIndex(
      (product) => product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(400).json({ message: "Product not found in wishlist" });
    }

    // Remove the product from the wishlist
    user.inventory.wishlist.splice(productIndex, 1);
    await user.inventory.save();

    return res.status(200).json({ message: "Product removed from wishlist" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add Product to Cart
const addToCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Find the user and their associated inventory
    const user = await User.findById(userId).populate("inventory");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the product to the cart
    user.inventory.cart.push({ product: productId, quantity: 1 });
    await user.inventory.save();

    return res.status(200).json({ message: "Product added to cart" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Remove Product from Cart
const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Find the user and their associated inventory
    const user = await User.findById(userId).populate("inventory");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product is in the cart
    const productIndex = user.inventory.cart.findIndex(
      (product) => product.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(400).json({ message: "Product not found in cart" });
    }

    // Remove the product from the cart
    user.inventory.cart.splice(productIndex, 1);
    await user.inventory.save();

    return res.status(200).json({ message: "Product removed from cart" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
};
