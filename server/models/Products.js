const mongoose = require("mongoose")

const productSchema = mongoose.Schema({

      image: String,
      name: String,
      description: String,
      category: String,
      brand: String,
      price: Number,
      saleprice: Number,
      stock: Number
}, timestamp = true)

module.exports = mongoose.model("Product", productSchema)