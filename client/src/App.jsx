import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/authC/AuthLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboardV from "./pages/admin-v/AdminDashboardV";
import AdminAboutV from "./pages/admin-v/AdminProductsV";
import AdminOrderV from "./pages/admin-v/AdminOrderV";
import ShoppingVlayout from "./components/ShoppingV/ShoppingVlayout";
import ShoppingProductV from "./pages/shopping-v/ShoppingProductV";
import ShoppingOrdersV from "./pages/shopping-v/ShoppingHome";
import ShoppingCheckoutV from "./pages/shopping-v/ShoppingCheckoutV";
import Errorpage from "./pages/Errorpage";
import UnAuth from "./pages/UnAuth";
import CheckAuth from "./components/custom/CheckAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  keepUser,
  selectAuthenticated,
  selectLoading,
  selectUser,
} from "./redux/slices/authentication";
import { useEffect } from "react";
import AdminProductsV from "./pages/admin-v/AdminProductsV";
import AdminUsersV from "./pages/admin-v/AdminUsersV";
import Settings from "./pages/admin-v/Settings";
import ShoppingHome from "./pages/shopping-v/ShoppingHome";
import AccountPage from "./pages/shopping-v/AccountPage";
import PayPalReturn from "./pages/shopping-v/Paypal-return";
import Search from "./pages/shopping-v/Search";
import WishlistPage from "./pages/shopping-v/WishList";

const App = () => {
  const isAuthenticated = useSelector(selectAuthenticated);
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(keepUser());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col overflow-hidden bg-[#ffffff] flex-column ">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth
              user={user}
              isAuthenticated={isAuthenticated}
              Page={<AuthLayout />}
            />
          }>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth
              user={user}
              isAuthenticated={isAuthenticated}
              Page={<AdminLayout />}
            />
          }>
          <Route path="dashboard" element={<AdminDashboardV />} />
          <Route path="orders" element={<AdminOrderV />} />
          <Route path="products" element={<AdminProductsV />} />
          <Route path="users" element={<AdminUsersV />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route
          path="/forgeshop"
          element={
            <CheckAuth
              user={user}
              isAuthenticated={isAuthenticated}
              Page={<ShoppingVlayout />}
            />
          }>
          <Route path="products" element={<ShoppingProductV />} />
          <Route path="home" element={<ShoppingHome />} />
          <Route path="" element={<ShoppingHome />} />
          <Route path="checkout" element={<ShoppingCheckoutV />} />
          <Route path="account-info" element={<AccountPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="search" element={<Search />} />
          <Route path="paypal-return" element={<PayPalReturn />} />
        </Route>

        <Route path="*" element={<Errorpage />} />
        <Route path="/unauth" element={<UnAuth />} />
      </Routes>
    </div>
  );
};

export default App;
