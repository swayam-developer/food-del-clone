import { useEffect, useState } from "react";
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
    <div className="order-confirmation">
      <div className="order-header">
        <h1>🎉 Order Placed Successfully! 🎉</h1>
        <p>Thank you for your order! Your delicious meal is on the way! 🚀</p>
      </div>

      {orderDetails && (
        <div className="order-details">
          {/* Customer Info Section */}
          <div className="customer-info">
            <h2>📦 Delivery Details</h2>
            <div className="customer-info-box">
              <p>
                <strong>Name:</strong> {orderDetails.customer}
              </p>
              <p>
                <strong>Phone:</strong> {orderDetails.phone}
              </p>
              <p>
                <strong>Delivery Address:</strong> {orderDetails.address}
              </p>
            </div>
          </div>

          {/* Order Receipt Section */}
          <div className="order-receipt">
            <h2>🧾 Order Receipt</h2>
            <table className="receipt-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Delivery charges</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>$5</td>
                    <td>${(item.price * item.quantity + 5).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4">
                    <strong>Total Amount Paid:</strong>
                  </td>
                  <td>
                    <strong>${orderDetails.totalAmount.toFixed(2)}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Back to Home Button */}
          <div className="back-home">
            <button onClick={() => (window.location.href = "/")}>
             Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
