'use client'
import { getDBRestautants } from '@/services/restaurantsData'
import React, { useEffect } from 'react'

const Page = () => {
  const uu = async ()=>{
    const datiza = await getDBRestautants()
  }
  useEffect(() => {
    uu()
  }, [])
  
  
  return (
    <div>Home</div>
  )
}

export default Page