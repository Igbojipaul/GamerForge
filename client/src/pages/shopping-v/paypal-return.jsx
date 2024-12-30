import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PayPalReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const status = searchParams.get("status"); // 'success' or 'failure'
  const orderId = searchParams.get("orderId");

  // Redirect after a delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (status === "success") {
        navigate("/forgeshop/account-info"); // Redirect to the orders page
      } else {
        navigate("/forgeshop/checkout"); // Redirect to the checkout page for retry

        const { toast } = useToast();

        toast({
          title:
            "Your purchase was successful, navigate to tyour orders for your order details",
        });
      }
    }, 5000); // 5-second delay

    return () => clearTimeout(timeout);
  }, [status, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
      {status === "success" ? (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
          <h2 className="text-2xl font-semibold mt-4">Payment Successful!</h2>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. Your order ID is{" "}
            <span className="font-bold text-purple-600">{orderId}</span>.
          </p>
          <p className="text-gray-500 mt-2">You will be redirected shortly.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <XCircleIcon className="w-16 h-16 text-red-500 mx-auto" />
          <h2 className="text-2xl font-semibold mt-4">Payment Failed</h2>
          <p className="text-gray-600 mt-2">
            Unfortunately, your payment was not successful. Please try again or
            contact support if the issue persists.
          </p>
          <p className="text-gray-500 mt-2">You will be redirected shortly.</p>
        </div>
      )}
    </div>
  );
};

export default PayPalReturn;
