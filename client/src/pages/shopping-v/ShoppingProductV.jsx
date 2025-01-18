import { useEffect, useState } from "react";

import ProductFilter from "@/components/shoppingV/ProductFilter";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "@/components/shoppingV/ProductCard";
import {
  fetchFilteredProducts,
  fetchProductDetails,
  selectProduct,
  selectProducts,
} from "@/redux/slices/shopProduct";
import { selectLoading } from "@/redux/slices/adminProducts";

// to implement search params
import { useSearchParams } from "react-router-dom";
import ProductDetails from "@/components/shoppingV/productDetails";
import { addToCart, selectCartItems } from "@/redux/slices/shopCart";
import { useToast } from "@/hooks/use-toast";
import {
  deleteSavedItem,
  fetchSavedItems,
  saveItem,
  selectSavedItems,
} from "@/redux/slices/wishlist";

const ShoppingProductV = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isFilterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [dialogOpen, setDailogOpen] = useState(false);

  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const products = useSelector(selectProducts);
  const product = useSelector(selectProduct);
  const savedItems = useSelector(selectSavedItems);

  const { toast } = useToast();

  // ca function that updates urlParams
  const updateURLParams = (categories, brands) => {
    const params = {};
    if (categories.length) params.categories = categories.join(",");
    if (brands.length) params.brands = brands.join(",");

    setSearchParams(params);
  };

  const handleCategoryChange = (value) => {
    const updatedCategories = selectedCategories.includes(value)
      ? selectedCategories.filter((category) => category !== value)
      : [...selectedCategories, value];

    setSelectedCategories(updatedCategories);
    updateURLParams(updatedCategories, selectedBrands); // this is basically updating the url params function with the modified category and the already existing brands if the category changes
    sessionStorage.setItem(
      "selectedCategories",
      JSON.stringify(updatedCategories)
    );
  };

  const handleBrandChange = (value) => {
    const updatedBrands = selectedBrands.includes(value)
      ? selectedBrands.filter((brand) => brand !== value)
      : [...selectedBrands, value];

    setSelectedBrands(updatedBrands);
    updateURLParams(selectedCategories, updatedBrands); //  this is basically updating the url params function with the modified brands and the already existing category if the brand changes
    sessionStorage.setItem("selectedBrands", JSON.stringify(updatedBrands));
  };

  useEffect(() => {
    dispatch(fetchSavedItems());
  }, [dispatch]);

  const handleAddToWishList = async (id) => {
    dispatch(saveItem(id)).then((data) => {
      if (data?.payload?.success) {
        toast({ description: `${data?.payload?.message}` });
      } else {
        toast({
          title: "Failed to save item",
          description: `${data?.payload?.message}`,
        });
      }
    });
  };

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

  useEffect(() => {
    // for updating the page
    const categoriesFromURL = searchParams.get("categories")
      ? searchParams.get("categories").split(",")
      : JSON.parse(sessionStorage.getItem("selectedCategories") || "[]");

    const brandsFromURL = searchParams.get("brands")
      ? searchParams.get("brands").split(",")
      : JSON.parse(sessionStorage.getItem("selectedBrands") || "[]");

    setSelectedCategories(categoriesFromURL);
    setSelectedBrands(brandsFromURL);

    // Save the initialized values in session storage
    sessionStorage.setItem(
      "selectedCategories",
      JSON.stringify(categoriesFromURL)
    );
    sessionStorage.setItem("selectedBrands", JSON.stringify(brandsFromURL));

    // for getting the data
    const categories = searchParams.get("categories")?.split(",") || [];
    const brands = searchParams.get("brands")?.split(",") || [];
    const queryParams = { categories, brands };

    dispatch(fetchFilteredProducts(queryParams));
  }, [dispatch, searchParams]);

  const handleViewItem = (id) => {
    dispatch(fetchProductDetails(id)).then((data) => {
      if (data?.payload?.success) {
         setDailogOpen(true);
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

  function checkIsSaved(id) {
    const item = savedItems?.find((item) => item.productId._id === id);

    if (item) {
      return true;
    }
    return false;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      {/* Desktop Sidebar Filter */}
      <div className="hidden w-1/4shadow-lg lg:block">
        <ProductFilter
          selectedBrands={selectedBrands}
          selectedCategories={selectedCategories}
          setSelectedBrands={setSelectedBrands}
          setSelectedCategories={setSelectedCategories}
          handleBrandChange={handleBrandChange}
          handleCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Product Listings */}
      <div className="flex-1 p-4">
        {/* Mobile Filter Button */}
        <div className="mb-4 ml-6 mr-6 lg:hidden">
          <Sheet open={isFilterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger
              onClick={() => setFilterOpen(true)}
              className="flex justify-center w-full p-2 bg-purple-500 rounded-sm hover:bg-purple-400">
              <Filter className="mr-3" /> Filter Products
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80%] p-0 text-white ">
              <SheetHeader></SheetHeader>
              <ProductFilter
                selectedBrands={selectedBrands}
                selectedCategories={selectedCategories}
                setSelectedBrands={setSelectedBrands}
                setSelectedCategories={setSelectedCategories}
                handleBrandChange={handleBrandChange}
                handleCategoryChange={handleCategoryChange}
                onClose={() => setFilterOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>

        <ProductDetails
          open={dialogOpen}
          setOpen={setDailogOpen}
          product={product}
          handleAddtoCart={handleAddtoCart}
        />

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products ? (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                handleViewItem={handleViewItem}
                handleAddtoCart={handleAddtoCart}
                handleAddToWishList={handleAddToWishList}
                handleRemoveFromWishlist={handleRemoveFromWishlist}
                isSaved={checkIsSaved(product._id)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center text-white">
              No Products
            </div>
          )}
        </div>
      </div>
      {/* Mobile Filter Sheet */}
    </div>
  );
};

export default ShoppingProductV;
