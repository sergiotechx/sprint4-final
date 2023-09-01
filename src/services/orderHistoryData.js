import { FirebaseDB } from "@/firebase/config";
import {
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
    console.log(userId);
    //const userDocRef = doc(FirebaseDB, "Users", userId);
    //console.log(userDocRef);
    const q = query(
      collection(FirebaseDB, "OrderHistory"),
      where("UserId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    let tempArr = [];
    querySnapshot.forEach((doc) => {
      tempArr.push({ id: doc.id, ...doc.data() });
    });
    const documentoRefe = tempArr[0].RestaurantId;
    const docSnap = await getDoc(documentoRefe);
    console.log("es de esto", docSnap.data());
    return tempArr;
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

export const getFormateoOrdenes = async (userId) => {
  try {
    const ordenes = await getOrdersForUser(userId);
    // const restaurantes = await getDBRestaurants();
    // let resultados = [];
    // ordenes.forEach((orden) => {
    //   const restaurante = restaurantes.find(
    //     (restaurnate) => restaurante.id == orden.RestaurantId
    //   );
    //   console.log(restaurnate);
    // });
    // console.log(restaurantes);
  } catch (error) {
    throw error;
  }
};
