'use client'
import './page.scss'
import { getDBRestaurants } from '../../../services/restaurantsData'
import React, { useEffect, useState } from 'react'
import { Carousel } from '@mantine/carousel';
import { getDBPlateTypes } from '../../../services/plateTypeData';
import RestaurantCard from '../../../components/restaurantCard/restaurantCard';
import { useRouter } from "next/navigation";




const Page = () => {
  const [restaurantsInfo, setRestaurantsInfo] = useState([])
  const [plateTypeInfo, setplateTypeInfo] = useState([])
  const router = useRouter();

  const LoadData = async () => {
    const data = await getDBRestaurants()
    setRestaurantsInfo(data)
    console.log(data)
    const data2 = await getDBPlateTypes()
    setplateTypeInfo(data2)
    console.log(data2)
  }
  const goRestaurant =(id)=>{
    router.push(`/restaurant/${id}`)
  }
  useEffect(() => {
    LoadData()
  }, [])


  return (

    <div className='HomeC'>
      <div className='HomeC_RestaurantsLogo'>
        {
          restaurantsInfo.length > 0 ?
            <Carousel slideSize="10%" align="start" slideGap="xs" controlsOffset="xs" loop dragFree withControls={false}>
             

                <Carousel.Slide >
                  <img src='https://res.cloudinary.com/dtjp5b2qr/image/upload/v1693229185/Foody/1_ppljk2.png' />
                </Carousel.Slide>
                <Carousel.Slide >
                  <img src='https://res.cloudinary.com/dtjp5b2qr/image/upload/v1693229185/Foody/2_vcngbz.png' />
                </Carousel.Slide>
                <Carousel.Slide >
                  <img src='https://res.cloudinary.com/dtjp5b2qr/image/upload/v1693229186/Foody/3_rwndxo.png' />
                </Carousel.Slide>
                <Carousel.Slide >
                  <img src='https://res.cloudinary.com/dtjp5b2qr/image/upload/v1693229186/Foody/4_lovkqv.png' />
                </Carousel.Slide>
            
            </Carousel>

            : <div className="spinner-border text-warning" role="status" />
        }
      </div>


      <div className='HomeC_FoodType'>
        <p>Restaurantes y cafés</p>
        {
          plateTypeInfo.length > 0 ?
            <Carousel slideSize="10%" align="start" slideGap="xs" controlsOffset="xs" loop dragFree withControls={false}>
              <button type="button" className="btn btn-warning" value="Todo" id="ButtonAll">Todo</button>
              {plateTypeInfo.map((plate) =>

                <Carousel.Slide key={plate.id}>
                  <button className="btn bg-body-secondary" type="button" value={plate.Description}>{plate.Description}</button>
                </Carousel.Slide>
              )}
            </Carousel>
            :
            null
        }
      </div>
      <div className='HomeC_Restaurants'>
        {
            restaurantsInfo.length > 0 ?
            restaurantsInfo.map((restaurant)=><RestaurantCard key={restaurant.id} restaurant={restaurant}/>)
            
            :null
        }
      </div>
    </div>

  )
}

export default Page