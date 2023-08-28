import { FirebaseApp, FirebaseDB } from "@/firebase/config";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
export const getDBPlateTypes = async () => {
    try {
        const plateTypeCollection = collection(FirebaseDB, "PlateType")
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