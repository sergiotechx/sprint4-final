import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders = [...state.orders, action.payload];
    },
    updateOrder: (state, action) => {
      console.log(action.payload);
      state.orders = state.orders.map((order) =>
        order.id === action.payload.id
          ? {
              ...action.payload,
            }
          : order
      );
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
