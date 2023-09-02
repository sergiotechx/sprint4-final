import { createSlice } from '@reduxjs/toolkit';

const initialValueRestaurant = {
    restaurants: [],
    error: null
    
}

export const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState: initialValueRestaurant,
    reducers: {
        setRestaurants: (state, action) => {
            state.restaurants = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
        
    }
});

export const { setRestaurants, setError } = restaurantsSlice.actions;
