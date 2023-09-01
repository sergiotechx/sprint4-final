import { FirebaseDB } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";


export const getDBUser = async (id) => {
    try {
        const docRef = doc(FirebaseDB, "Users", id);
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