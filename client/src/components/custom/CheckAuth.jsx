import { selectLoading } from "@/redux/slices/authentication";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, Page }) {
  const loading = useSelector(selectLoading);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }
  if(isAuthenticated === null){
      return <div>Loading...</div>
  }

  // Redirect to login page if not authenticated and trying to access a protected route
  if (!isAuthenticated || !user) {
    if (!(location.pathname.includes('/signup') || location.pathname.includes('/login'))) {
      return <Navigate to='/auth/login' />;
    }
  }

  // If authenticated but user tries to access login or signup pages, redirect appropriately
  if (isAuthenticated && (location.pathname.includes('/signup') || location.pathname.includes('/login'))) {
    if (user?.role === 'admin') {
      return <Navigate to='/admin/dashboard' />;
    }
    return <Navigate to='/forgeshop/home' />;
  }
  // if (isAuthenticated && location.pathname === "/forgeshop") {
  //   if (user?.role === 'admin') {
  //     return <Navigate to='/admin/dashboard' />;
  //   }
  //   return <Navigate to='/forgeshop/home' />;
  // }

  // If authenticated as a non-admin but trying to access admin routes, redirect to unauthorized page
  if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('/admin')) {
    return <Navigate to='/unauth' />;
  }

  // If authenticated as an admin but trying to access user routes, redirect to admin dashboard
  if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('/forgeshop')) {
    return <Navigate to='/admin/dashboard' />;
  }

  // Return the requested page if no redirects are necessary
  return <>{Page}</>;
}

export default CheckAuth;
