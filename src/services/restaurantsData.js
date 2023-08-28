import { FirebaseDB } from "@/firebase/config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

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