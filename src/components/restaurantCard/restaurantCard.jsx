'use client'
import React from 'react'
import { useRouter } from "next/navigation";
import { Rating } from '@mantine/core'

const RestaurantCard = ({ restaurant }) => {
    const router = useRouter();
    const goRestaurant = () => {
        router.push(`/restaurant/${restaurant.id}`)
    }
   
    return (
        <div className='RestaurantCardC' onClick={goRestaurant}>
            <div className='RestaurantCardC_image'>
                <img src={restaurant?.FoodImg} />
            </div>
            <div className='RestaurantCardC_info'>
                <h5>{restaurant?.Name}</h5>
                <Rating value={restaurant?.Rating} fractions={2} readOnly />
                <p>Horario: {restaurant?.StartTime}- {restaurant?.CloseTime}</p>
            </div>
        </div>
    )
}

export default RestaurantCard