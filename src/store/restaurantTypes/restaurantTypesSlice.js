import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    restaurantTypes: [],
    error: null
}

export const restaurantTypesSlice = createSlice({
    name: 'restaurantTypes',
    initialState: initialValue,
    reducers: {
        fillRestaurantTypes: (state, action) => {
            state.restaurantTypes = action.payload;
        },
        setErrors: (state, action) => {
            state.error = action.payload;
        }
        
    }
});

export const { fillRestaurantTypes, setErrors } = restaurantTypesSlice.actions;
