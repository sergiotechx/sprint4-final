import { getDBRestaurants } from "@/services/restaurantsData";
import { setRestaurants, setError } from "./restaurantsSlice";


export const listRestaurants = () => {
    return async (dispatch) => {

        try {
            const restaurants = await getDBRestaurants();
            console.log(restaurants)
            dispatch(setRestaurants(restaurants));
            dispatch(setError(false));
        } catch (error) {
            console.log(error);
            dispatch(setError({
                error: true,
                code: error.code,
                message: error.message
            }))
        }
    }
}