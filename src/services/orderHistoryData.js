import { FirebaseDB } from "@/firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getDBRestaurants } from "./restaurantsData";

export const getOrdersForUser = async (userId) => {
  try {
    const userDocRef = doc(FirebaseDB, "Users", userId);
    const q = query(
      collection(FirebaseDB, "OrderHistory"),
      where("UserId", "==", userDocRef)
    );

    const querySnapshot = await getDocs(q);

    let tempArr = [];
    let tempArr2 = [];

    querySnapshot.forEach((doc) => {
      tempArr.push({ id: doc.id, ...doc.data() });
    });

    for (let index = 0; index < tempArr.length; index++) {
      const restaurant = (await getDoc(tempArr[index].RestaurantId)).data();
      tempArr2.push({
        orderId: tempArr[index].id,
        TotalPrice: tempArr[index].TotalPrice,
        Status: tempArr[index].Status,
        restaurantName: restaurant.Name,
        restaurantLogo: restaurant.LogoImg,
      });
    }

    return tempArr2;
  } catch (error) {
    throw error;
  }
};

export const getDBOrder = async (id) => {
  try {
    const docRef = doc(FirebaseDB, "OrderHistory", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return {};
    }
  } catch (error) {
    throw error;
  }
};

export const newDbOrderHistory = async (OrderInfo) => {
  try {
    const docRefRestaurant = doc(
      FirebaseDB,
      "Restaurants",
      OrderInfo.RestaurantId
    );
    const docRefUser = doc(FirebaseDB, "Users", OrderInfo.UserId);

    const dbRef = collection(FirebaseDB, "OrderHistory");

    const newData = {
      Address: OrderInfo.Address,
      CostDelivery: Number("4000"),
      DateTime: OrderInfo.DateTime,
      Plates: OrderInfo.Plates,
      RestaurantId: docRefRestaurant,
      Status: true,
      Toppings: OrderInfo.Toppings,
      TotalPrice: OrderInfo.TotalPrice,
      UserId: docRefUser,
    };
    const newDocument = await addDoc(dbRef, newData);
    return newDocument;
  } catch (error) {
    console.log("Nueva orden aca!!!");
    throw error;
  }
};
