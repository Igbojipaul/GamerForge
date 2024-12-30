const createPayPalOrder = require("../../helper/createOrder");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Products");

const initiatePayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      shippingFee,
      itemsSubtotal,
      tax,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;


    



    const computedSubtotal = cartItems.reduce(
      (sum, item) =>
        sum +
        (item.saleprice > 1 ? item.saleprice : item.price) *
          item.quantity,
      0
    );

    console.log(computedSubtotal);
    
    
    if (computedSubtotal.toFixed(2) !== itemsSubtotal.toFixed(2)) {
      return res
        .status(400)
        .json({ success: false, message: "Subtotal mismatch detected" });
    }
    
    const payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://5173/shop/paypal-return",
        cancel_url: "http://5173/shop/paypal-return",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.name,
              sku: item.productId,
              price: (item.saleprice > 1
                ? item.saleprice
                : item.price
              ).toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            total: totalAmount.toFixed(2),
            currency: "USD",
            details: {
              subtotal: itemsSubtotal.toFixed(2),
              shipping: shippingFee.toFixed(2),
              tax: tax.toFixed(2),
            },
          },
          description: "Purchase description",
        },
      ],
    };
    

    const { payId, approvalUrl } = await createPayPalOrder(payment_json);
    if (!payId || !approvalUrl) {
      return res
        .status(500)
        .json({ success: false, message: "Could not complete Payment" });
    }

    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    });

    await newlyCreatedOrder.save();

    return res
      .status(200)
      .json({ success: true, payId, orderId: newlyCreatedOrder._id, approvalUrl });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message + " sorry, try again" });
  }
};


module.exports = {initiatePayment}
