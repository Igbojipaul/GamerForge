const Product = require("../../models/Products");

const getSearchedProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    console.log("Received keyword:", keyword);


    if (!keyword || typeof keyword !== "string" || !keyword.trim()) {
      return res.status(400).json({
        success: false,
        message: "Keyword is required, must be a non-empty string.",
      });
    }

    // Sanitize and create regex for search
    const sanitizedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regEx = new RegExp(sanitizedKeyword, "i");

    // Search query
    const createSearchQuery = {
      $or: [
        { name: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    // Pagination
    const limit = parseInt(req.query.limit) || 10; // Default: 10 results
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments(createSearchQuery);
    const searchResults = await Product.find(createSearchQuery)
      .limit(limit)
      .skip(skip);

    res.status(200).json({
      success: true,
      products: searchResults,
      keyword,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    console.error("Error during search:", error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during search." });
  }
};

module.exports = { getSearchedProducts };
