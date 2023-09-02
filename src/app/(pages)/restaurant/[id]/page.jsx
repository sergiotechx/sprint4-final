'use client'
import './page.scss'
import { getDBRestaurant, getDBRestaurantPlates } from '@/services/restaurantsData'
import { getDBPlateTypes } from '@/services/plateData';
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { Carousel } from '@mantine/carousel';
import { Rating } from '@mantine/core';
import PlateInfo from '@/components/plateInfo/plateInfo';


const Page = ({ params }) => {

  const [restaurantInfo, setRestaurantInfo] = useState({})
  const [plateTypeInfo, setplateTypeInfo] = useState([])
  const [platesInfo, setPlatesInfo] = useState([])
  const [platesInfoFiltered, setPlatesInfoFiltered] = useState([])
  const router = useRouter();

  const loadData = async (id) => {
    const data = await getDBRestaurant(id)
    setRestaurantInfo(data)
    const data2 = await getDBPlateTypes()
    if (data2.length > 0) {
      data2.unshift({ id: '0', Description: 'Todo' });
      setplateTypeInfo(data2)
    }
    const data3 = await getDBRestaurantPlates(id)
    console.log(data3)
    setPlatesInfo(data3)
    setPlatesInfoFiltered(JSON.parse(JSON.stringify(data3)))
  }

  const goHome = () => {
    router.push('/')
  }

  const filter = async (id) => {
    let temp = JSON.parse(JSON.stringify(platesInfo))
    let filtered = []
    if (id != 0) {
      filtered = temp.filter((PlateInfo) => (PlateInfo.PlateTypeId._key.path.segments[6] == id))
    }
    else {
      filtered = temp
    }
    setPlatesInfoFiltered(filtered)
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
          <img src={restaurantInfo?.FoodImg} />
        </div>
        <div className='restaurantC_subheader_info'>
          <h5> {restaurantInfo?.Name}</h5>
          <p> {restaurantInfo?.Description}</p>
          <div className='restaurantC_subheader_info_footer'>
            <Rating value={restaurantInfo?.Rating} fractions={2} readOnly />
            <p className="bg-body-secondary">{restaurantInfo?.WaitingTime} min</p>
          </div>
        </div>
      </div>
      <div className='restaurantC_buttons'>
        {
          plateTypeInfo.length > 0 &&
          <Carousel slideSize="10%" align="start" slideGap="xs" controlsOffset="xs" loop dragFree withControls={false}>

            {plateTypeInfo.map((plate, index) =>
              <Carousel.Slide key={plate.id}>
                {index == 0 ?
                  <button className="btn btn btn-warning" type="button" value={plate.id} onClick={() => { filter(plate.id) }}>{plate.Description}</button>
                  :
                  <button className="btn bg-body-secondary" type="button" value={plate.id} onClick={() => { filter(plate.id) }}>{plate.Description}</button>
                }
              </Carousel.Slide>
            )}
          </Carousel>

        }
      </div>
      <div className='restaurantC_plates'>
           {platesInfoFiltered?.map((plateInfo, index) => <PlateInfo key={plateInfo.id} plateInfo={plateInfo} />)}
      </div>


    </div>
  )
}

export default Page