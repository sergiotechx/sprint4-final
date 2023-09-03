import { collection, getDocs } from "firebase/firestore";
import { FirebaseDB } from "@/firebase/config";

const collectionName = "RestaurantType";
const collectionRef = collection(FirebaseDB, collectionName);

export const getRestaurantTypesFromCollection = async () => {
    const restaurantTypes = [];
    try {

        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach((doc) => {
            restaurantTypes.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return restaurantTypes;

    } catch (error) {
        console.log(error);
        return null;

    }
}
