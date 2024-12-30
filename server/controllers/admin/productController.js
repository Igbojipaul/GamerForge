const { uploadImageUtil } = require("../../helper/cloudinary");
const Product = require("../../models/Products");

const uploadImage = async (req, res) => {
  const file = req.file;
  try {
    const b64 = Buffer.from(file.buffer).toString("base64");
    const url = "data:" + file.mimetype + ";base64," + b64;
    const result = await uploadImageUtil(url);

    res.json({
      success: true,
      result
    })
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "An error occured",
    });
  }
};

// Add product

const addProduct = async (req, res) =>{
  const {name, description, category, brand, image, price, saleprice, stock} = req.body

  try {
    const newProduct = await new Product({name, description, category, brand, image,  price, saleprice, stock})

    await  newProduct.save()

    res.status(200).json({
      success: true,
      message: "Product added successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "an unexpected error occured please try again"
    })
  }

}


// Fetch Products

const fetchProduct = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products, 
    });
  } catch (error) {
    console.error("Error fetching products:", error); 

    res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again.",
    });
  }
};



// update products
const updateProduct = async (req, res) =>{
  const {id} = req.params

  const product = req.body  

  try {
    const productToModify = await Product.findByIdAndUpdate(id, product, { new: true })

    if(!productToModify){
      return res.status(404).json({success: false, message: "product not found"})
    }

    res.status(200).json({
      success: true,
      message: "Product modified successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "an unexpected error occured please try again"
    })
  }

  
}

// delete product
const deleteProduct = async (req, res) =>{

  const {id} = req.params
  try {
    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
  
    res.status(200).json({ success: true, message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred while deleting the product" });

  }  
}


module.exports ={ uploadImage, addProduct, updateProduct, fetchProduct, deleteProduct }
