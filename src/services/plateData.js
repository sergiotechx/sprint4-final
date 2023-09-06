import { FirebaseDB } from "@/firebase/config";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  setDoc,
  addDoc,
  updateDoc
} from "firebase/firestore";

export const getDBPlateTypes = async () => {
  try {
    const plateTypeCollection = collection(FirebaseDB, "PlateType");
    const querySnapshot = await getDocs(plateTypeCollection);
    const tempArr = [];
    querySnapshot.forEach((doc) => {
      tempArr.push({ id: doc.id, ...doc.data() });
    });
    return tempArr;
  } catch (error) {
    throw error;
  }
};
export const getDBPlate = async (id) => {
  try {
    const docRef = doc(FirebaseDB, "Plates", id);
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
export const getDBPlates = async () => {
  try {
    const platesCollection = collection(FirebaseDB, "Plates");
    const querySnapshot = await getDocs(platesCollection);
    const tempArr = [];
    querySnapshot.forEach((doc) => {
      tempArr.push({ id: doc.id, ...doc.data() });
    });
    return tempArr;
  } catch (error) {
    throw error;
  }
};
export const getDBPToppings = async () => {
  try {
    const plateTypeCollection = collection(FirebaseDB, "Toppings");
    const querySnapshot = await getDocs(plateTypeCollection);
    const tempArr = [];
    querySnapshot.forEach((doc) => {
      tempArr.push({ id: doc.id, ...doc.data() });
    });
    return tempArr;
  } catch (error) {
    throw error;
  }
};
export const getDBPToppingsxPlate = async (plateId) => {
  try {
    const plateDocRef = doc(FirebaseDB, "Plates", plateId);
    const q = query(
      collection(FirebaseDB, "ToppingsXplate"),
      where("PlateId", "==", plateDocRef)
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

export const getDBOrgToppingsxPlate = async (plateId) => {
  try {
    const toppings = await getDBPToppings();
    const toppingsxPlate = await getDBPToppingsxPlate(plateId);
    let resultToppingsxPlate = [];

    toppingsxPlate.forEach((topping) => {
      const currentTopping = toppings.find(
        (onetopping) => onetopping.id == topping.ToppingId.id
      );
      resultToppingsxPlate.push({
        ToppingId: currentTopping.id,
        Description: currentTopping.Description,
        Price: topping.Price,
      });
    });

    return resultToppingsxPlate;
  } catch (error) {
    throw error;
  }
};

export const updateDbPlate = async (plateInfo) => {
  try {
    console.log('plateInfo', plateInfo)
    const docRefPlate = doc(FirebaseDB, "Plates", plateInfo.id);
    let docRefRestaurant = ''
    let docRefPlateType = ''
    console.log('plateInfo', plateInfo)

    if (typeof (plateInfo.RestaurantId) == 'string') {
      docRefRestaurant = doc(FirebaseDB, "Restaurants", plateInfo.RestaurantId);
    }
    else {
      let index = plateInfo.RestaurantId._key.path.segments.length - 1
      plateInfo.RestaurantId = plateInfo.RestaurantId._key.path.segments[index]
      docRefRestaurant = doc(FirebaseDB, "Restaurants", plateInfo.RestaurantId);
    }

    if (typeof (plateInfo.PlateTypeId) == 'string') {
      docRefPlateType = doc(FirebaseDB, "PlateType", plateInfo.PlateTypeId);
    }
    else {
      let index = plateInfo.PlateTypeId._key.path.segments.length - 1
      plateInfo.PlateTypeId = plateInfo.PlateTypeId._key.path.segments[index]
      docRefPlateType = plateInfo.PlateTypeId
    }



    const newData = {
      DeliveryTime: plateInfo.DeliveryTime,
      Description: plateInfo.Description,
      Name: plateInfo.Name,
      PlateImage: plateInfo.PlateImage,
      PlateTypeId: docRefPlateType,
      Price: plateInfo.Price,
      RestaurantId: docRefRestaurant,
      RestaurantName: plateInfo.RestaurantName,
      id: plateInfo.id

    }
    const newDocument = await setDoc(docRefPlate, newData)
    return newDocument
  }
  catch (error) {
    throw error
  }
}
export const newDbPlate = async (plateInfo) => {
  try {
    console.log('plateInfo', plateInfo)
    const dbRef = collection(FirebaseDB, "Plates");

    let docRefRestaurant = doc(FirebaseDB, "Restaurants", plateInfo.RestaurantId);
    let docRefPlateType = doc(FirebaseDB, "PlateType", plateInfo.PlateTypeId);

    const newData = {
      DeliveryTime: '12-12',
      Description: plateInfo.Description,
      Name: plateInfo.Name,
      PlateImage: plateInfo.PlateImage,
      PlateTypeId: docRefPlateType,
      Price: plateInfo.Price,
      RestaurantId: docRefRestaurant,
      RestaurantName: plateInfo.RestaurantName,
    }

    const newDocument = await addDoc(dbRef, newData)
    let document = newDocument._key.path.segments[1];
    const docRef = doc(FirebaseDB, "Plates", document);
    let update = await updateDoc(docRef, { id: document })
    return newDocument

  }
  catch (error) {
    throw error
  }
}
