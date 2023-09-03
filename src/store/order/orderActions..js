import {
  addOrder,
  updateOrder,
  deleteOrder,
} from "./orderReducer";



export const addOrderAct = (order) => {
  return  (dispatch) => {
    try {
      dispatch(addOrder( order ));
    } catch (error) {
      throw error
    }
  };
};

export const updateOrderAct = (order) => {
    return async (dispatch) => {
    try {
      dispatch(updateOrder(order));
    } catch (error) {
      console.log("error", error.error);
    }
  };
};

export const deleteOrderAct = (order) => {
  return async (dispatch) => {
    try {
     
     // dispatch(deleteProduct(index));
    } catch (error) {
      console.log("error", error.error);
    }
  };
};


