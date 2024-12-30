import { Button } from "@/components/ui/button";
import gameDesk from "../../assets/gamedesk.jpg";
import gameDesk1 from "../../assets/gamedesk1.jpg";
import gameDesk2 from "../../assets/gamedesk2.jpg";
import gameDesk3 from "../../assets/gamedesk3.jpg";
import gameDesk4 from "../../assets/gamedesk4.jpg";
import { reviews } from "@/constants/testArrays&obj";
import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { brands, categories } from "@/constants/sortItems";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilteredProducts,
  fetchProductDetails,
  selectProduct,
  selectProducts,
} from "@/redux/slices/shopProduct";
import ProductCard from "@/components/shoppingV/ProductCard";
import { addToCart } from "@/redux/slices/shopCart";
import { useToast } from "@/hooks/use-toast";
import ProductDetails from "@/components/shoppingV/productDetails";
import { deleteSavedItem, fetchSavedItems, saveItem, selectSavedItems } from "@/redux/slices/wishlist";

const ShoppingHome = () => {
  const heroImages = [gameDesk, gameDesk1, gameDesk2, gameDesk3, gameDesk4];
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const savedItems = useSelector(selectSavedItems);


  const [dialogOpen, setDailogOpen] = useState(false);
  const product = useSelector(selectProduct);

  const [fade, setFade] = useState(true); // For fade effect

  const { toast } = useToast();

  const dispatch = useDispatch();
  const navigate = useNavigate()

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

  const handleNavigate = (filter, value) => {
    navigate(`/forgeshop/products?${filter}=${encodeURIComponent(value)}`);
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentHeroImage((prev) =>
          prev === heroImages.length - 1 ? 0 : prev + 1
        );
        setFade(true);
      }, 700);
    }, [5000]);

    return () => clearInterval(interval);
  }, [heroImages.length]);


  useEffect(() => {
    dispatch(fetchFilteredProducts());
  }, [dispatch]);
  const products = useSelector(selectProducts);

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

  function checkIsSaved(id){
    const item = savedItems.find((item) => item.productId._id === id)

    if(item){
      return true
    }
    return false
  }

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className={`relative h-[50vh]  flex items-center justify-start md:h-[70vh] lg:h-[80vh]`}>
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${heroImages[currentHeroImage]})`, backgroundPosition: 'center', backgroundRepeat: "no-repeat" }}
        />
        <div className="relative z-10 md:text-left ml-10 ">
          <h1 className="text-4xl font-bold text-white md:text-6xl lg:8xl">
            Welcome to GamerForge
          </h1>
          <p className="text-lg mt-2 mb-5 text-gray-300">
            The best place for all your gaming needs
          </p>
          <NavLink
            to="/forgeshop/products"
            className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700">
            Shop Now
          </NavLink>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-800">
        <h2 className="text-3xl font-semibold mb-6 text-center text-purple-700">
          Shop by Category
        </h2>
        <div className="flex gap-4 flex-wrap space-x-4 overflow-x-auto px-4 items-center justify-center">
          {categories.map((category, i) => (
            <div
              key={i}
              className="min-w-[150px] bg-gray-700 text-purple-300 p-4 rounded-lg text-center hover:bg-gray-600 transition"
              onClick={()=>handleNavigate("categories", (category.value))}>
              {category.label}
            </div>
          ))}
        </div>
        <h2 className="text-3xl font-semibold mb-6 mt-8 text-center text-purple-700">
          Shop by Brand
        </h2>
        <div className="flex gap-4 flex-wrap space-x-4 overflow-x-auto px-4 items-center justify-center">
          {brands.map((brand, i) => (
            <div
              key={i}
              className="min-w-[150px] bg-gray-700 text-purple-300 p-4 rounded-lg text-center hover:bg-gray-600 transition"
              onClick={()=>handleNavigate("brands", (brand.value))}>
              {brand.label}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <h2 className="text-3xl text-purple-600 font-semibold mb-8 text-center">
          Featured Products
        </h2>
        <ProductDetails
          open={dialogOpen}
          setOpen={setDailogOpen}
          product={product}
          handleAddtoCart={handleAddtoCart}
          handleRemoveFromWishlist={handleRemoveFromWishlist}
        />
        <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard
                key={product._id}
                product={product}
                handleViewItem={handleViewItem}
                handleAddtoCart={handleAddtoCart}
                handleAddToWishList={handleAddToWishList}
                isSaved={checkIsSaved(product._id)}
              />
          ))}
        </div>
      </section>
      {/* Promo Banner */}
      <section className="bg-purple-950 py-6 text-center">
        <h2 className="text-xl font-bold">Limited Time Offer!</h2>
        <p>Get up to 50% off select items. Hurry, ends soon!</p>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 px-4 bg-gray-900">
        <h2 className="text-3xl font-semibold mb-8 text-center text-purple-500">
          What Our Customers Say
        </h2>
        <Carousel className="h-[80vh]">
          <CarouselContent className="gap-10">
            {reviews.map((review, i) => (
              <CarouselItem
                key={i}
                className="bg-[#1e1e2f] p-6 py-[100px] w-full  rounded-lg gap-10 h-[75vh]  shadow-md flex flex-col sm:flex-row md:px-[30%] items-center">
                <div className="w-full sm:w-60 h-[400px] flex items-center justify-center rounded-sm overflow-hidden">
                  <img
                    src={gameDesk1}
                    alt="name"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col h-[400px] justify-between mt-4 sm:mt-0">
                  <div>
                    <div className="text-yellow-400 text-lg">★★★★★</div>
                    <p className="text-gray-300 mt-2">{review.text}</p>
                  </div>
                  <div>
                    <h4 className="mt-2 text-lg text-white">- {review.user}</h4>
                    <p className="text-md text-gray-500">Customer</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-purple-500 bg-purple-950" />
          <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-purple-500 bg-purple-950" />
        </Carousel>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 px-4 bg-gray-800 text-center">
        <h2 className="text-3xl font-semibold text-white">Stay Updated</h2>
        <p className="text-gray-400 mt-2">
          Get the latest gaming deals and news delivered to your inbox.
        </p>
        <div className="mt-4 flex justify-center items-center">
          <input
            type="email"
            placeholder="Your email"
            className="p-3 rounded-l-lg text-gray-900 w-72 focus:outline-none"
          />
          <Button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-l-none h-[48px] rounded-r-lg">
            Subscribe
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-center text-gray-400">
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white">Follow Us</h3>
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="#"
              className="text-gray-400 hover:text-purple-500 transition">
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-500 transition">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-500 transition">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-500 transition">
              <i className="fab fa-youtube text-xl"></i>
            </a>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="flex justify-center gap-6 mt-4 text-gray-400">
            <li>
              <a href="#" className="hover:text-purple-500 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-500 transition">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-500 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-500 transition">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <p className="text-sm text-gray-500">
          © 2024 GamerForge. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default ShoppingHome;
