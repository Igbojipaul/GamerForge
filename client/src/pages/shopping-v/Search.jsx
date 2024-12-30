import {
  getSearchedProducts,
  resetKeyword,
  selectLoading,
  SelectProducts,
  SelectKeyword,
} from "@/redux/slices/search";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/shoppingV/ProductCard";
import { addToCart } from "@/redux/slices/shopCart";
import { fetchProductDetails, selectProduct } from "@/redux/slices/shopProduct";
import ProductDetails from "@/components/shoppingV/productDetails";
import { useToast } from "@/hooks/use-toast";

const Search = () => {
  const products = useSelector(SelectProducts);
  const loading = useSelector(selectLoading);
  const product = useSelector(selectProduct);
  const currentSearchedProduct = useSelector(SelectKeyword);
  const { toast } = useToast();

  const [dialogOpen, setDailogOpen] = useState(false);

  
  const dispatch = useDispatch();
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  const keyword = searchParams.get("keyword")

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchedProducts(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetKeyword());
    }
  }, [keyword]);

  const handleSearch = () => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchedProducts(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetKeyword());
    }
  };

  const handleViewItem = (id) => {
    dispatch(fetchProductDetails(id));
    if (product) setDailogOpen(true);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(products);

  return (
    <>
      {/* product details */}

      <ProductDetails
          open={dialogOpen}
          setOpen={setDailogOpen}
          product={product}
          handleAddtoCart={handleAddtoCart}
        />

      <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.length >= 1 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              handleViewItem={handleViewItem}
              handleAddtoCart={handleAddtoCart}
            />
          ))
        ) : (
          <div className="flex items-center justify-center text-white">
            No Products
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
