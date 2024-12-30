const paypal = require("./paypal");

const createPayPalOrder = async (paymentJson) => {
  try {
    const { payId, approvalUrl } = await new Promise((resolve, reject) => {
      paypal.payment.create(paymentJson, (error, payment) => {
        if (error) {
          console.error(
            "Error creating PayPal order:",
            error.response || error
          );
          reject(new Error("Failed to create PayPal order"));
        } else {
          const payId = payment.id
          const approvalUrl = payment.links.find(link => link.rel === "approval_url").href;

          resolve({payId, approvalUrl});
        }
      });
    });
    return {payId, approvalUrl};
  } catch (error) {
    console.log(error.message);
    throw error;
  }

};


module.exports = createPayPalOrder;
