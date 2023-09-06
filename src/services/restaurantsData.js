import { FirebaseDB } from "@/firebase/config";
import { collection, doc, getDoc, getDocs, query, where,setDoc,addDoc  } from "firebase/firestore";

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
export const updateDbRestaurant = async (restaurantInfo )=>{
  
    let docRefRestaurantType = ''
    if (typeof (restaurantInfo.RestaurantTypeId) == 'string') {
        docRefRestaurantType = doc(FirebaseDB, "RestaurantTypeId", restaurantInfo.RestaurantTypeId);
      }
      else {
        let index = restaurantInfo.RestaurantTypeId._key.path.segments.length - 1
        restaurantInfo.RestaurantTypeId = restaurantInfo.RestaurantTypeId._key.path.segments[index]
        docRefRestaurantType = doc(FirebaseDB, "RestaurantTypeId", restaurantInfo.RestaurantTypeId);
      }
    const docRef = doc(FirebaseDB, "RestaurantType", restaurantInfo.RestaurantTypeId);
    try{
        const docRef = doc(FirebaseDB, "Restaurants", restaurantInfo.id);
           const newData ={
                        CloseTime:restaurantInfo.CloseTime,
                        Description:restaurantInfo.Description,
                        FoodImg:restaurantInfo.FoodImg,
                        LogoImg:restaurantInfo.LogoImg,
                        Name:restaurantInfo.Name,
                        Rating:restaurantInfo.Rating,
                        RestaurantTypeId:docRefRestaurantType,
                        StartTime: restaurantInfo.StartTime,
                        WaitingTime: restaurantInfo.WaitingTime,
        }
       const newDocument = await setDoc(docRef, newData)
      
    }
    catch(error){
        throw error
    }
}
export const newDbRestaurant = async (restaurantInfo )=>{
    try{
        
        const docRef = doc(FirebaseDB, "RestaurantType", restaurantInfo.RestaurantTypeId);
        const dbRef = collection(FirebaseDB, "Restaurants");
        if(restaurantInfo.FoodImg==undefined){
            restaurantInfo.FoodImg =''
        }
        if(restaurantInfo.LogoImg==undefined){
            restaurantInfo.LogoImg =''
        }
        const newData ={
                        CloseTime:restaurantInfo.CloseTime,
                        Description:restaurantInfo.Description,
                        FoodImg:restaurantInfo.FoodImg,
                        LogoImg:restaurantInfo.LogoImg,
                        Name:restaurantInfo.Name,
                        Rating:restaurantInfo.Rating,
                        RestaurantTypeId:docRef,
                        StartTime: restaurantInfo.StartTime,
                        WaitingTime: restaurantInfo.WaitingTime,
                        Rating:Number(restaurantInfo.Rating)
        }
       const newDocument = await addDoc(dbRef, newData)
       return newDocument
    }
    catch(error){
    
        throw error
    }
}
