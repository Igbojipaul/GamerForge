import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@radix-ui/react-dialog";
import React from "react";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { X, Star } from "lucide-react";
import { getLabelByValue } from "@/constants/formInputs";

const ProductDetails = ({ open, setOpen, product, handleAddtoCart }) => {
  let category = "";
  if (product) {
    category = product.category;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Overlay */}
      <DialogOverlay className="fixed inset-0 bg-black/70 transition-opacity duration-300" />

      {/* Dialog Content */}
      <DialogContent
        className="fixed z-50 p-8 bg-[#1e1e2f] rounded-lg shadow-lg max-w-2xl w-full h-auto max-h-[85vh] mx-auto inset-x-0 top-9 
                 transform transition-all duration-500 ease-in-out border border-purple-700 text-white overflow-y-auto">
        {/* Dialog Header */}
        <DialogHeader className="flex justify-between items-center border-b border-purple-600 pb-3">
          <DialogTitle className="text-xl font-bold tracking-wide text-purple-400">
            {product?.name || "Product Details"}
          </DialogTitle>
          <span className="capitalize text-purple-300 font-semibold text-xl">
            {getLabelByValue("category", category)}
          </span>

          <Button
            onClick={() => setOpen(false)}
            className="text-white hover:bg-purple-500 p-3 h-5 w-5 rounded-md transition duration-200">
            <X />
          </Button>
        </DialogHeader>

        {/* Product Content */}
        <div className="flex mt-4 gap-6">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-[400px] h-[300px] object-cover rounded-lg border border-purple-500 shadow-sm"
          />
          <div className="flex flex-col gap-3 w-1/2">
            <h4 className="text-lg font-semibold">{product?.name}</h4>
            <span className="capitalize text-purple-400">{product?.brand}</span>
            <p className="text-sm text-gray-300">{product?.description}</p>
            <p
              className={`text-lg ${
                product?.saleprice
                  ? "line-through text-red-500"
                  : "text-green-500"
              }`}>
              ${product?.price}
            </p>
            {product?.saleprice > 0 && (
              <p className="text-lg font-semibold text-green-400">
                ${product?.saleprice}
              </p>
            )}
            {/* Static Ratings Section */}
            <div className="flex items-center mt-2">
              <p className="text-yellow-400 font-semibold text-sm mr-2">
                4.5/5
              </p>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < 4 ? "text-yellow-400" : "text-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-purple-400">Reviews</h3>
          <div className="mt-3 space-y-4">
            {/* Static Comment Example */}
            <div className="flex items-start gap-3">
              <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                U
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-200">
                  Username1
                  <span className="text-xs text-gray-400 ml-2">1 day ago</span>
                </p>
                <p className="text-sm text-gray-300">
                  This product is amazing! Exceeded my expectations.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                J
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-200">
                  Username2
                  <span className="text-xs text-gray-400 ml-2">3 days ago</span>
                </p>
                <p className="text-sm text-gray-300">
                  Good value for the price. Would recommend to others.
                </p>
              </div>
            </div>
            {/* Add more comments as needed */}
            <div>
              
            </div>
          </div>
        </div>

        {/* Footer with Buttons */}
        <DialogFooter className="mt-6 flex justify-end space-x-4">
          <Button
            type="button"
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none
                           transition duration-200 shadow-md">
            Close
          </Button>
          <Button
            onClick={() => handleAddtoCart(product._id, 1)}
            type="submit"
            className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none
                           transition duration-200 shadow-md">
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
