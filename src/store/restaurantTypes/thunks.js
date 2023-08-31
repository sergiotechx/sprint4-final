import { setErrors, setRestaurantTypes } from "./restaurantTypesSlice";
import { getRestaurantTypesFromCollection } from "@/services/restaurantTypes";

export const fillRestaurantTypes = () => {
    return async(dispatch) => {
        try {
            const restaurantTypes = await getRestaurantTypesFromCollection();
            //console.log(restaurantTypes);
            dispatch(setRestaurantTypes(restaurantTypes));
            
        } catch (error) {
            const newError = {
                error: true,
                message: error.message
            }
            dispatch(setErrors(newError));
        }
        
    }
}