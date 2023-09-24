import { createSlice } from "@reduxjs/toolkit";
import { collection, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase.config";

const initialState = {
  userInfo: null,
  cartItems: [],
  cartQuantity: 0,
  cartAmount: 0
};

async function setDatabase(state, msg) {
  try {
    await setDoc(doc(cartsRef, state.userInfo.id), {
      cartItems: [...state.cartItems],
    });
    msg && toast.success(msg);
  } catch(error) {
    toast.error(error.code);
  }
}

const cartsRef = collection(db, "carts");

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const present = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (present) {
        present.quantity += 1;
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        state.cartItems.push(newItem);
      }
      setDatabase(state, "Item added to cart");
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      setDatabase(state, "Item removed from cart");
    },
    increaseQuantity: (state, action) => {
      const present = state.cartItems.find(
        (item) => item.id === action.payload
      );
      present.quantity += 1;
      setDatabase(state);
    },
    decreaseQuantity: (state, action) => {
      const present = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (present.quantity > 1) {
        present.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
        toast.error("Item removed from cart");
      }
      setDatabase(state);
    },
    emptyCart: (state) => {
      state.cartItems = [];
      state.cartAmount = 0;
      state.cartQuantity = 0;
      setDatabase(state, "Cart is empty");
    },
    setTotal: (state) => {
      let totalAmount = state.cartItems.reduce(
        (acc, curr) => {
          const { price, quantity } = curr;
          acc += price * quantity;
          return acc;
        }, 0).toFixed(2);
      state.cartAmount = totalAmount;
      state.cartQuantity = state.cartItems.length;
      setDatabase(state);
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
      state.cartItems = [];
      state.cartQuantity = 0
      state.cartAmount = 0;
    },
    addFromDb: (state, action) => {
      state.cartItems.push(action.payload)
    } 
  }
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  emptyCart,
  setTotal,
  increaseQuantity,
  addUser,
  removeUser,
  setCart,
  addFromDb
} = cartSlice.actions;

export default cartSlice.reducer;
