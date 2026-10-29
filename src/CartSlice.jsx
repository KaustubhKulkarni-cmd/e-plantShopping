
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: []
  },

  reducers: {
    addToCart: (state, action) => {
      const plant = action.payload;

      const existing = state.items.find(
        (item) => item.id === plant.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...plant,
          quantity: 1
        });
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (plant) => plant.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (plant) => plant.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (plant) => plant.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
