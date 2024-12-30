const Products = require("../../models/Products");

const fetchFilteredProduct = async (req, res) => {
  const { categories, brands } = req.query;


  // Initialize the query object
  const query = {};

  if (categories) {
    const filterCategories = Array.isArray(categories)
      ? categories
      : categories.split(",");
    query.category = { $in: filterCategories };
  }

  if (brands) {
    const filterBrands = Array.isArray(brands) ? brands : brands.split(",");
    query.brand = { $in: filterBrands };
  }

  try {
    const products = await Products.find(query);
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: `An unexpected error occurred. Please try again., ${error}`,
    });
  }
};

const fetchProductDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({success: false, message: "product not found"})
    }
    return res.status(200).json({success: true, data: product})
  } catch (error) {

    
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred. Please try again., ${error}`,
    });

  }
};

module.exports = { fetchFilteredProduct, fetchProductDetails };
