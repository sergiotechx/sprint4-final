"use client";
import React from "react";
import "./footer.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { usePathname, useRouter } from 'next/navigation'

const Footer = () => {
  const currentPath = usePathname()
  console.log("la ruta",currentPath)
  const router = useRouter()
  const goHome = ()=>{
    router.push('/')
  }
  return (
    <div className="footerPrimary">
      {currentPath=='/home'?<i className="bi bi-house-door text-warning" onClick={goHome}></i>:<i className="bi bi-house-door" onClick={goHome}></i>}
      
      <i className="bi bi-search"></i>
      <i className="bi bi-stopwatch"></i>
      <i className="bi bi-person"></i>
    </div>
  );
};

export default Footer;

//comentario
