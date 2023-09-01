import {
  addProduct,
  deleteProduct,
  setProducts,
  updateProduct,
} from "./orderReducer";

export const getOrdersFromFirestore = () => {
  return async (dispatch) => {
    try {
      const querySnapshot = await getDocs(productCollection);
      const tempArr = [];
      querySnapshot.forEach((doc) => {
        tempArr.push({ id: doc.id, ...doc.data() });
        console.log(`${doc.id} => ${doc.data()}`);
      });
      console.log("tempArr", tempArr);
      dispatch(setProducts(tempArr));
    } catch (error) {
      console.log("error", error.error);
    }
  };
};

export const addOrder = (order) => {
  return async (dispatch) => {
    try {
      dispatch(addOrder({ order }));
    } catch (error) {
      console.log("error", error.error);
    }
  };
};

export const updateOrder = (order) => {
    return async (dispatch) => {
    try {
      dispatch(updateOrder(order));
    } catch (error) {
      console.log("error", error.error);
    }
  };
};

export const deleteOrder = (order) => {
  return async (dispatch) => {
    try {
     
     // dispatch(deleteProduct(index));
    } catch (error) {
      console.log("error", error.error);
    }
  };
};


