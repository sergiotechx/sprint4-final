import { FirebaseDB } from "@/firebase/config";
import { collection, doc, getDocs, getDoc, query, where } from "firebase/firestore";

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
export const getDBPlate = async (id) => {
    try {
        const docRef = doc(FirebaseDB, "Plates", id);
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
export const getDBPToppings = async () => {
    try {
        const plateTypeCollection = collection(FirebaseDB, "Toppings")
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
export const getDBPToppingsxPlate = async (plateId) => {
    try {
        const plateDocRef = doc(FirebaseDB, "Plates", plateId);
        const q = query(collection(FirebaseDB, "ToppingsXplate"), where("PlateId", "==", plateDocRef));
        const querySnapshot = await getDocs(q);
      
        let tempArr = []
        querySnapshot.forEach((doc) => {
            tempArr.push({ id: doc.id, ...doc.data() })
        });
        return tempArr;
    }
    catch (error) {
        throw error
    }
}

export const getDBOrgToppingsxPlate = async(plateId)=>{
    try{
        const toppings = await getDBPToppings()
        const toppingsxPlate = await getDBPToppingsxPlate(plateId)
        let resultToppingsxPlate=[]
        
        toppingsxPlate.forEach((topping)=>{
            const currentTopping = toppings.find((onetopping) => onetopping.id == topping.ToppingId.id)
            resultToppingsxPlate.push({ToppingId:currentTopping.id,Description:currentTopping.Description, Price:topping.Price})
        })
      
        return resultToppingsxPlate
    }
    catch(error){
        throw error
    }
}