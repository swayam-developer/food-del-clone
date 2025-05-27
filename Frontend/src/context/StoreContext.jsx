import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:5000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    try {
      const response = await axios.post(
        url + "api/cart/add",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Added to cart:", response.data);
      setCartItems(response.data.cartData); // Update ONLY with server data!!!
    } catch (error) {
      console.error(
        "Error adding item to cart:",
        error.response?.data || error.message
      );
    }

    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    }
  };

  const removeFromCart = async (itemId) => {
    if (!token) return;

    try {
      const response = await axios.post(
        url + "/api/cart/remove", // Correct URL
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Removed from cart:", response.data);
      setCartItems(response.data.cartData); // Update ONLY with server data!!!
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;

      const updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };

      if (updatedCart[itemId] <= 0) {
        delete updatedCart[itemId];
      }

      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          // Make sure itemInfo is found
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}` + "/api/food/list");
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        storedToken;
      }
    };

    loadData();
  }, []);

  const getDeliveryFee = () => {
    return Object.keys(cartItems).length > 0 ? 10 : 0;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getDeliveryFee,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
