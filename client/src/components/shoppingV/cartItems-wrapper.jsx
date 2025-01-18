import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import CartItemContent from "./CartItemContent";

function CartItemsWrapper({ cartItems, setSheet }) {
  const navigate = useNavigate()
  const totalCost =
    cartItems &&
    cartItems.reduce((sum, item) => {
      const price = item.productId.saleprice || item.productId.price;
      return sum + price * item.quantity;
    }, 0);

  function proceedCheckout() {
    setSheet(false)
    return navigate("/forgeshop/checkout");

  }

  return (
    <SheetContent className="bg-[#1e1e2f] sm:max-w-md text-white p-6">
      <SheetHeader>
        <SheetTitle className="text-purple-400 text-2xl font-bold">
          Your Cart
        </SheetTitle>
      </SheetHeader>

      <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-purple-900">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItemContent key={item.productId._id} product={item} />
          ))
        ) : (
          <p className="text-gray-400 text-center">Your cart is empty</p>
        )}
      </div>

      <div className="mt-8 flex justify-between items-center font-bold text-xl border-t border-purple-700 pt-4">
        <span>Total</span>
        <span>${totalCost?.toFixed(2)}</span>
      </div>

      <Button
        onClick={proceedCheckout}
        className={`w-full mt-6 bg-green-600 hover:bg-green-700 text-white ${
          cartItems && cartItems.length > 0
            ? ""
            : "cursor-not-allowed bg-slate-500 hover:bg-slate-500"
        }`}>
        Proceed to Checkout
      </Button>
    </SheetContent>
  );
}

export default CartItemsWrapper;
