import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./orderConfirm.css";

const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem("orderDetails");
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder));
    }
  }, []);

  return (
    <motion.div
      className="order-confirmation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="order-header"
        initial={{ y: -30 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 60 }}
      >
        <h1>🎉 Order Placed Successfully!</h1>
        <p>Thank you for your order! Your delicious meal is on the way 🚀</p>
      </motion.div>

      {orderDetails && (
        <motion.div
          className="order-details"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Delivery Details */}
          <div className="customer-info">
            <h2>📦 Delivery Details</h2>
            <div className="customer-info-box">
              <p><strong>Name:</strong> {orderDetails.customer}</p>
              <p><strong>Phone:</strong> {orderDetails.phone}</p>
              <p><strong>Address:</strong> {orderDetails.address}</p>
            </div>
          </div>

          {/* Order Receipt */}
          <div className="order-receipt">
            <h2>🧾 Order Summary</h2>
            <div className="item-list">
              {orderDetails.items.map((item, index) => (
                <div className="item-row" key={index}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Delivery: $5.00</p>
                    <p className="total">
                      Total: ${(item.quantity * item.price + 5).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="total-paid">
              <strong>Total Paid: </strong>
              ${orderDetails.totalAmount.toFixed(2)}
            </div>
          </div>

          {/* Button */}
          <div className="back-home">
            <button onClick={() => (window.location.href = "/")}>
              Continue Shopping
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OrderConfirmation;
