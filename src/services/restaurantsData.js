import { FirebaseApp, FirebaseDB } from "@/firebase/config";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
export const getDBRestautants = async () => {
    try {

        const restaurantsCollection = collection(FirebaseDB, "Restaurants")
        const querySnapshot = await getDocs(restaurantsCollection);
        const tempArr = []
        querySnapshot.forEach((doc) => {
            tempArr.push({ id: doc.id, ...doc.data() })
        });
        console.log()
    }
    catch (error) {
        throw error
    }

}