'use client'

import React from 'react'
import './perfil-edit.scss'
import { useRouter } from 'next/navigation'



const Page = () => {
    const router = useRouter()

    
    const handleClick = () =>{
        router.push('perfil')
    }
  return (
    <div>
        <div className='header'>
            <span>
            <i onClick={handleClick} className="bi bi-chevron-left B"></i>
            </span>
            <div className='imageEdit'>
                <p>Profile</p>
                <figure className='figurEdit'>
                <img src="/images/Profile.svg" alt="" />
                </figure>
                <i className="bi bi-camera C"></i>
            </div>
        </div>
        <section className='inputs'>
            <div className='inputEdit'>
                <input type="text" />
                <i className="bi bi-pencil"></i>
            </div>
            <div className='inputEdit'>
                <input type="text" />
                <i className="bi bi-pencil"></i>
            </div>
            <div className='inputEdit'>
                <input type="number" />
                <i className="bi bi-pencil"></i>
            </div>
            <div className='inputEdit'>
                <input type="number" />
                <i className="bi bi-pencil"></i>
            </div>
        </section>
    </div>
  )
}

export default Page