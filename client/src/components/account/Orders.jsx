import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import React from "react";

const Orders = () => {

  const orders = [{
    id: "49930jhbduj39",
    date: "23/03/2024",
    status: "Delivered",
    total: 45000,
    products: [
      {id: "fjhnieujrrfeffefef894i3hrnfviu34wr", image: "https://beautiful", name: "Keyboard"},
      {id: "fjhnieujrr894i3hrnfviu34wr", image: "https://beautiful", name: "Keyboard"}
    ]
  },
  {
    id: "49930jhwddwdbduj39",
    date: "23/03/2024",
    status: "Delivered",
    total: 45000,
    products: [
      {id: "fjhnieujrrfeffefef894i3hrnfviu34wr", image: "https://beautiful", name: "Keyboard"},
      {id: "fjhnieujrr894i3hrnfviu34wr", image: "https://beautiful", name: "Keyboard"}
    ]
  }]
  return (
    <div className="p-6 w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">My Orders</h2>
      <p className="text-gray-500 mb-8">
        Here are the details of your recent purchases.
      </p>

      {orders.map((order) => (
        <motion.div
          key={order.id}
          whileHover={{ scale: 1.02 }}
          className="border border-gray-200 shadow-lg rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-500 text-sm">Order ID: {order.id}</p>
              <p className="font-medium text-lg">{order.date}</p>
            </div>
            <Badge
              className={`p-2 text-sm font-semibold ${
                order.status === "Delivered" ? "bg-green-500" : "bg-yellow-500"
              }`}>
              {order.status}
            </Badge>
          </div>

          <div className="space-y-3">
            {order.products.map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-gray-600 text-sm">
                    Quantity: {product.quantity}
                  </p>
                </div>
                <p className="font-semibold text-purple-500">
                  ${product.price}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-semibold">Total: ${order.total}</p>
            <Button
              whileHover={{ scale: 1.05 }}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg">
              View Details
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Orders;
