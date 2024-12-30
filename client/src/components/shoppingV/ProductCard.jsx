import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { getLabelByValue } from "@/constants/formInputs";
import { Heart } from "lucide-react";

const ProductCard = ({
  product,
  handleViewItem,
  handleAddtoCart,
  handleAddToWishList,
  handleRemoveFromWishlist,
  isSaved,
}) => {


  return (
    <motion.div
      className="max-w-lg min-w-lg relative overflow-hidden transition-transform transform bg-gray-800 border-[0.5px] border-purple-500 border-solid rounded-lg shadow-lg hover:scale-105 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => handleViewItem(product._id)}>
      <Badge
        variant="outline"
        className="absolute text-sm bg-purple-600 border-none rounded-sm purple-200 text-l top-2 left-2">
        {product.saleprice ? "On Sale" : ""}
      </Badge>

      <Heart
        className="absolute right-2 top-2"
        onClick={(e) => {
          e.stopPropagation();
          if(isSaved){
            handleRemoveFromWishlist(product._id)
            return
          }
          handleAddToWishList(product._id);
        }}
        fill={isSaved ? "#DA70D6" : "none"}
        />

      {/* this for the heart if it is fillled = fill={`${wishList}`} */}

      <img
        src={product.image}
        alt={product.name}
        className="object-cover w-full h-48"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <div className="flex justify-between">
          <p className="text-gray-400 text-md truncate">
            {getLabelByValue("category", product.category)}
          </p>
          <p className="text-purple-400 text-md uppercase font-bold truncate">
            {getLabelByValue("brand", product.brand)}
          </p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p
            className={`text-md font-normal  text-gray-500 ${
              product.saleprice > 0 ? "line-through" : ""
            }`}>
            ${product.price}.00
          </p>

          <p className="font-sm bold text-">${product.saleprice}.00</p>
        </div>
        <div className=" w-full mt-3">
          <Button
            onClick={() => handleAddtoCart(product._id, 1)}
            className="inline-block w-full px-4 py-2 mt-4 h-10 text-center text-white transition-colors bg-purple-600 rounded hover:bg-purple-700 text-sm ">
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
