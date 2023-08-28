'use client'
import React from 'react'
import Rating from '@mui/material/Rating';
import { useRouter } from "next/navigation";

const RestaurantCard = ({ restaurant }) => {
    const router = useRouter();
    const goRestaurant = ()=>{
       router.push(`/restaurant/${restaurant.id}`)
    }
    console.log('info del restaurante', restaurant)
    return (
        <div className='RestaurantCardC' onClick={goRestaurant}>
            <div className='RestaurantCardC_image'>
                <img src={restaurant?.FoodImg}/>
            </div>
            <div className='RestaurantCardC_info'>
                <h5>{restaurant?.Name}</h5>
                <Rating name="read-only" value={restaurant?.Rating} readOnly />
                <p>Horario: {restaurant?.StartTime}- {restaurant?.CloseTime}</p>
            </div>
        </div>
    )
}

export default RestaurantCard