import { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, getDeliveryFee, food_list, cartItems } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProceedToPay = (event) => {
    event.preventDefault();

    // Collect ordered items
    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        name: item.name,
        quantity: cartItems[item._id],
        price: item.price,
      }));

    // Prepare order details
    const orderDetails = {
      customer: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      address: `${data.street}, ${data.city}, ${data.state}, ${data.zipcode}, ${data.country}`,
      totalAmount: getTotalCartAmount() + getDeliveryFee(),
      items: orderItems,
    };

    // Store in localStorage
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

    // Navigate to confirmation page
    navigate("/order-confirmation");
  };

  const subtotal = getTotalCartAmount();
  const deliveryFee = getDeliveryFee();
  const totalAmount = subtotal + deliveryFee;

  return (
    <form onSubmit={handleProceedToPay} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Info</p>
        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
            required
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
            required
          />
        </div>
        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
          required
        />
        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          <input
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
            required
          />
          <input
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Sub Total</p>
            <p>${subtotal}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${deliveryFee}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${totalAmount}</b>
          </div>
          <button type="submit"> PROCEED TO PAY</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
