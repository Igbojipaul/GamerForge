import {
  Home,
  ShoppingBag,
  ShoppingCart,
  Menu,
  User,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "@/redux/slices/authentication";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useEffect, useState } from "react";
import CartItemsWrapper from "./cartItems-wrapper";
import { fetchCartItems, selectCartItems } from "@/redux/slices/shopCart";

const Header = () => {
  const user = useSelector(selectUser);
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate()
  
  const [keyword, setKeyword] = useState("");

  const noOfItemsInCart =
    cartItems &&
    cartItems.reduce((sum, item) => {
      const no = item?.quantity;
      return sum + no;
    }, 0);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/forgeshop/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const [openCartSheet, setOpenCartSheet] = useState(false);


  const handleKeywordChange = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const navigateToSavedItems = ()=>{
    navigate("/forgeshop/wishlist")
  }

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 shadow-lg sticky">
      <div className="container flex items-center justify-between mx-auto">
        {/* Logo */}
        <NavLink
          to="/forgeshop/home"
          className="flex items-center justify-center space-x-2 text-2xl font-bold text-purple-500 shadow-sm">
          <Home />
          <span>GAMERFORGE</span>
        </NavLink>

        {/* Search Bar */}
        <div className="items-center hidden md:flex">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-[18rem] h-10 p-3 rounded-l-md focus:outline-none text-gray-700 bg-gray-200 placeholder-gray-500"
            value={keyword}
            onChange={handleKeywordChange}
          />
          <Button
            className="h-10 px-4 font-semibold text-white bg-purple-600 rounded-l-none hover:bg-purple-500 rounded-r-md"
            onClick={()=> handleSearch()}>
            Search
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="items-center hidden gap-6 md:flex">
          <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
            <div
              onClick={() => {
                setOpenCartSheet(true);
              }}
              className="text-xl cursor-pointer relative text-purple-400 hover:text-purple-300  ml-4 mr-0 p-0">
              <ShoppingCart />
              <span className="w-4 p-[10px] absolute top-[-19px] right-[-4px] h-4 flex items-center justify-center bg-purple-700 rounded-full text-white text-sm">
                {noOfItemsInCart}
              </span>
            </div>
            <CartItemsWrapper
              cartItems={cartItems}
              setSheet={setOpenCartSheet}
            />
          </Sheet>
          <div className="text-xl text-purple-400 p-0 hover:text-purple-300  ml-0">
            <ShoppingBag onClick={navigateToSavedItems} />
          </div>

          {/* Avatar with dropdown */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="">
                <Avatar>
                  <AvatarImage src={user?.image} />
                  <AvatarFallback className="p-2.5 text-white uppercase bg-purple-500 rounded-full">
                    {user?.name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-48 rounded-md shadow-md bg-gray">
              <NavLink
                to="/forgeshop/account-info"
                className="flex items-center justify-between p-2 text-white hover:bg-purple-300">
                <p>View Profile </p>
                <User />
              </NavLink>
              <Button
                variant="ghost"
                onClick={() => dispatch(logoutUser())}
                className="flex w-full gap-2 p-2 text-left text-gray-300 hover:bg-purple-300">
                Logout
                <LogOut />
              </Button>
            </PopoverContent>
          </Popover>
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-2 text-purple-500">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 text-white bg-gray-800">
              <NavLink
                to="/forgeshop/products"
                className="flex items-center p-4 space-x-2 text-2xl font-bold text-purple-400"
                onClick={() => setOpen(false)}>
                <Home />
                <span>GAMERFORGE</span>
              </NavLink>
              <nav className="flex flex-col mt-6 space-y-4">
                <NavLink
                  to="/forgeshop/products"
                  className="p-2 hover:bg-gray-700"
                  onClick={() => setOpen(false)}>
                  Shop
                </NavLink>
                <NavLink
                  to="/forgeshop/account-info"
                  className="p-2 hover:bg-gray-700"
                  onClick={() => setOpen(false)}>
                  Inbox
                </NavLink>
                <NavLink
                  to="/forgeshop/wishlist"
                  className="p-2 hover:bg-gray-700"
                  onClick={() => setOpen(false)}>
                  Saved Items
                </NavLink>
                <NavLink
                  to="/forgeshop/checkout"
                  className="p-2 hover:bg-gray-700"
                  onClick={() => setOpen(false)}>
                  Checkout
                </NavLink>
                <NavLink
                  to="/forgeshop/account-info"
                  className="p-2 hover:bg-gray-700">
                  Profile
                </NavLink>
                <Button
                  variant="ghost"
                  onClick={() => dispatch(logoutUser())}
                  className="w-full p-2 text-left hover:bg-gray-700">
                  Logout
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
