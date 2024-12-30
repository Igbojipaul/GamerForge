import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import AddressCard from "@/components/account/AddressCard";
import CartItemContent from "@/components/shoppingV/CartItemContent";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fetchAddresses, selectAddress } from "@/redux/slices/address";
import {
  fetchCartItems,
  selectCartId,
  selectCartItems,
} from "@/redux/slices/shopCart";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { initiatePayment, selectApprovalUrl } from "@/redux/slices/order";
import { DialogOverlay } from "@radix-ui/react-dialog";

const ShoppingCheckoutV = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const cartId = useSelector(selectCartId);
  const addressArray = useSelector(selectAddress);
  const cartItems = useSelector(selectCartItems);

  const approvalUrl = useSelector(selectApprovalUrl)

  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); // For the address dialog

  const totalCost =
    cartItems &&
    cartItems.reduce((sum, item) => {
      const price = item.productId.saleprice || item.productId.price;
      return sum + price * item.quantity;
    }, 0);



  const shippingFee =
    cartItems &&
    cartItems.reduce((sum, item) => {
      const price =
        item.productId.saleprice * (3 / 100) ||
        item.productId.price * (3 / 100);
      return sum + price * item.quantity;
    }, 0);

  const tax =
    cartItems &&
    cartItems.reduce((sum, item) => {
      const price =
        item.productId.saleprice * (4 / 100) ||
        item.productId.price * (4 / 100);
      return sum + price * item.quantity;
    }, 0);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const placeOrder = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (!selectedAddress && !defAddress) {
      toast({
        title: "Please select an address to proceed.",
        variant: "destructive",
      });
      return;
    }
    if (paymentMethod === "creditCard") {
      setPaymentMethod("paypal");
      return toast({
        title:
          "Sorry, this feature is not yet available. Try checking out with PayPal.",
      });
    }

    const orderForm = {
      cartId,
      cartItems: cartItems.map((cartItem) => ({
        productId: cartItem.productId._id,
        name: cartItem.productId.name,
        image: cartItem.productId.image,
        price:
          cartItem.productId.saleprice > 1
            ? cartItem.productId.saleprice
            : cartItem.productId.price,
        quantity: cartItem.quantity,
      })),
      addressInfo: {
        addressId: selectedAddress?._id || defAddress?._id,
        address: selectedAddress?.addressLine1 || defAddress?.addressLine1,
        city: selectedAddress?.city || defAddress?.city,
        state: selectedAddress?.state || defAddress?.state,
        postalCode: selectedAddress?.postalCode || defAddress?.postalCode,
        country: selectedAddress?.country || defAddress?.country,
        phone: selectedAddress?.phone || defAddress?.phone,
      },
      orderStatus: "pending",
      paymentMethod,
      paymentStatus: "pending",
      totalAmount: totalCost + shippingFee + tax,
      itemsSubtotal: totalCost,
      shippingFee,
      tax,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    dispatch(initiatePayment(orderForm)).then((data) => {
      console.log(data?.payload, "Order created");
    });

  };
  if(approvalUrl){
    window.location.href = approvalUrl
  }

  console.log(approvalUrl);
  

  useEffect(() => {
    dispatch(fetchAddresses());
    dispatch(fetchCartItems());
  }, [dispatch]);

  const [defAddress, setDefaultAddress] = useState(null)

  useEffect(()=>{
    setDefaultAddress(addressArray.find((addr) => addr.isDefault === true))  
  }, [addressArray.length])


  

  return (
    <div className="container flex flex-col gap-8 p-6 mx-auto lg:flex-row">
      <div className="flex flex-col space-y-6 lg:w-2/3">
        <h2 className="mb-4 text-2xl font-semibold">Checkout</h2>
        <div className="space-y-6">
          {/* Shipping Address Section */}
          <div className="p-4 space-y-4 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-purple-500">
              Shipping Address
            </h3>
            {defAddress || selectedAddress ? (
              <AddressCard
                address={defAddress || selectedAddress}
                isCheckout={true}
              />
            ) : (
              <p className="text-gray-300">No address selected.</p>
            )}
            <Button
              className="bg-purple-500"
              onClick={() => setDialogOpen(true)}>
              {selectedAddress ? "Change Address" : "Add Address"}
            </Button>
          </div>

          {/* Payment Method Section */}
          <div className="p-4 space-y-4 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-purple-500">
              Payment Method
            </h3>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                name="payment"
                value="creditCard"
                checked={paymentMethod === "creditCard"}
                onChange={handlePaymentMethodChange}
              />
              <label>Credit Card</label>

              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={handlePaymentMethodChange}
              />
              <label>Paypal</label>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="p-4 space-y-4 bg-gray-800 rounded-lg shadow-md lg:w-1/3">
        <h3 className="text-lg font-semibold text-purple-500">Order Summary</h3>
        {cartItems.map((cartItem) => (
          <CartItemContent id={cartItem._id} product={cartItem} />
        ))}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-gray-200">
            <p>Subtotal</p>
            <p>${totalCost.toFixed(2) || 0}</p>
          </div>
          <div className="flex items-center justify-between text-gray-200">
            <p>Shipping</p>
            <p>${shippingFee.toFixed(2) || 0}</p>
          </div>
          <div className="flex items-center justify-between text-gray-200">
            <p>Tax</p>
            <p>${tax.toFixed(2) || 0}</p>
          </div>
          <hr className="border-gray-600" />
          <div className="flex items-center justify-between font-semibold text-gray-100">
            <p>Total</p>
            <p>${(totalCost + shippingFee + tax).toFixed(2)}</p>
          </div>
        </div>

        <motion.button
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.01, 1] }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          onClick={placeOrder}
          className="w-full py-2 mt-4 font-semibold text-white bg-purple-500">
          Place Order
        </motion.button>
      </div>

      {/* Address Selection Dialog */}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {/* Overlay */}
        <DialogOverlay className="fixed inset-0 transition-opacity duration-300 bg-black/70" />

        {/* Dialog Content */}
        <DialogContent className="bg-[#1e1e2f] rounded-lg shadow-lg max-w-2xl w-full h-auto max-h-[85vh] mx-auto overflow-auto">
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold text-purple-500">
              Select Address
            </h3>
            {addressArray.map((address) => (
              <div
                key={address._id}
                onClick={() => {
                  setSelectedAddress(address);
                  setDialogOpen(false);
                }}
                className="p-4 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
                <AddressCard address={address} isCheckout={true} />
              </div>
            ))}
          </div>
          {/* Footer with Buttons */}
          <DialogFooter className="flex justify-end mt-6 space-x-4">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-white transition duration-200 bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShoppingCheckoutV;
