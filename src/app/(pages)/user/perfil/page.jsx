'use client'

import React from 'react'
import './perfil.scss'
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const Page = () => {
    const router = useRouter()

    const user = useSelector((state) => state.auth);
    
    const goToEdit = () =>{
        router.push('perfil-edit')
    }
    const goToPayment = () =>{
        router.push('perfil-payment')
    }
  return (
    <div>
        <div>
            <figure className='image'>
                <img src={user.photoURL} alt="" />
                <h5>{user.displayName}</h5>
            </figure>
        </div>
        <div className='options'>
            <span className='option'>
            <i onClick={goToEdit} className="bi bi-person l"></i>
            <p onClick={goToEdit}>Account edit</p>
            <i onClick={goToEdit} className="bi bi-chevron-right r"></i>
            </span>
            <span className='option'>
            <i className="bi bi-bell l"></i>
            <p>Notifications</p>
            <i className="bi bi-chevron-right r"></i>
            </span>
            <span className='option'>
            <i onClick={goToPayment} className="bi bi-credit-card l"></i>
            <p onClick={goToPayment} >Payment</p>
            <i onClick={goToPayment} className="bi bi-chevron-right r"></i>
            </span>
            <span className='option'>
            <i className="bi bi-globe l"></i>
            <p>Language</p>
            <i className="bi bi-chevron-right r"></i>
            </span>
            <span className='option'>
            <i className="bi bi-geo-alt l"></i>
            <p>Location</p>
            <i className="bi bi-chevron-right r"></i>
            </span>
            <span className='option'>
            <i className="bi bi-question-circle l"></i>
            <p>FAQ</p>
            <i className="bi bi-chevron-right r"></i>
            </span>
            <span className='option'>
            <i className="bi bi-telephone l"></i>
            <p>Support</p>
            <i className="bi bi-chevron-right r"></i>
            </span>
        </div>
    </div>
  )
}

export default Page