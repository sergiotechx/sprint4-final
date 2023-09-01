import { FirebaseDB } from "@/firebase/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

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
    
    querySnapshot.forEach( (doc) => {
       tempArr.push({ id: doc.id, ...doc.data() });
    });
    for(let index = 0; index<tempArr.length;index++){
       const restaurant = (await getDoc(tempArr[0].RestaurantId)).data()
       tempArr2.push({orderId:tempArr[index].id, TotalPrice:tempArr[index].TotalPrice, restaurantName:restaurant.Name,restaurantLogo:restaurant.LogoImg })
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
