import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  note: null,
};

export const orderSlice = createSlice({
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
      state.orders = state.orders.map((order) =>
        order.PlateId === action.payload.PlateId
          ? {
              ...action.payload,
            }
          : order
      );
    },
    deleteOrder: (state, action) => {
      console.log(action.payload);
      state.orders = [];
    },
    setNote: (state, action) => {
      state.note = action.payload;
    },
  },
});

export const { setOrders, addOrder, updateOrder, deleteOrder, setNote } =
  orderSlice.actions;
