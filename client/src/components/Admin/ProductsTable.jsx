import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // import ScrollArea
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { getLabelByValue, productForm } from "@/constants/formInputs";

const ProductsTable = ({ products, viewItem }) => {
  const { toast } = useToast();

  if (!products) {
    toast({
      title: "An error occured",
    });
    return 
  }  


  return (
    <div className="mt-7 w-full text-gray-300">
      {/* Table Header for larger screens */}
      <div className="hidden md:grid grid-cols-8 gap-4 bg-gray-700 p-4 text-gray-300">
        <div className="font-bold">Image</div>
        <div className="font-bold w-[100px]">Product</div>
        <div className="font-bold">Category</div>
        <div className="font-bold">Brand</div>
        <div className="font-bold">Price</div>
        <div className="font-bold">Sale Price</div>
        <div className="font-bold">No. Stock</div>
        <div className="font-bold">Actions</div>
      </div>

      {/* Product Display */}
      <ScrollArea className="h-[400px] mt-1 overflow-auto">
        {products.map((product, index) => (
          <div
            key={index}
            className="hidden md:grid grid-cols-8 gap-4 p-4 bg-gray-900 hover:bg-gray-700 text-white">
            {/* Image */}
            <div className="flex items-center justify-center">
              <img
                className="w-12 h-12 object-cover"
                src={product?.image}
                alt={product.name}
              />
            </div>

            {/* Product Name */}
            <div className="w-[100px] truncate">{product.name}</div>

            {/* Category */}
            <div className="truncate text-gray-400">{getLabelByValue("category", product.category)}</div>

            {/* Brand */}
            <div className="truncate text-gray-400">{getLabelByValue("brand", product.brand)}</div>

            {/* Price */}
            <div className="text-gray-400">{product.price}</div>

            {/* Sale Price */}
            <div className="text-gray-400">{product.saleprice || "N/A"}</div>

            {/* Stock */}
            <div className="text-gray-400">{product.stock}</div>

            {/* Actions */}
            <div>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => viewItem(product)}>
                View Item
              </Button>
            </div>
          </div>
        ))}

        {/* Cards for small screens */}
        {products.map((product, index) => (
          <div
            key={index}
            className="md:hidden flex flex-col gap-4 p-4 bg-gray-900 hover:bg-gray-700 text-white mb-4">
            {/* Image */}
            <div className="flex items-center justify-center mb-2">
              <img
                className="w-24 h-24 object-cover"
                src={product?.image}
                alt={product.name}
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <h3 className="text-lg font-bold truncate">{product.name}</h3>
              <p className="text-gray-400 truncate">
                Category: {product.category}
              </p>
              <p className="text-gray-400 truncate">Brand: {product.brand}</p>
              <p className="text-gray-400">Price: {product.price}</p>
              <p className="text-gray-400">
                Sale Price: {product.saleprice || "N/A"}
              </p>
              <p className="text-gray-400">Stock: {product.stock}</p>
            </div>

            {/* Actions */}
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white mt-2"
              onClick={() => viewItem(product)}>
              View Item
            </Button>
          </div>
        ))}

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ProductsTable;
