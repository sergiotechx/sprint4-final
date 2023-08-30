import React from 'react'
import { useRouter } from "next/navigation";

const PlateInfo = ({plateInfo}) => {

  const router = useRouter();
  const goPreorder = ()=>{
    router.push(`/restaurant/preorder/${plateInfo.id}`)
  }
    return (
    <div className='restaurantC_plates_plate' onClick={goPreorder}>
        
        <img src={plateInfo?.PlateImage} />
        <h5>{plateInfo?.Name}</h5>
        <p>$ {plateInfo?.Price}</p>
    </div>
  )
}

export default PlateInfo