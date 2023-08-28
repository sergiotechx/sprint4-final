'use client'
import { getDBRestaurant } from '@/services/restaurantsData'
import './page.scss'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const [restaurantInfo, setRestaurantInfo] = useState({})
  const router = useRouter();
  const loadData = async (id) => {
    const data = await getDBRestaurant(id)
    console.log('la datisa', data)
    setRestaurantInfo(data)
  }
  const goHome = () => {
    router.push('/')
  }

  useEffect(() => {
    loadData(params.id)
  }, [])

  return (
    <div className='restaurantC'>
      <div className='restaurantC_header'>
        <img src={restaurantInfo?.LogoImg} id='logo' />
        <img id='back'
          src="/images/chevron-back-outline.svg"
          alt="back"
          onClick={goHome}
        />
      </div>
      <div className='restaurantC_subheader'>
        <div className='restaurantC_subheader_image'>
          <img src ={restaurantInfo?.FoodImg}/>
        </div>
        <div className='restaurantC_subheader_info'>
          <h5> {restaurantInfo?.Name}</h5>
          <p> {restaurantInfo?.Description}</p>
        </div>
      </div>

    </div>
  )
}

export default Page