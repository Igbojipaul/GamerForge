const Cart = require("../../models/Cart");
const Product = require("../../models/Products");

// add to cart

const addReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Request must contain all parameters-productId",
      });
    }
    let productReviewBox = await Reviewbox.findOne({ userId });
    if (!userCart) {
      userCart = new Cart({ userId, items: [{ productId, quantity }] });
    }
    const indexOfItem = userCart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (indexOfItem === -1) {
      userCart.items.push({ productId, quantity });
    } else {
      userCart.items[indexOfItem].quantity += quantity;
    }
    await userCart.populate("items.productId");
    await userCart.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Item added to your cart!",
        data: userCart.items,
        cartId: userCart._id,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "ServerError", error });
  }
};

// get cart items

const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;
    let userCart = await Cart.findOne({ userId }).populate("items.productId");

    if (!userCart) {
      return res
        .status(404)
        .json({ success: false, message: "user's cart not found" });
    }
    userCart.items = userCart.items.filter((item) => item.productId);

    if (userCart.isModified("items")) {
      await userCart.save();
    }

    res
      .status(200)
      .json({ success: true, data: userCart.items, cartId: userCart._id });
  } catch (error) {
    res.status(500).json({ success: false, message: "ServerError:", error });
  }
};

// update cart Item
const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (quantity < 1)
      return res
        .status(400)
        .json({ success: false, message: "Quantity must be at least 1" });

    const cart = await Cart.findOne({ userId });

    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Cart Item updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "ServerError:", error });
  }
};

// delete cart item

const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const userCart = await Cart.findOne({ userId });

    if (!userCart)
      return res
        .status(200)
        .json({ success: false, message: "Cart not found" });

    userCart.items = userCart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await userCart.save();

    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "server error", error });
  }
};

module.exports = { addToCart, getCartItems, updateCartItem, deleteCartItem };
