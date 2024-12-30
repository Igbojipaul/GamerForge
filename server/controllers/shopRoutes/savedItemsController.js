const Wishlist = require("../../models/wishlist");
const Product = require("../../models/Products");
const wishlist = require("../../models/wishlist");

// add to cart

const saveItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Request must contain all parameters: productId",
      });
    }

    let userSavedItems = await Wishlist.findOne({ userId });

    if (!userSavedItems) {
      userSavedItems = new Wishlist({ userId, items: [] });
    }

    const indexOfItem = userSavedItems.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (indexOfItem === -1) {
      userSavedItems.items.push({ productId });
    } else {
      return res.status(400).json({
        success: false,
        message: "Item already added to wishlist",
      });
    }

    await userSavedItems.populate("items.productId");
    await userSavedItems.save();

    return res.status(200).json({
      success: true,
      message: "Item has been added to your wishlist",
      products: userSavedItems.items,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "ServerError", error });
  }
};

// get saved items

const getSavedItems = async (req, res) => {
  try {
    const userId = req.user.id;
    let userSavedItems = await Wishlist.findOne({ userId });

    if (!userSavedItems) {
      return res.status(404).json({
        success: false,
        message: "user has not added any item to his wishlist before.",
      });
    }
    userSavedItems.items = userSavedItems.items.filter(
      (item) => item.productId
    );
    await userSavedItems.populate("items.productId"); 
    
    if (userSavedItems.isModified("items")) {
      await userSavedItems.save();
    }

    res.status(200).json({ success: true, products: userSavedItems.items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error:", error });
  }
};

// delete saved item

const deleteSavedItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const userSavedItems = await Wishlist.findOne({ userId });

    if (!userSavedItems)
      return res.status(404).json({
        success: false,
        message: "User has not saved any item before",
      });

    userSavedItems.items = userSavedItems.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await userSavedItems.populate("items.productId")
    await userSavedItems.save();

    res.status(200).json({
      success: true,
      message: "Item removed from wishlist",
      products: userSavedItems.items,
    });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "server error", error });
  }
};

module.exports = { saveItem, getSavedItems, deleteSavedItem };
