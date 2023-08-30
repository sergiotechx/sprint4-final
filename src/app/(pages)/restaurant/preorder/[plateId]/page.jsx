'use client'
import './page.scss'
import { getDBOrgToppingsxPlate, getDBPlate } from '@/services/plateData'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { Checkbox } from '@mantine/core';

const Page = ({ params }) => {
  const [plateInfo, setPlateInfo] = useState({})
  const [toppingsxPlate, setToppingsxPlate] = useState([])
  const [toppingsValue, setToppingsValue] = useState([]);
  const router = useRouter();
  const loadData = async (plateId) => {

    const data = await getDBPlate(plateId)
    setPlateInfo('PlateInfo',data)
    
    const data2 = await getDBOrgToppingsxPlate(plateId)
    setToppingsxPlate(data2)
    

  }
  const goHome = () => {
    router.push('/')
  }
  

  useEffect(() => {
    loadData(params.plateId)

  }, [])
  useEffect(() => {
   

  }, [toppingsValue])
  return (
    <div className='preOrderC'>
      <div className='preOrderC_header'>
        <img id='plate' src={plateInfo?.PlateImage} />
        <img id='back'
          src="/images/chevron-back-outline.svg"
          alt="back"
          onClick={goHome}
        />
      </div>
      <div className='preOrderC_subheader'>
        <h5>{plateInfo?.Name}</h5>
        <i class="bi bi-clock">{plateInfo?.DeliveryTime} min</i>
      </div>
      <p id='description'>{plateInfo?.Description}</p>
      <p id='additional'>Ingredientes adicionales</p>
      <div className='preOrderC_toppings'>
        <Checkbox.Group value={toppingsValue} onChange={setToppingsValue}>
          {toppingsxPlate?.map((topping, index) =>
            <div className='preOrderC_toppings_topping' key={index}>

              <Checkbox
                label={topping.Description}
                value={topping.ToppingId}
                color="yellow"
                radius="xs"
                size="xs"
               
              />
              <span className={(toppingsValue.find(item => item == topping.ToppingId)) != undefined ? 'text-warning' : 'text-dark'}>+{topping?.Price}</span>
            </div>

          )}
        </Checkbox.Group>

      </div>
      <div className='preOrderC_footer'>
        <div className='preOrderC_footer_group1'>
          <button id='btn_left'>-</button>
          <input type='text' readOnly size="2" />
          <button id='btn_right'>+</button>
        </div>
        <div className='preOrderC_footer_group2'>
          <button>añadir</button>
          <p>mucho dinero😋 </p>
        </div>
      </div>
    </div >


  )
}

export default Page