'use client'
import './page.scss'
import { getDBRestaurantTypes, getDBRestaurants } from '../../../services/restaurantsData'
import React, { useEffect, useState } from 'react'
import { Carousel } from '@mantine/carousel';
import { getDBPlateTypes } from '../../../services/plateData';
import RestaurantCard from '../../../components/restaurantCard/restaurantCard';


const Page = () => {
  const [restaurantsInfo, setRestaurantsInfo] = useState([])
  const [restaurantTypeInfo, setRestaurantTypeInfo] = useState([])
  

  const LoadData = async () => {
    const data = await getDBRestaurants()
    setRestaurantsInfo(data)

    const data2 = await getDBRestaurantTypes()
    if (data2.length > 0) {
      data2.unshift({ id: '0', Description: 'Todo' });
      setRestaurantTypeInfo(data2)
    }

  }

  useEffect(() => {
    LoadData();
  }, []);

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

      <div className="HomeC_FoodType">
        <p>Restaurantes y cafés</p>
        {
          restaurantTypeInfo.length > 0 ?
            <Carousel slideSize="10%" align="start" slideGap="xs" controlsOffset="xs" loop dragFree withControls={false}>

              {restaurantTypeInfo.map((restaurantType, index) =>
                <Carousel.Slide key={restaurantType.id}>
                  {index == 0 ?
                    <button className="btn btn btn-warning" type="button" value={restaurantType.id}>{restaurantType.Description}</button>
                    :
                    <button className="btn bg-body-secondary" type="button" value={restaurantType.id}>{restaurantType.Description}</button>
                  }
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
            restaurantsInfo.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)

            : null
        }
      </div>
    </div>
  );
};

export default Page;
