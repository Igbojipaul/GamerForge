import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TrashIcon, ShoppingBagIcon, Loader, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSavedItem,
  fetchSavedItems,
  selectLoading,
  selectSavedItems,
} from "@/redux/slices/wishlist";
import { addToCart } from "@/redux/slices/shopCart";
import { useToast } from "@/hooks/use-toast";
import ProductDetails from "@/components/shoppingV/productDetails";
import { fetchProductDetails, selectProduct } from "@/redux/slices/shopProduct";




const WishlistPage = () => {
  const dispatch = useDispatch();
  const {toast} = useToast()
  const savedItems = useSelector(selectSavedItems);
  const loading = useSelector(selectLoading);
  const [dialogOpen, setDailogOpen] = useState(false);
  const product = useSelector(selectProduct);

  useEffect(() => {
    dispatch(fetchSavedItems());
  }, [dispatch]);


  const handleRemoveFromWishlist = (id) => {
    dispatch(deleteSavedItem(id)).then((data) => {
      if (data?.payload?.success) {
        toast({ description: `${data.payload?.message}` });
      } else {
        toast({
          title: "Failed to remove item",
          description: `${data?.payload?.message}`,
        });
      }
    });
  };

  const handleAddtoCart = (productId, quantity) => {
    dispatch(addToCart({ productId, quantity })).then((data) => {
      if (data.payload.success) {
        toast({
          description: `${data.payload.message}`,
        });
      }
    });
  };

  const handleViewItem = (id) => {
    dispatch(fetchProductDetails(id)).then((data) => {
      if (data?.payload?.success) {
         setDailogOpen(true);
      }
    });
  };

  if (loading) {
    <div className="bg-gradient-to-b from-purple-800 to-purple-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
        <Loader />
      </div>
    </div>;
  }

  return (
    <div className="bg-gradient-to-b from-purple-800 to-purple-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

        <ProductDetails
          open={dialogOpen}
          setOpen={setDailogOpen}
          product={product}
          handleAddtoCart={handleAddtoCart}
        />

        {savedItems.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {savedItems.map((item) => (
              <motion.div
                key={item?.productId?._id}
                className="bg-purple-700 p-4 rounded-lg shadow-lg cursor-pointer"
                onClick={()=> handleViewItem(item?.productId?._id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <img
                  src={item?.productId?.image}
                  alt={item?.productId?.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold mb-2">
                    {item?.productId?.name}
                  </h2>
                  <span className="text-lg mb-2 capitalize font-semibold text-purple-300">{item?.productId?.brand}</span>
                </div>
                <div>
                <p className="text-sm text-gray-300 mb-2">
                  $
                  {item?.productId.saleprice > 0
                    ? item.productId?.saleprice
                    : item?.productId?.price}
                </p>
                </div>
                <p
                  className={`text-sm mb-4 ${
                    item.stock > 0 ? "text-green-400" : "text-yellow-400"
                  }`}>
                  {item.stock}
                </p>
                <div className="flex justify-between">
                  <button
                    className="flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500"
                    onClick={() => handleAddtoCart(item?.productId?._id, 1)}>
                    <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                  </button>
                  <button
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                    onClick={() => handleRemoveFromWishlist(item?.productId?._id)}>
                    <TrashIcon className="w-5 h-5 mr-2" /> Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">
              Your wishlist is empty!
            </h2>
            <p className="text-gray-300 mb-6">
              Start adding items to your wishlist now.
            </p>
            <Link
              to="/forgeshop/products"
              className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-500">
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
