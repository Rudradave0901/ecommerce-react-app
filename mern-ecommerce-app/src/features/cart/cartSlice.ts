import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity?: number;
}

interface CartState {
  items: Product[];
}

const savedCart = localStorage.getItem("cartItems");
const initialState: CartState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(p => p.id === action.payload.id);
      if (existing) existing.quantity = (existing.quantity || 1) + 1;
      else state.items.push({ ...action.payload, quantity: 1 });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    increaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find(p => p.id === action.payload);
      if (item) item.quantity = (item.quantity || 1) + 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    decreaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find(p => p.id === action.payload);
      if (item && item.quantity && item.quantity > 1) item.quantity -= 1;
      else state.items = state.items.filter(p => p.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
    setCartItems: (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload;
        localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increaseQty, decreaseQty, setCartItems } =
  cartSlice.actions;
export default cartSlice.reducer;
