import { FirebaseDB } from "@/firebase/config";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export const getDBRestaurants = async () => {
    try {

        const restaurantsCollection = collection(FirebaseDB, "Restaurants")
        const querySnapshot = await getDocs(restaurantsCollection);
        const tempArr = []
        querySnapshot.forEach((doc) => {
            tempArr.push({ id: doc.id, ...doc.data() })
        });
        return tempArr
    }
    catch (error) {
        throw error
    }
}

export const getDBRestaurant = async (id) => {
    try {
        const docRef = doc(FirebaseDB, "Restaurants", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data()
        }
        else {
            return ({})
        }
    }
    catch (error) {
        throw error
    }
}

export const getDBRestaurantPlates = async (id, plateType = '') => {
    try {
        const restaurantDocRef = doc(FirebaseDB, "Restaurants", id);
        const q = query(collection(FirebaseDB, "Plates"), where("RestaurantId", "==", restaurantDocRef));
        const querySnapshot = await getDocs(q);
        let tempArr = []
        querySnapshot.forEach((doc) => {
            tempArr.push({ id: doc.id, ...doc.data() })
        });
        if (plateType != '') {
            tempArr = tempArr.filter((data) => data.PlateTypeId.id == plateType)
        }
        return tempArr;
    }
    catch (error) {
        throw error
    }
}
export const getDBRestaurantTypes = async () => {
    try {
        const plateTypeCollection = collection(FirebaseDB, "RestaurantType")
        const querySnapshot = await getDocs(plateTypeCollection);
        const tempArr = []
        querySnapshot.forEach((doc) => {
            tempArr.push({ id: doc.id, ...doc.data() })
        });
        return tempArr
    }
    catch (error) {
        throw error
    }
}
