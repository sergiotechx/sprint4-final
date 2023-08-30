'use client'

import React from 'react'
import './perfil-edit.scss'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'



const Page = () => {
    const router = useRouter()
    const user = useSelector(state=> state.auth)
    
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
                <img src={user.photoURL} alt="" />
                </figure>
                <i className="bi bi-camera C"></i>
            </div>
        </div>
        <section className='inputs'>
                <button className='buttonEdit'>{user.displayName}</button>    
                <button className='buttonEdit'>{user.email}</button>
            <div className='inputEdit'>
                <input type="number" value={user.celphone} />
                <i className="bi bi-pencil"></i>
            </div>
            <div className='inputEdit'>
                <input type="text" value={user.date}/>
                <i className="bi bi-pencil"></i>
            </div>
        </section>
    </div>
  )
}

export default Page