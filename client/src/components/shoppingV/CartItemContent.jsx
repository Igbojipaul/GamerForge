import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import {
  deleteCartItem,
  fetchCartItems,
  updateCartItem,
} from "@/redux/slices/shopCart";

import { useToast } from "@/hooks/use-toast";

function CartItemContent({ product }) {
  const dispatch = useDispatch();
  const { productId, quantity } = product;
  const productPrice = productId.saleprice || productId.price;

  const { toast } = useToast();

  const handleUpdateCartItem = (product, action) => {
    if (action === "add") {
      dispatch(
        updateCartItem({ productId: product._id, quantity: quantity + 1 })
      ).then((data) => {
        if (data.payload.success) {
          dispatch(fetchCartItems());
        }
      });
    } else {
      dispatch(
        updateCartItem({ productId: product._id, quantity: quantity - 1 })
      ).then((data) => {
        if (data.payload.success) {
          dispatch(fetchCartItems());
        }
      });
    }
  };

  const handleDeleteItem = (product) => {
    dispatch(deleteCartItem(product._id)).then((data) => {
      if (data.payload.success) {
        toast({ title: data.payload.message });

        dispatch(fetchCartItems());
      }
    });
  };

  return (
    <div className="flex items-center bg-[#2a2a3e] rounded-lg p-4 space-x-4 shadow-lg">
      <img
        src={productId.image}
        alt={productId.name}
        className="w-20 h-20 object-cover rounded-lg border border-purple-500"
      />

      <div className="flex-1">
        <h4 className="text-lg font-semibold text-purple-400">
          {productId.name}
        </h4>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Button
            onClick={() => handleUpdateCartItem(productId, "minus")}
            disabled={quantity === 1}
            className={`bg-gray-700 text-white h-7 px-2 py-1 rounded-md hover:bg-gray-600 ${
              quantity === 1 ? "cursor-not-allowed bg-slate-500" : ""
            }`}>
            -
          </Button>

          <span className="t-lg">{quantity}</span>
          <Button
            onClick={() => handleUpdateCartItem(productId, "add")}
            className="bg-gray-700 text-white px-2 py-1 h-7 rounded-md hover:bg-gray-600">
            +
          </Button>
        </div>
        <p className="text-green-400 font-bold mt-2">
          ${(productPrice * quantity).toFixed(2)}
        </p>
      </div>

      <Button
        onClick={() => handleDeleteItem(productId)}
        className="text-red-500 hover:text-red-700 transition">
        <Trash2 className="w-6 h-6" />
      </Button>
    </div>
  );
}

export default CartItemContent;
