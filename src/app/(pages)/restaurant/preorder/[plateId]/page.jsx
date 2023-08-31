'use client'
import './page.scss'
import { getDBOrgToppingsxPlate, getDBPlate } from '@/services/plateData'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { Checkbox } from '@mantine/core';

const Page = ({ params }) => {

  let orderStr =
  {
    PlateId: params.plateId,
    RestaurantId: null,
    Price: null,
    Toppings: [],
    Quantity: 1,
    TotalPrice: null
  }
  const [plateInfo, setPlateInfo] = useState({})
  const [toppingsxPlate, setToppingsxPlate] = useState([])
  const [toppingsValue, setToppingsValue] = useState([])
  const [order, setOrder] = useState({})
  const router = useRouter();

  const loadData = async (plateId) => {

    const data = await getDBPlate(plateId)
    setPlateInfo(data)

    const data2 = await getDBOrgToppingsxPlate(plateId)
    setToppingsxPlate(data2)

    orderStr.RestaurantId = data.RestaurantId.id
    orderStr.Price = data.Price
    orderStr.TotalPrice = data.Price
    data2.map((topping) => orderStr.Toppings.push(
      {
        ToppingId: topping.ToppingId,
        Price: topping.Price,
        Descriptcion: topping.description,
        Selected: false
      }))
    setOrder(orderStr)
  }

  const updateOrder = (data = {}) => {
    let temp = data
  
    if (Object.keys(temp).length == 0) {
      temp = JSON.parse(JSON.stringify(order))
    }
    if (Object.keys(temp).length == 0) {
      return
    }
    if (temp.Toppings.length > 0) {
      temp.Toppings.forEach((topping, index) => {
        if (toppingsValue.indexOf(topping.ToppingId) != -1) {
          temp.Toppings[index].Selected = true
        }
        else {
          temp.Toppings[index].Selected = false
        }
      })

      let sumtoppings = 0;
      temp.Toppings.forEach((topping, index) => {
        if (topping.Selected) {
          sumtoppings += topping.Price
        }
      })
      temp.TotalPrice = temp.Quantity * (temp.Price + sumtoppings)
      setOrder(temp)
    }
  }

  const goHome = () => {
    router.push('/')
  }
  const changeOrdQty = (operation) => {

    let temp = JSON.parse(JSON.stringify(order))
    if (operation === '-') {
      if (order.Quantity > 0) {
        temp.Quantity -= 1
      }
    }
    else {
      temp.Quantity += 1
    }
    if(toppingsxPlate.length > 0){
      updateOrder(temp)
    }
    else{
      temp.TotalPrice = temp.Quantity * temp.Price
      setOrder(temp)
    }
  }



  useEffect(() => {
    loadData(params.plateId)
  }, [])
  useEffect(() => {
    updateOrder()
    
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
        <i className="bi bi-clock">{plateInfo?.DeliveryTime} min</i>
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
          <button id='btn_left' onClick={() => changeOrdQty('-')}>-</button>
          <input type='text' readOnly size="2" value={order?.Quantity} />
          <button id='btn_right' onClick={() => changeOrdQty('+')}>+</button>
        </div>
        <div className='preOrderC_footer_group2'>
          <button>añadir</button>
          <p>{order?.TotalPrice} </p>
        </div>
      </div>
    </div >


  )
}

export default Page