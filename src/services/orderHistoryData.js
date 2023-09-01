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
